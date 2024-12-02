import React, { useState } from "react";
import { useOkto } from "okto-sdk-react";
import { useNavigate } from "react-router-dom";
import walletService from "../services/walletService";

const Main = ({ authToken, handleLogout }) => {
    console.log("readdata component rendered: ", authToken);
    const navigate = useNavigate();
    const [solAddress, setSolAddress] = useState(null);
    const [goldBalance, setGoldBalance] = useState(0);
    const [stateData, setStateData] = useState({
        amount: 0,
        recipientAdd: "",
        resp: ""
    });

    const { executeRawTransaction, getRawTransactionStatus } = useOkto();
    const [error, setError] = useState(null);
    const { getUserDetails, getPortfolio, createWallet, logOut } = useOkto();
  
    const logout = async () => {
        try {
        logOut();
        handleLogout();
        navigate('/');
        } catch (error) {
        setError(`Failed to log out: ${error.message}`);
        }
    };

    const handleInputChange = (e) => {
        setStateData({ ...stateData, [e.target.name]: e.target.value });
    };

    const getSolAdd = async() => {        
        const walletsData = await createWallet();
        console.log(walletsData);

        var solAdd = walletService.getSolanaWalletAddress(walletsData);
        // /setSolAddress(solAdd);

        return solAdd;
    }

    const buyGold = async() => {
        if(!solAddress){
            var sol = await getSolAdd();
        }
        // mint gold
        var amount = stateData.amount;
        if(amount && amount > 0){
            try {
                console.log("buy gold: ", stateData.amount);
                var rawData = walletService.getMintToRawTxnObject(sol, sol);
                const response = await executeRawTransaction(rawData);
                console.log("execting: ");
                setStateData({ ...stateData, resp: response });
                // setTransferResponse(response);
                // setActiveSection('transferResponse');
            } catch (error) {
                setError(`Failed to transfer tokens: ${error.message}`);
            }
        }
    }

    const transferGold = async() => {
        navigate('/transfer');
        // if(!solAddress){
        //     var sol = await getSolAdd();
        // }
        // // transfer gold
        // console.log("TRansfer");

        // var amount = stateData.amount;
        // var recipient = stateData.recipientAdd;
        // if(amount && amount > 0 && recipient && recipient != ""){
        //     try {
        //         console.log("transfer gold: " + stateData.amount + ", " + stateData.recipientAdd);
        //         var rawData = walletService.getTransferToRawTxnObject(sol, recipient, sol);
        //         const response = await executeRawTransaction(rawData);
        //         console.log("execting: ");
        //         setStateData({ ...stateData, resp: response });
        //         // setActiveSection('transferResponse');
        //     } catch (error) {
        //         setError(`Failed to transfer tokens: ${error.message}`);
        //     }
        // }
    }

    const burnGold = async() => {
        if(!solAddress){
            var sol = await getSolAdd();
        }
        // burn gold
        console.log("Burn");

        var amount = stateData.amount;
        if(amount && amount > 0){
            try {
                console.log("burn gold: " + stateData.amount);
                var rawData = walletService.getBurnRawTxnObject(sol, sol);
                const response = await executeRawTransaction(rawData);
                console.log("execting: ");
                setStateData({ ...stateData, resp: response });
                // setActiveSection('transferResponse');
            } catch (error) {
                setError(`Failed to transfer tokens: ${error.message}`);
            }
        }
    }

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  };
  const buttonStyle = {
    margin: '5px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  };
  // const formStyle = {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   width: '100%',
  //   maxWidth: '400px',
  // };
  const inputStyle = {
    margin: '5px',
    padding: '10px',
    width: '100%',
    fontSize: '16px',
  };

  return (
    <div style={containerStyle}>
        <h1>Your current gold balance is: { goldBalance }</h1>

        <input
          style={inputStyle}
          type="number"
          name="amount"
          placeholder="Amount"
          value={ stateData.amount }
          onChange={ handleInputChange }
          required
        />

        <button style={buttonStyle} onClick={ buyGold }>Buy Gold</button>

        <input
          style={inputStyle}
          type="text"
          name="recipientAdd"
          placeholder="Recipient Address"
          value={ stateData.recipient_address }
          onChange={ handleInputChange }
          required
        />
        <button style={buttonStyle} onClick={ transferGold }>Transfer Gold</button>


        <button style={buttonStyle} onClick={ burnGold }>Burn Gold</button>

        <button style={buttonStyle} onClick={ logout }>Logout</button>
        

        <h1>Repsonse is: {stateData.resp}</h1>

        {error && (
            <div style={{ color: 'red' }}>
            <h2>Error:</h2>
            <p>{error}</p>
            </div>
        )}
    </div>
);
}

export default Main;