export type MintNftData = {
  // Smart contract address of the NFT collection.
  nftCollection: string
  description: string
  // Mint NFT button.
  mint: {
    contract: string
    // JSON-encoded message to send to the contract. {{wallet}} is replaced with
    // the user's wallet address.
    msg: string
    buttonLabel: string
  }
}
