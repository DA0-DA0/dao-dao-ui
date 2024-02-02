import { useWallet } from '../../hooks'
import {
  WalletBalances,
  WalletConfiguredChainSwitcherHeader,
  WalletLazyNftCard,
} from '../wallet'

export const MeBalances = () => {
  const { address: walletAddress, hexPublicKey } = useWallet({
    loadAccount: true,
  })

  return (
    <WalletBalances
      MobileChainSwitcher={WalletConfiguredChainSwitcherHeader}
      NftCard={WalletLazyNftCard}
      address={walletAddress}
      editable
      hexPublicKey={hexPublicKey}
    />
  )
}
