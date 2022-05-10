import { Keplr } from '@keplr-wallet/types'
import { KeplrWalletConnectV1 } from 'cosmodal'

import { CHAIN_ID } from './constants'
import { suggestChain } from './keplr'

// Tries to enable chain for wallet and retrieve the signer.
export const getOfflineSignerAuto = async (
  walletClient: Keplr | KeplrWalletConnectV1
): Promise<Awaited<ReturnType<Keplr['getOfflineSignerAuto']>>> => {
  // Suggest chain if we can.
  if (!(walletClient instanceof KeplrWalletConnectV1)) {
    await suggestChain(walletClient)
  }

  await walletClient.enable(CHAIN_ID)
  return await walletClient.getOfflineSignerAuto(CHAIN_ID)
}

// Tries to enable chain for wallet and retrieve the amino signer.
export const getOfflineSignerOnlyAmino = async (
  walletClient: Keplr | KeplrWalletConnectV1
): Promise<Awaited<ReturnType<Keplr['getOfflineSignerOnlyAmino']>>> => {
  // Suggest chain if we can.
  if (!(walletClient instanceof KeplrWalletConnectV1)) {
    await suggestChain(walletClient)
  }

  await walletClient.enable(CHAIN_ID)
  return walletClient.getOfflineSignerOnlyAmino(CHAIN_ID)
}
