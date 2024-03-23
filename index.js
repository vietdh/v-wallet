const Cosmos = require("@cosmostation/cosmosjs");

async function generateCosmosWallet() {
    // Initialize Cosmos object
    const chainId = "cosmoshub-4"; // Replace with your desired chain ID
    const cosmos = Cosmos.network("https://rpc.cosmos.network", chainId);
    
    // Generate a new wallet
    const wallet = cosmos.generateWallet();
    const address = wallet.address;
    const mnemonic = wallet.mnemonic;

    return { address, mnemonic };
}

const chainId = 'cosmoshub-3'; // Replace with the appropriate chain ID
const mnemonic = 'your-mnemonic-here'; // Replace with your mnemonic
const senderAddress = 'your-sender-address'; // Replace with your sender address
const recipientAddress = 'recipient-address'; // Replace with the recipient address
const amount = '1000uatom'; // Amount to send (in this example, 1000 uatom)

async function sendTransaction() {
    const cosmos = new Cosmos('https://lcd.testnet.cosmos.network', chainId);
    
    // Load the sender wallet
    const wallet = cosmos.wallet(mnemonic);

    // Build and sign the transaction
    const result = await cosmos.sendTokens(
        senderAddress,
        recipientAddress,
        amount,
        'This is a test transaction' // Memo (optional)
    );

    console.log('Transaction result:', result);
}

async function signTransaction() {
    const cosmos = new Cosmos('https://lcd.testnet.cosmos.network', chainId);
    
    // Load the sender wallet
    const wallet = cosmos.wallet(mnemonic);

    // Build the transaction
    const stdTx = {
        msg: [
            {
                type: 'cosmos-sdk/MsgSend',
                value: {
                    from_address: senderAddress,
                    to_address: recipientAddress,
                    amount: [
                        {
                            denom: 'uatom',
                            amount: amount,
                        },
                    ],
                },
            },
        ],
        fee: {
            amount: [
                {
                    denom: 'uatom',
                    amount: '5000', // Fee amount (in this example, 5000 uatom)
                },
            ],
            gas: '200000', // Gas limit
        },
        signatures: null,
        memo: 'This is a test transaction', // Memo (optional)
    };

    // Sign the transaction
    const signedTx = await wallet.sign(stdTx);

    console.log('Signed transaction:', signedTx);
}	

async function encodeTransaction() {
    const cosmos = new Cosmos('https://lcd.testnet.cosmos.network', chainId);
    
    // Load the sender wallet
    const wallet = cosmos.wallet(mnemonic);

    // Build the transaction
    const stdTx = {
        msg: [
            {
                type: 'cosmos-sdk/MsgSend',
                value: {
                    from_address: senderAddress,
                    to_address: recipientAddress,
                    amount: [
                        {
                            denom: 'uatom',
                            amount: amount,
                        },
                    ],
                },
            },
        ],
        fee: {
            amount: [
                {
                    denom: 'uatom',
                    amount: '5000', // Fee amount (in this example, 5000 uatom)
                },
            ],
            gas: '200000', // Gas limit
        },
        signatures: null,
        memo: 'This is a test transaction', // Memo (optional)
    };

    // Encode the transaction
    const encodedTx = cosmos.encodeTx(stdTx, 'block');

    console.log('Encoded transaction:', encodedTx);
}

async function decodeTransaction() {
    const cosmos = new Cosmos('https://lcd.testnet.cosmos.network', chainId);

    // Decode the transaction
    const decodedTx = cosmos.decodeTx(encodedTx);

    console.log('Decoded transaction:', decodedTx);
}

// Execute the function
generateCosmosWallet().then(walletInfo => {
    console.log("Address:", walletInfo.address);
    console.log("Mnemonic:", walletInfo.mnemonic);
}).catch(error => {
    console.error("Error:", error);
});
