import { ReactNode, useState, useEffect } from 'react'
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import LoadingScreen from 'components/LoadingScreen'
import WalletLoader from 'components/WalletLoader'
import Head from 'next/head'
import { useRecoilRefresher_UNSTABLE } from 'recoil'
import { getKeplr, connectKeplrWithoutAlerts } from 'services/keplr'
import { Keplr } from '@keplr-wallet/types'
import {kelprOfflineSigner} from 'selectors/cosm'

const PUBLIC_SITE_TITLE = process.env.NEXT_PUBLIC_SITE_TITLE

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
        console.error(error)
        setError(true)
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 text-base-content">
      <Head>
        <title>{PUBLIC_SITE_TITLE}</title>
        <link rel="icon" type="image/svg+xml" href="/daodao-dark.svg" />
        <link rel="icon" href="/yin_yang.png" />
      </Head>
      {error && <WalletLoader>Install Kelpr</WalletLoader>}
      {!keplrInstance && !error && <LoadingScreen />}

      {loaded && (
        <>
          <Nav />
          <main className="flex flex-col items-center justify-center w-full flex-1 p-2 md:px-20 text-center">
            {children}
          </main>
          <Footer />
        </>
      )}
    </div>
  )
}
