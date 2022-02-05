import { ReactNode, useState, useEffect } from 'react'
import LoadingScreen from 'components/LoadingScreen'
import Head from 'next/head'
import { useRecoilRefresher_UNSTABLE, useRecoilState } from 'recoil'
import { getKeplr, connectKeplrWithoutAlerts } from 'services/keplr'
import { Keplr } from '@keplr-wallet/types'
import { kelprOfflineSigner } from 'selectors/cosm'
import { SidebarLayout } from 'components/SidebarLayout'
import { InstallKeplr } from './InstallKeplr'
import { BetaNotice, BetaWarningModal } from './BetaWarning'
import { betaWarningAcceptedAtom, showBetaNoticeAtom } from 'atoms/status'
import { SITE_TITLE } from '../util/constants'

export default function Layout({ children }: { children: ReactNode }) {
  const [loaded, setLoaded] = useState(false)
  const [keplrInstance, setKeplrInstance] = useState<Keplr | undefined>()
  const [error, setError] = useState(false)
  const reset = useRecoilRefresher_UNSTABLE(kelprOfflineSigner)

  useEffect(() => {
    const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID

    async function loadKeplr() {
      try {
        const myKelpr = await getKeplr()
        await connectKeplrWithoutAlerts()
        await (window as any).keplr.enable(CHAIN_ID)
        setKeplrInstance(myKelpr)
      } catch (error) {
        console.error('error', error)
        setLoaded(true)
      }
    }

    if (!keplrInstance) {
      loadKeplr()
    }

    window.addEventListener('keplr_keystorechange', () => {
      console.log(
        'Key store in Keplr is changed. You may need to refetch the account info.'
      )
      reset()

      loadKeplr()
    })
    if (keplrInstance) {
      setLoaded(true)
    }
  }, [keplrInstance, reset])

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
      {!error && <LoadingScreen />}
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
