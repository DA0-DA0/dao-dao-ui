import { FC } from 'react'

import { useWallet } from '@dao-dao/state'
import { WalletConnect } from '@dao-dao/ui'
import {
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  convertDenomToHumanReadableDenom,
  convertMicroDenomToDenomWithDecimals,
} from '@dao-dao/utils'

// Connection errors handled in Layout component.
const ConnectWalletButton: FC = () => {
  const { connect, disconnect, address, name, nativeBalance } = useWallet()

  const walletBalanceHuman = convertMicroDenomToDenomWithDecimals(
    nativeBalance ?? 0,
    NATIVE_DECIMALS
  )
  const chainDenomHuman = convertDenomToHumanReadableDenom(NATIVE_DENOM)

  return (
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
