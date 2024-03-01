import { useRouter } from 'next/router'

import { useChain } from '@dao-dao/stateless'

import { useProfile } from '../../hooks'
import { WalletDaos } from '../wallet'

export const AccountDaos = () => {
  const { query: { address } = {} } = useRouter()

  // Type-check. This should already be validated in the Wallet component.
  if (typeof address !== 'string' || !address) {
    throw new Error('Invalid address.')
  }

  const { chain_id: chainId } = useChain()
  const { chains } = useProfile({
    address,
    onlySupported: true,
  })

  return (
    <WalletDaos
      chainWallets={
        chains.loading
          ? {
              loading: true,
              errored: false,
            }
          : {
              loading: false,
              errored: false,
              updating: chains.updating,
              data:
                // If no chains found, no profile; just show current chain.
                chains.data.length === 0
                  ? [
                      {
                        chainId,
                        address,
                      },
                    ]
                  : chains.data,
            }
      }
    />
  )
}
