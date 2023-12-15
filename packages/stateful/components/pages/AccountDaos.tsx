import { useRouter } from 'next/router'

import { useChain } from '@dao-dao/stateless'
import { transformBech32Address } from '@dao-dao/utils'

import { WalletDaos } from '../wallet'

export const AccountDaos = () => {
  const { chain_id: chainId } = useChain()
  const { query: { address } = {} } = useRouter()

  // Type-check. This should already be validated in the Wallet component.
  if (typeof address !== 'string' || !address) {
    throw new Error('Invalid address.')
  }

  const walletAddress = transformBech32Address(address, chainId)

  return walletAddress ? <WalletDaos walletAddress={walletAddress} /> : null
}
