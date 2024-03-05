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

// Execute the function
generateCosmosWallet().then(walletInfo => {
    console.log("Address:", walletInfo.address);
    console.log("Mnemonic:", walletInfo.mnemonic);
}).catch(error => {
    console.error("Error:", error);
});
