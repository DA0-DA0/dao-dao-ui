import 'styles/globals.css'
import 'styles/app.css'
import { useState, useEffect } from 'react'
import type { AppProps } from 'next/app'
import Layout from 'components/Layout'
import { SigningCosmWasmProvider } from 'contexts/cosmwasm'
import { ThemeProvider } from 'contexts/theme'
import Notifications from 'components/Notifications'
import { RecoilRoot } from 'recoil'
import { Suspense } from 'react'
import LoadingScreen from 'components/LoadingScreen'
import { useRouter } from 'next/router'
import { HomepageLayout } from 'components/HomepageLayout'
import ErrorBoundary from 'components/ErrorBoundary'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const [theme, setTheme] = useState('junoLight')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => setLoaded(true), [])

  function updateTheme(themeName: string) {
    setTheme(themeName)
  }

  if (router.pathname === '/') {
    return (
      <RecoilRoot>
        <Suspense fallback={<LoadingScreen />}>
          <SigningCosmWasmProvider>
            <ThemeProvider updateTheme={updateTheme} theme={theme}>
              {loaded && (
                <HomepageLayout>
                  <Component {...pageProps} />
                  <Notifications />
                </HomepageLayout>
              )}
            </ThemeProvider>
          </SigningCosmWasmProvider>
        </Suspense>
      </RecoilRoot>
    )
  }

  return (
    <RecoilRoot>
      <ErrorBoundary>
        <Suspense fallback={<LoadingScreen />}>
          <SigningCosmWasmProvider>
            <ThemeProvider updateTheme={updateTheme} theme={theme}>
              {loaded && (
                <Layout>
                  <Component {...pageProps} />
                  <Notifications />
                </Layout>
              )}
            </ThemeProvider>
          </SigningCosmWasmProvider>
        </Suspense>
      </ErrorBoundary>
    </RecoilRoot>
  )
}
export default MyApp
