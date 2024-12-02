import React, { useState } from 'react';
import TransferModal from './TransferModal';
import BuyModal from './BuyModal';
import BurnModal from './BurnModal';
import { useOkto } from "okto-sdk-react";
import { useNavigate } from "react-router-dom";

const LandingPage = (authToken, handleLogout) => {
    const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
    const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
    const [isBurnModalOpen, setIsBurnModalOpen] = useState(false);
    const navigate = useNavigate();
    const { logOut } = useOkto();

    const transfer = async() => {
        setIsTransferModalOpen(true);
    };

    const buy = async() => {
        setIsBuyModalOpen(true);
    };

    const burn = async() => {
        setIsBurnModalOpen(true);
    };

    const logout = async () => {
        try {
            logOut();
            handleLogout();
            navigate('/');
        } catch (error) {
            alert(error.message);
        }
    };
  
    return (
        <div style={styles.container}>
            {/* Top Menu Bar */}
            <div style={styles.navbar}>
                <div style={styles.logo}>ToGold</div>
                <div style={styles.navButtons}>
                    <button style={styles.navButton}>Home</button>
                    <button style={styles.navButton} onClick={ buy }>Buy</button>
                    <button style={styles.navButton} onClick={ transfer }>Transfer</button>
                    <button style={styles.navButton} onClick={ burn }>Burn</button>
                </div>
                <button style={styles.logoutButton} onClick={ logout }>Logout</button>
            </div>

            {/* Center Content */}
            <div style={styles.centerContent}>
                <h1 style={styles.heading}>Welcome to ToGold</h1>
                <p style={styles.text}>
                Experience the future of gold trading with our tokenized marketplace.
                </p>
            </div>

            {/* Transfer Modal */}

            <TransferModal isOpen={isTransferModalOpen} onClose={() => setIsTransferModalOpen(false)} />
            <BuyModal isOpen={isBuyModalOpen} onClose={() => setIsBuyModalOpen(false)} />
            <BurnModal isOpen={isBurnModalOpen} onClose={() => setIsBurnModalOpen(false)} />
        </div>
    )};

    const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    navbar: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        backgroundColor: '#333',
        color: '#fff',
    },
    logo: {
        fontSize: '24px',
        fontWeight: 'bold',
    },
    navButtons: {
        display: 'flex',
        gap: '15px',
    },
    navButton: {
        backgroundColor: 'transparent',
        color: '#fff',
        border: 'none',
        fontSize: '16px',
        cursor: 'pointer',
        padding: '5px 10px',
        borderRadius: '5px',
        transition: 'background-color 0.3s',
    },
    logoutButton: {
        backgroundColor: '#e74c3c',
        color: '#fff',
        border: 'none',
        fontSize: '16px',
        cursor: 'pointer',
        padding: '5px 15px',
        borderRadius: '5px',
        transition: 'background-color 0.3s',
    },
    centerContent: {
        textAlign: 'center',
    },
    heading: {
        fontSize: '48px',
        margin: '20px 0',
        color: '#333',
    },
    text: {
        fontSize: '20px',
        color: '#666',
    },
    transferButton: {
        marginTop: '20px',
        padding: '10px 20px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#28a745',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default LandingPage;
