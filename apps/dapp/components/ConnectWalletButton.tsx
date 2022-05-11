import { FC } from 'react'

import { useWallet } from '@dao-dao/state'
import { WalletConnect, MobileWalletConnect } from '@dao-dao/ui'
import {
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  convertDenomToHumanReadableDenom,
  convertMicroDenomToDenomWithDecimals,
} from '@dao-dao/utils'

// Connection errors handled in Layout component.
const ConnectWalletButton: FC<{ mobile?: boolean }> = ({ mobile }) => {
  const { connect, disconnect, address, name, nativeBalance } = useWallet()

  const walletBalanceHuman = convertMicroDenomToDenomWithDecimals(
    nativeBalance ?? 0,
    NATIVE_DECIMALS
  )
  const chainDenomHuman = convertDenomToHumanReadableDenom(NATIVE_DENOM)

  return mobile ? (
    <MobileWalletConnect
      className="w-full"
      onConnect={connect}
      onDisconnect={disconnect}
      walletAddress={address ?? ''}
      walletBalance={walletBalanceHuman}
      walletBalanceDenom={chainDenomHuman}
      walletName={name}
    />
  ) : (
    <WalletConnect
      className="w-full"
      onConnect={connect}
      onDisconnect={disconnect}
      walletAddress={address ?? ''}
      walletBalance={walletBalanceHuman}
      walletBalanceDenom={chainDenomHuman}
      walletName={name}
    />
  )
}

export default ConnectWalletButton
