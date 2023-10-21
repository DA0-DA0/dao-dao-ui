import { useWallet } from '../../hooks'
import { WalletLazyNftCard } from '../nft'
import { WalletBalances } from './WalletBalances'

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
      hexPublicKey={hexPublicKey}
    />
  )
}
