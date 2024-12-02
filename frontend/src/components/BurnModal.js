import React, { useState } from 'react';
import walletService from "../services/walletService";
import { useOkto } from "okto-sdk-react";

const BurnModal = ({ isOpen, onClose }) => {
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

    const handleBurn = async() => {
        if (amount.trim() === '' || isNaN(amount) || Number(amount) <= 0) {
            alert('Please enter a valid amount to burn.');
            return;
        }

        if(!solAddress){
            var sol = await getSolAdd();
        }
        // mint gold
        try {
            console.log("burn gold: ", amount);
            var rawData = walletService.getBurnRawTxnObject(sol, sol);
            const response = await executeRawTransaction(rawData);
            alert(response);            
        } catch (error) {
            alert(error.message);
        }

        alert(`You bought ${amount} tokens.`);
        setAmount('');
        onClose();
    };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={styles.title}>Burn Tokens</h2>
          <button style={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <div style={styles.body}>
          <div style={styles.field}>
            <label htmlFor="burnAmount" style={styles.label}>
              Amount to Burn:
            </label>
            <input
              id="burnAmount"
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={styles.input}
            />
          </div>
          <button onClick={handleBurn} style={styles.burnButton}>
            Burn
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
    backgroundColor: '#DC3545',
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
    padding: '20px',
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
  burnButton: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#DC3545',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default BurnModal;
