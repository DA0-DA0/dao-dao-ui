import { useRouter } from 'next/router'

import { getSupportedChains, transformBech32Address } from '@dao-dao/utils'

import { WalletDaos } from '../wallet'

export const AccountDaos = () => {
  const { query: { address } = {} } = useRouter()

  // Type-check. This should already be validated in the Wallet component.
  if (typeof address !== 'string' || !address) {
    throw new Error('Invalid address.')
  }

  // Get wallets on all DAO DAO-supported chains. Once we support chains with
  // other HD paths (coin types), we need to re-think this.
  const chainWallets = getSupportedChains().map(({ chain }) => ({
    chainId: chain.chain_id,
    walletAddress: transformBech32Address(address, chain.chain_id),
  }))

  return (
    <WalletDaos
      chainWallets={{
        loading: false,
        errored: false,
        data: chainWallets,
      }}
    />
  )
}
