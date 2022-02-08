import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'
import {
  connectedWalletAtom,
  walletAddress as walletAddressSelector,
  installWarningVisibleAtom,
  chainWarningVisibleAtom,
  chainDisabledAtom,
} from 'selectors/cosm'
import { Button } from '@components'
import { useCallback } from 'react'
import { CashIcon } from '@heroicons/react/outline'
import { connectKeplrWithoutAlerts } from 'services/keplr'
const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID

function WalletConnect() {
  const [wallet, setWallet] = useRecoilState(connectedWalletAtom)
  const setInstallWarningVisible = useSetRecoilState(installWarningVisibleAtom)
  const setChainWarningVisible = useSetRecoilState(chainWarningVisibleAtom)
  const setChainDisabled = useSetRecoilState(chainDisabledAtom)
  const walletAddress = useRecoilValue(walletAddressSelector)

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

  return (
    <div className="flex flex-grow md:flex-grow-0 mt-4">
      {walletAddress ? (
        <Button full onClick={handleConnect}>
          {walletAddress}
        </Button>
      ) : (
        <Button
          full
          onClick={handleConnect}
          iconBefore={<CashIcon className="inline w-4 h-4" />}
        >
          Connect wallet
        </Button>
      )}
    </div>
  )
}

export default WalletConnect
