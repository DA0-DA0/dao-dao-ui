import { FunctionComponent } from 'react'

// import { useRouter } from 'next/router'

import { useWallet } from '@dao-dao/state'
import { WalletConnect } from '@dao-dao/ui'
import {
  convertDenomToHumanReadableDenom,
  convertMicroDenomToDenomWithDecimals,
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  SITE_TITLE,
} from '@dao-dao/utils'

import { ProfileIcon, Logo } from '@/components'

export const Header: FunctionComponent = () => {
  // const router = useRouter()
  const { connect, connected, address, name, nativeBalance } = useWallet()

  const walletBalance =
    nativeBalance !== undefined
      ? convertMicroDenomToDenomWithDecimals(nativeBalance, NATIVE_DECIMALS)
      : 0
  const humanDenom =
    convertDenomToHumanReadableDenom(NATIVE_DENOM).toUpperCase()

  return (
    <header className="grid grid-cols-3 items-center py-4 px-6">
      <div className="flex flex-row gap-2 items-center w-full md:gap-4">
        <Logo height={40} width={40} />
        <p className="hidden text-xl md:block">{SITE_TITLE}</p>
      </div>

      <div className="justify-self-center"></div>

      <div className="w-full h-10">
        {connected ? (
          <div className="flex flex-row flex-1 gap-3 justify-end items-center h-full">
            <div className="flex flex-col items-end text-right link-text">
              <span>{name}</span>
              <span className="text-secondary capitalize">
                {walletBalance} {humanDenom}
              </span>
            </div>

            <ProfileIcon height={40} width={40} />
          </div>
        ) : (
          <WalletConnect
            handleConnect={connect}
            walletAddress={address ?? ''}
            walletBalance={walletBalance}
            walletBalanceDenom={humanDenom}
            walletName={name}
          />
        )}
      </div>
    </header>
  )
}
