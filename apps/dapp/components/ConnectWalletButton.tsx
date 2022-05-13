import { FC } from 'react'

import { useWallet } from '@dao-dao/state'
import { WalletConnect, MobileWalletConnect, NoMobileWallet } from '@dao-dao/ui'
import {
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  convertDenomToHumanReadableDenom,
  convertMicroDenomToDenomWithDecimals,
  CHAIN_ID,
} from '@dao-dao/utils'
import { isMobile } from '@walletconnect/browser-utils'

// Connection errors handled in Layout component.
const ConnectWalletButton: FC<{ mobile?: boolean }> = ({ mobile }) => {
  const {
    connect,
    disconnect,
    address,
    name,
    nativeBalance,
    isMobileWeb,
    connected,
  } = useWallet()

  const walletBalanceHuman = convertMicroDenomToDenomWithDecimals(
    nativeBalance ?? 0,
    NATIVE_DECIMALS
  )
  const chainDenomHuman = convertDenomToHumanReadableDenom(NATIVE_DENOM)

  if (mobile && isMobile() && CHAIN_ID !== 'juno-1') {
    return <NoMobileWallet />
  }

  return mobile ? (
    <MobileWalletConnect
      className="w-full"
      connected={connected}
      onConnect={connect}
      onDisconnect={isMobileWeb ? undefined : disconnect}
      walletAddress={address ?? ''}
      walletBalance={walletBalanceHuman}
      walletBalanceDenom={chainDenomHuman}
      walletName={name}
    />
  ) : (
    <WalletConnect
      className="w-full"
      connected={connected}
      onConnect={connect}
      onDisconnect={isMobileWeb ? undefined : disconnect}
      walletAddress={address ?? ''}
      walletBalance={walletBalanceHuman}
      walletBalanceDenom={chainDenomHuman}
      walletName={name}
    />
  )
}

export default ConnectWalletButton
