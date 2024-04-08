const Cosmos = require("@cosmostation/cosmosjs");

const chainId = 'cosmoshub-3'; // Replace with the appropriate chain ID
const mnemonic = 'your-mnemonic-here'; // Replace with your mnemonic
const senderAddress = 'your-sender-address'; // Replace with your sender address
const recipientAddress = 'recipient-address'; // Replace with the recipient address
const amount = '1000uatom'; // Amount to send (in this example, 1000 uatom)

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

async function sendTransactionCosmos() {
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

// Execute the function
generateCosmosWallet().then(walletInfo => {
    console.log("Address:", walletInfo.address);
    console.log("Mnemonic:", walletInfo.mnemonic);
}).catch(error => {
    console.error("Error:", error);
});
