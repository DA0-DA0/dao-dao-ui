import { WalletClient } from '@noahsaso/cosmodal'

import { CHAIN_ID } from './constants'
import { suggestChain } from './keplr'

// Tries to enable chain for wallet and retrieve the signer.
export const getOfflineSignerAuto = async (
  walletClient: WalletClient,
  attemptSuggestChain?: boolean
): Promise<Awaited<ReturnType<WalletClient['getOfflineSignerAuto']>>> => {
  // Suggest chain if we can.
  if (attemptSuggestChain) {
    await suggestChain(walletClient)
  }

  await walletClient.enable(CHAIN_ID)
  return await walletClient.getOfflineSignerAuto(CHAIN_ID)
}

// Tries to enable chain for wallet and retrieve the amino signer.
export const getOfflineSignerOnlyAmino = async (
  walletClient: WalletClient,
  attemptSuggestChain?: boolean
): Promise<Awaited<ReturnType<WalletClient['getOfflineSignerOnlyAmino']>>> => {
  // Suggest chain if we can.
  if (attemptSuggestChain) {
    await suggestChain(walletClient)
  }

  await walletClient.enable(CHAIN_ID)
  return walletClient.getOfflineSignerOnlyAmino(CHAIN_ID)
}
