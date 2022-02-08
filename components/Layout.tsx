import { ReactNode, useState, useEffect } from 'react'
import LoadingScreen from 'components/LoadingScreen'
import Head from 'next/head'
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useSetRecoilState,
} from 'recoil'
import { getKeplr, connectKeplrWithoutAlerts } from 'services/keplr'
import { Keplr } from '@keplr-wallet/types'
import { kelprOfflineSigner, connectedWalletAtom } from 'selectors/cosm'
import { SidebarLayout } from 'components/SidebarLayout'
import { InstallKeplr } from './InstallKeplr'
import ChainEnableModal from './ChainEnableModal'
import { BetaNotice, BetaWarningModal } from './BetaWarning'
import { betaWarningAcceptedAtom, showBetaNoticeAtom } from 'atoms/status'
import { SITE_TITLE } from '../util/constants'
import {
  installWarningVisibleAtom,
  chainWarningVisibleAtom,
  chainDisabledAtom,
} from 'selectors/cosm'

const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID

export default function Layout({ children }: { children: ReactNode }) {
  const [loaded, setLoaded] = useState(false)
  const [keplrInstance, setKeplrInstance] = useState<Keplr | undefined>()
  const [error, setError] = useState(false)
  const reset = useRecoilRefresher_UNSTABLE(kelprOfflineSigner)
  const [installWarningVisible, setInstallWarningVisible] = useRecoilState(
    installWarningVisibleAtom
  )
  const [chainWarningVisible, setChainWarningVisible] = useRecoilState(
    chainWarningVisibleAtom
  )
  const setChainDisabled = useSetRecoilState(chainDisabledAtom)
  const [wallet, setWallet] = useRecoilState(connectedWalletAtom)

  useEffect(() => {
    async function loadKeplr() {
      try {
        setKeplrInstance(await getKeplr())
        setLoaded(true)
      } catch (error) {
        setChainDisabled(true)
        setLoaded(true)
      }
    }

    function onKeplrKeystoreChange() {
      console.log(
        'Key store in Keplr is changed. You may need to refetch the account info.'
      )
      reset()
      loadKeplr()
    }

    if (!keplrInstance) {
      loadKeplr()
    } else {
      setLoaded(true)
    }

    if (wallet === '') {
      window.removeEventListener('keplr_keystorechange', onKeplrKeystoreChange)
      return
    }

    if (wallet == 'keplr') {
      window.addEventListener('keplr_keystorechange', onKeplrKeystoreChange)
    }
  }, [keplrInstance, reset, setChainDisabled, wallet])

  const [betaWarningAccepted, setBetaWarningAccepted] = useRecoilState(
    betaWarningAcceptedAtom
  )
  const [showBetaNotice, setShowBetaNotice] = useRecoilState(showBetaNoticeAtom)

  return (
    <>
      <Head>
        <title>{SITE_TITLE}</title>
        <link rel="icon" type="image/svg+xml" href="/daodao-dark.svg" />
        <link rel="icon" href="/yin_yang.png" />
      </Head>
      {chainWarningVisible && (
        <ChainEnableModal
          onAction={() => {
            async function enableChain() {
              setChainWarningVisible(false)
              try {
                await connectKeplrWithoutAlerts()
                await (window as any).keplr.enable(CHAIN_ID)
                setChainDisabled(false)
                reset()
                setWallet('keplr')
              } catch {
                setError(true)
              }
            }
            enableChain()
          }}
          onClose={() => setChainWarningVisible(false)}
        />
      )}

      {installWarningVisible && (
        <InstallKeplr onClose={() => setInstallWarningVisible(false)} />
      )}
      {!loaded && !error && <LoadingScreen />}
      {!betaWarningAccepted && (
        <BetaWarningModal onAccept={() => setBetaWarningAccepted(true)} />
      )}
      {loaded && betaWarningAccepted && showBetaNotice && (
        <BetaNotice onClose={() => setShowBetaNotice(false)} />
      )}

      {loaded && <SidebarLayout>{children}</SidebarLayout>}
    </>
  )
}
