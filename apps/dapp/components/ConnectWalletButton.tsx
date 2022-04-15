import { useCallback } from 'react'

import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'

import { Button, Tooltip } from '@dao-dao/ui'
import {
  CHAIN_ID,
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  convertDenomToHumanReadableDenom,
  convertMicroDenomToDenomWithDecimals,
} from '@dao-dao/utils'
import { CheckCircleIcon, LogoutIcon } from '@heroicons/react/outline'

import {
  connectedWalletAtom,
  walletAddress as walletAddressSelector,
  installWarningVisibleAtom,
  chainWarningVisibleAtom,
  chainDisabledAtom,
  keplrAccountNameSelector,
  walletChainBalanceSelector,
  noKeplrAccountAtom,
} from 'selectors/cosm'
import { connectKeplrWithoutAlerts } from 'services/keplr'

import SvgCopy from './icons/Copy'
import SvgWallet from './icons/Wallet'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <Tooltip label="Copy wallet address">
      <button
        onClick={() => {
          navigator.clipboard.writeText(text)
          setTimeout(() => setCopied(false), 2000)
          setCopied(true)
        }}
        type="button"
      >
        {copied ? (
          <CheckCircleIcon className="w-[18px]" />
        ) : (
          <SvgCopy color="currentColor" height="18px" width="18px" />
        )}
      </button>
    </Tooltip>
  )
}

function DisconnectButton({ onClick }: { onClick: () => void }) {
  return (
    <Tooltip label="Disconnect wallet">
      <button onClick={onClick} type="button">
        <LogoutIcon className="w-[18px]" />
      </button>
    </Tooltip>
  )
}

function WalletConnect() {
  const [wallet, setWallet] = useRecoilState(connectedWalletAtom)
  const setInstallWarningVisible = useSetRecoilState(installWarningVisibleAtom)
  const setChainWarningVisible = useSetRecoilState(chainWarningVisibleAtom)
  const setChainDisabled = useSetRecoilState(chainDisabledAtom)
  const setNoKeplrAccount = useSetRecoilState(noKeplrAccountAtom)
  const walletAddress = useRecoilValue(walletAddressSelector)
  const walletName = useRecoilValue(keplrAccountNameSelector)
  const walletBalance = useRecoilValue(walletChainBalanceSelector)
  const walletBalanceHuman = convertMicroDenomToDenomWithDecimals(
    walletBalance,
    NATIVE_DECIMALS
  )
  const chainDenomHuman = convertDenomToHumanReadableDenom(NATIVE_DENOM)

  const handleConnect = useCallback(async () => {
    if (!wallet) {
      if (!(window as any).keplr) {
        setInstallWarningVisible(true)
      } else {
        try {
          console.log(CHAIN_ID)
          await connectKeplrWithoutAlerts()
          await (window as any).keplr.enable(CHAIN_ID)
          setInstallWarningVisible(false)
          setWallet('keplr')
        } catch (e: any) {
          console.log(e)
          if (e.message === "key doesn't exist") {
            setNoKeplrAccount(true)
          } else {
            setChainWarningVisible(true)
            setChainDisabled(true)
          }
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
    setNoKeplrAccount,
    setWallet,
  ])

  if (walletAddress) {
    return (
      <div className="group relative py-2 px-4 my-4 w-full bg-primary rounded-lg hover:outline-brand hover:outline">
        <div className="flex gap-4 items-center w-full h-full justify-left">
          <SvgWallet fill="currentColor" height="20px" width="20px" />
          <div className="link-text">
            <span>{walletName}</span>
            <br />
            <span className="text-secondary capitalize">
              {walletBalanceHuman} {chainDenomHuman}
            </span>
          </div>
        </div>
        <div className="flex absolute top-1 right-2 gap-1 opacity-0 group-hover:opacity-100 transition">
          <CopyButton text={walletAddress} />
          <DisconnectButton onClick={handleConnect} />
        </div>
      </div>
    )
  }
  return (
    <div className="my-4">
      <Button
        className="py-4 w-full hover:outline-brand hover:outline"
        full
        onClick={handleConnect}
      >
        <SvgWallet fill="currentColor" height="20px" width="20px" />
        <p className="text-light link-text">Connect wallet</p>
      </Button>
    </div>
  )
}

export default WalletConnect
