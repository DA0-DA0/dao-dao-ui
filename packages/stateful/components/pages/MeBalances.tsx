import { useWallet } from '../../hooks'
import { WalletBalances, WalletLazyNftCard } from '../wallet'

export const MeBalances = () => {
  const {
    address: walletAddress,
    hexPublicKey,
    chain: { chain_id: chainId },
  } = useWallet({
    loadAccount: true,
  })

  return (
    <WalletBalances
      NftCard={WalletLazyNftCard}
      address={walletAddress}
      chainId={chainId}
      chainMode="all"
      editable
      hexPublicKey={hexPublicKey}
    />
  )
}
