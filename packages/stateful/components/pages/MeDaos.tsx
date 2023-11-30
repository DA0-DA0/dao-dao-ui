import { useWallet } from '../../hooks/useWallet'
import { WalletDaos } from '../wallet'

export const MeDaos = () => {
  const { address: walletAddress } = useWallet({
    loadAccount: false,
  })

  return walletAddress ? <WalletDaos walletAddress={walletAddress} /> : null
}
