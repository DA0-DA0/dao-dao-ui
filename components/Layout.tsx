import { ReactNode, useState, useEffect } from 'react'
import Head from 'next/head'
import SidebarLayout from 'components/Sidebar'
import LoadingScreen from 'components/LoadingScreen'
import { useRecoilRefresher_UNSTABLE } from 'recoil'
import * as cosm from 'atoms/cosm'
import { getKeplr, connectKeplrWithoutAlerts } from 'services/keplr'
import WalletLoader from 'components/WalletLoader'

const PUBLIC_SITE_TITLE = process.env.NEXT_PUBLIC_SITE_TITLE

export default function Layout({ children }: { children: ReactNode }) {
  const [loaded, setLoaded] = useState(false)
  const [keplrInstance, setKeplrInstance] = useState(null)
  const [error, setError] = useState(false)
  const reset = useRecoilRefresher_UNSTABLE(cosm.kelprOfflineSigner)

  useEffect(() => {
    const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID

    async function loadKeplr() {
      try {
        const myKelpr = await getKeplr()
        await connectKeplrWithoutAlerts()
        await (window as any).keplr.enable(CHAIN_ID)
        // const result = (window as any).getOfflineSigner(CHAIN_ID)
        // console.log('result', result)
        setKeplrInstance(myKelpr)
      } catch (error) {
        console.log('errorz', error)
        setError(true)
      }
    }
    if (keplrInstance === null) {
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
  }, [keplrInstance])
  return (
    <div>
      <Head>
        <title>{PUBLIC_SITE_TITLE}</title>
        <link rel="icon" type="image/svg+xml" href="/daodao-dark.svg" />
        <link rel="icon" href="/yin_yang.png" />
      </Head>
      {error && <WalletLoader>Install Kelpr</WalletLoader>}
      {!keplrInstance && !error && <LoadingScreen />}

      {loaded && <SidebarLayout>{children}</SidebarLayout>}
    </div>
  )
}
