import { useSupportedChainWallets } from '../../hooks'
import { WalletDaos } from '../wallet'

export const MeDaos = () => {
  const chainWallets = useSupportedChainWallets({
    attemptConnection: true,
  })

  return (
    <WalletDaos
      chainWallets={
        chainWallets.every(({ chainWallet: { address } }) => address)
          ? {
              loading: false,
              errored: false,
              data: chainWallets.flatMap(
                ({ chainWallet: { chain, address } }) =>
                  address
                    ? {
                        chainId: chain.chain_id,
                        walletAddress: address,
                      }
                    : []
              ),
            }
          : {
              loading: true,
              errored: false,
            }
      }
    />
  )
}
