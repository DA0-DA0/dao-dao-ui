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

function WalletConnect() {
  const [wallet, setWallet] = useRecoilState(connectedWalletAtom)
  const setInstallWarningVisible = useSetRecoilState(installWarningVisibleAtom)
  const setChainWarningVisible = useSetRecoilState(chainWarningVisibleAtom)
  const chainDisabled = useRecoilValue(chainDisabledAtom)
  const walletAddress = useRecoilValue(walletAddressSelector)

  const handleConnect = useCallback(() => {
    if (!wallet) {
      if (!(window as any).keplr) {
        setInstallWarningVisible(true)
      } else {
        if (chainDisabled) {
          setChainWarningVisible(true)
        } else {
          setInstallWarningVisible(false)
          setWallet('keplr')
        }
      }
    } else {
      setWallet('')
    }
  }, [
    chainDisabled,
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
