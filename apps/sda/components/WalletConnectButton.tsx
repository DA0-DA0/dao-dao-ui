import { useWallet } from '@dao-dao/state'
import { WalletConnect } from '@dao-dao/ui'
import {
  convertDenomToHumanReadableDenom,
  convertMicroDenomToDenomWithDecimals,
  NATIVE_DECIMALS,
  NATIVE_DENOM,
} from '@dao-dao/utils'

export const WalletConnectButton = () => {
  const { connect, address, name, nativeBalance } = useWallet()

  const walletBalance =
    nativeBalance !== undefined
      ? convertMicroDenomToDenomWithDecimals(nativeBalance, NATIVE_DECIMALS)
      : 0
  const humanDenom =
    convertDenomToHumanReadableDenom(NATIVE_DENOM).toUpperCase()

  return (
    <WalletConnect
      handleConnect={connect}
      walletAddress={address ?? ''}
      walletBalance={walletBalance}
      walletBalanceDenom={humanDenom}
      walletName={name}
    />
  )
}
