import React, { useState } from 'react';
import walletService from "../services/walletService";
import { useOkto } from "okto-sdk-react";

const TransferModal = ({ isOpen, onClose }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const { executeRawTransaction } = useOkto();
  const { createWallet } = useOkto();
  const [solAddress, setSolAddress] = useState(null);

    if (!isOpen) return null;

    const getSolAdd = async() => {        
        const walletsData = await createWallet();
        console.log(walletsData);

        var solAdd = walletService.getSolanaWalletAddress(walletsData);
        // /setSolAddress(solAdd);

        return solAdd;
    }

    const handleTransfer = async() => {
        if (recipient.trim() === '' || amount.trim() === '') {
            alert('Please fill in all fields.');
            return;
        }
        if (isNaN(amount) || Number(amount) <= 0) {
            alert('Please enter a valid amount.');
            return;
        }

        if(!solAddress){
            var sol = await getSolAdd();
        }
        // mint gold
        try {
            console.log("burn gold: ", amount);
            var rawData = walletService.getTransferToRawTxnObject(sol, recipient, sol);
            const response = await executeRawTransaction(rawData);
            alert(response);            
        } catch (error) {
            alert(error.message);
        }

        alert(`Transferred ${amount} to ${recipient}`);
        setRecipient('');
        setAmount('');
        onClose();
    };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={styles.title}>Transfer Operation</h2>
          <button style={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <div style={styles.body}>
          <div style={styles.field}>
            <label htmlFor="recipient" style={styles.label}>
              Recipient Name:
            </label>
            <input
              id="recipient"
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.field}>
            <label htmlFor="amount" style={styles.label}>
              Amount:
            </label>
            <input
              id="amount"
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={styles.input}
            />
          </div>
          <button onClick={handleTransfer} style={styles.transferButton}>
            Transfer
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '50%',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
  },
  title: {
    margin: 0,
    fontSize: '20px',
  },
  closeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '24px',
    cursor: 'pointer',
  },
  body: {
    padding: '75px',
  },
  field: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  transferButton: {
    marginTop: '50px',
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#28a745',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default TransferModal;
