import { useWallet } from '../../hooks'
import { WalletBalances, WalletLazyNftCard } from '../wallet'

export const MeBalances = () => {
  const { address: walletAddress, hexPublicKey } = useWallet({
    loadAccount: true,
  })

  return (
    <WalletBalances
      NftCard={WalletLazyNftCard}
      address={walletAddress}
      chainMode="all"
      editable
      hexPublicKey={hexPublicKey}
    />
  )
}
