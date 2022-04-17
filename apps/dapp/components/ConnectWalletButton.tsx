import { useCallback } from 'react'

import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'

import { WalletConnect as StatelessWalletConnect } from '@dao-dao/ui'
import {
  CHAIN_ID,
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  convertDenomToHumanReadableDenom,
  convertMicroDenomToDenomWithDecimals,
} from '@dao-dao/utils'

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

  return (
    <StatelessWalletConnect
      walletAddress={walletAddress}
      walletName={walletName}
      walletBalance={walletBalanceHuman}
      walletBalanceDenom={chainDenomHuman}
      handleConnect={handleConnect}
    />
  )
}

export default WalletConnect
