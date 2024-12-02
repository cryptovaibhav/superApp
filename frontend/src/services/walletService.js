const MINT_ACCOUNT_ADDRESS = "5R2eqpt8G6Rf4MxYLNDMA7cj4gwR8hA39ZWcrU4tbuB2";
const MINT_AUTHORITY_ADDRESS = "F6QJEvfP8Zm75TSjVBDYXQEbdHJBzMHUD5wc8S9H8eHp";
const PERMANENT_DELEGATE_ADDRESS = "F6QJEvfP8Zm75TSjVBDYXQEbdHJBzMHUD5wc8S9H8eHp";
const TOKEN_2022_PROGRAM_ID = "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
const MINT_TO_TRANSACTION_DATA = [7,200,0,0,0,0,0,0,0];
const TRANSFER_TO_TRANSACTION_DATA = [12,100,0,0,0,0,0,0,0,2];
const BURN_TRANSACTION_DATA = [15,100,0,0,0,0,0,0,0,2];
const NETWORK_NAME = "SOLANA_DEVNET";

function getSolanaWalletAddress(userWallets) {
    var sol_wallet_arr = userWallets.wallets.filter(a=>a.network_name == "SOLANA_DEVNET");
    if(sol_wallet_arr.length > 0){
        return sol_wallet_arr[0].address;
    } else {
        return null;
    }
}

function getMintToRawTxnObject(mintToAccountAddress, tx_signer){
    var txnObj = {
        instructions:[{
                keys:[
                    { pubkey: MINT_ACCOUNT_ADDRESS, isSigner:false, isWritable:true}, // mint token account key - Fk5Rf8Ly1RoQKD9YLdMTsryZt62y6DVAHBQMpZXyXGAP
                    { pubkey: mintToAccountAddress, isSigner:false, isWritable:true}, // mint to token account key - will come from Okto
                    { pubkey: MINT_AUTHORITY_ADDRESS, isSigner:true, isWritable:false} // mint authority - F6QJEvfP8Zm75TSjVBDYXQEbdHJBzMHUD5wc8S9H8eHp
                ],
            programId: TOKEN_2022_PROGRAM_ID,
            data: MINT_TO_TRANSACTION_DATA
        }],
        signer: tx_signer // will come from Okto
    };

    var rawTxnObj = {
        network_name: NETWORK_NAME,
        transaction: txnObj,
    }

    return rawTxnObj;
}

function getTransferToRawTxnObject(sourceAccountAddress, transferToAccountAddress, tx_signer){
    var txnObj = {
        instructions:[{
                keys:[
                    { pubkey: sourceAccountAddress, isSigner:false, isWritable:true}, // source mint token account key - Fk5Rf8Ly1RoQKD9YLdMTsryZt62y6DVAHBQMpZXyXGAP
                    { pubkey: MINT_ACCOUNT_ADDRESS, isSigner:false, isWritable:true}, // mint token account key - Fk5Rf8Ly1RoQKD9YLdMTsryZt62y6DVAHBQMpZXyXGAP
                    { pubkey: transferToAccountAddress, isSigner:false, isWritable:true}, // transfer to token account key - will come from Okto
                    { pubkey: tx_signer, isSigner:true, isWritable:false} // Owner / delegate
                ],
            programId: TOKEN_2022_PROGRAM_ID,
            data: TRANSFER_TO_TRANSACTION_DATA
        }],
        signer: tx_signer // will come from Okto
    };

    var rawTxnObj = {
        network_name: NETWORK_NAME,
        transaction: txnObj,
    }

    return rawTxnObj;
}

function getBurnRawTxnObject(mintToAccountAddress, tx_signer){
    var txnObj = {
        instructions:[{
                keys:[
                    { pubkey: mintToAccountAddress, isSigner:false, isWritable:true}, // source account to burn account key - will come from Okto
                    { pubkey: MINT_ACCOUNT_ADDRESS, isSigner:false, isWritable:true}, // mint token account key - Fk5Rf8Ly1RoQKD9YLdMTsryZt62y6DVAHBQMpZXyXGAP                    
                    { pubkey: PERMANENT_DELEGATE_ADDRESS, isSigner:true, isWritable:false} // Owner / delegate
                ],
            programId: TOKEN_2022_PROGRAM_ID,
            data: BURN_TRANSACTION_DATA
        }],
        signer: tx_signer // will come from Okto
    };

    var rawTxnObj = {
        network_name: NETWORK_NAME,
        transaction: txnObj,
    }

    return rawTxnObj;
}

export default {
    getSolanaWalletAddress: getSolanaWalletAddress,
    getMintToRawTxnObject: getMintToRawTxnObject,
    getTransferToRawTxnObject: getTransferToRawTxnObject, 
    getBurnRawTxnObject: getBurnRawTxnObject
}