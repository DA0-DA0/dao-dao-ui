import { useCallback, useState } from 'react'

import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'

import {
  CashIcon,
  CheckCircleIcon,
  LogoutIcon,
  PaperClipIcon,
} from '@heroicons/react/outline'

import { Button } from '@components'

import {
  connectedWalletAtom,
  walletAddress as walletAddressSelector,
  installWarningVisibleAtom,
  chainWarningVisibleAtom,
  chainDisabledAtom,
  keplrAccountNameSelector,
  walletChainBalanceSelector,
} from 'selectors/cosm'
import { connectKeplrWithoutAlerts } from 'services/keplr'
import { NATIVE_DECIMALS, NATIVE_DENOM } from 'util/constants'
import {
  convertDenomToHumanReadableDenom,
  convertMicroDenomToDenomWithDecimals,
} from 'util/conversion'

import SvgWallet from './icons/Wallet'

const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="tooltip tooltip-top" data-tip="Copy wallet address">
      <button
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(text)
          setTimeout(() => setCopied(false), 2000)
          setCopied(true)
        }}
      >
        {copied ? (
          <CheckCircleIcon className="w-[18px]" />
        ) : (
          <PaperClipIcon className="w-[18px]" />
        )}
      </button>
    </div>
  )
}

function DisconnectButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="tooltip tooltip-top" data-tip="Disconnect wallet">
      <button type="button" onClick={onClick}>
        <LogoutIcon className="w-[18px]" />
      </button>
    </div>
  )
}

function WalletConnect() {
  const [wallet, setWallet] = useRecoilState(connectedWalletAtom)
  const setInstallWarningVisible = useSetRecoilState(installWarningVisibleAtom)
  const setChainWarningVisible = useSetRecoilState(chainWarningVisibleAtom)
  const setChainDisabled = useSetRecoilState(chainDisabledAtom)
  const walletAddress = useRecoilValue(walletAddressSelector)
  const walletName = useRecoilValue(keplrAccountNameSelector)
  const walletBalance = useRecoilValue(walletChainBalanceSelector)
  const walletBalanceHuman = convertMicroDenomToDenomWithDecimals(
    walletBalance,
    NATIVE_DECIMALS
  )
  const chainDenomHuman =
    convertDenomToHumanReadableDenom(NATIVE_DENOM).toUpperCase()

  const handleConnect = useCallback(async () => {
    if (!wallet) {
      if (!(window as any).keplr) {
        setInstallWarningVisible(true)
      } else {
        try {
          await connectKeplrWithoutAlerts()
          await (window as any).keplr.enable(CHAIN_ID)
          setInstallWarningVisible(false)
          setWallet('keplr')
        } catch {
          setChainWarningVisible(true)
          setChainDisabled(true)
        }
      }
    } else {
      setWallet('')
    }
  }, [
    setChainDisabled,
    wallet,
    setChainWarningVisible,
    setInstallWarningVisible,
    setWallet,
  ])

  if (walletAddress) {
    return (
      <div className="w-full relative py-2 px-4 my-4 border border-secondary hover:border-accent rounded-lg group">
        <div className="flex items-center justify-left gap-4 h-full w-full">
          <SvgWallet width="20px" height="20px" fill="currentColor" />
          <div className="font-mono text-sm">
            <span>{walletName}</span>
            <br />
            <span className="text-accent text-light">
              {walletBalanceHuman} {chainDenomHuman}
            </span>
          </div>
        </div>
        <div className="absolute right-2 top-1 flex gap-1 transition opacity-0 group-hover:opacity-100">
          <CopyButton text={walletAddress} />
          <DisconnectButton onClick={handleConnect} />
        </div>
      </div>
    )
  }

  return (
    <div className="my-4 ">
      <Button
        full
        onClick={handleConnect}
        iconBefore={<CashIcon className="inline w-4 h-4" />}
      >
        Connect wallet
      </Button>
    </div>
  )
}

export default WalletConnect
