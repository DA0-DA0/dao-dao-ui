import 'styles/globals.css'
import 'styles/app.css'
import { useState, useEffect } from 'react'
import { Suspense } from 'react'

import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import { RecoilRoot } from 'recoil'

import { HomepageLayout } from 'components/HomepageLayout'
import SidebarLayout from 'components/Layout'
import LoadingScreen from 'components/LoadingScreen'
import Notifications from 'components/Notifications'
import { ThemeProvider } from 'contexts/theme'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const [theme, setTheme] = useState('junoLight')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => setLoaded(true), [])

  function updateTheme(themeName: string) {
    setTheme(themeName)
  }

  const Layout = router.pathname === '/' ? HomepageLayout : SidebarLayout

  return (
    <RecoilRoot>
      <Suspense fallback={<LoadingScreen />}>
        <ThemeProvider updateTheme={updateTheme} theme={theme}>
          {loaded && (
            <Layout>
              <Component {...pageProps} />
              <Notifications />
            </Layout>
          )}
        </ThemeProvider>
      </Suspense>
    </RecoilRoot>
  )
}
export default MyApp
