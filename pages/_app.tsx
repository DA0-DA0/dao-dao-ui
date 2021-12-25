import 'styles/globals.css'
import { useState, useEffect } from 'react'
import type { AppProps } from 'next/app'
import Layout from 'components/Layout'
import { SigningCosmWasmProvider } from 'contexts/cosmwasm'
import { ThemeProvider } from 'contexts/theme'
import Notifications from 'components/Notifications'
import { RecoilRoot } from 'recoil'
import { Suspense } from 'react'
import LoadingScreen from 'components/LoadingScreen'

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState('junoLight')
  const [loaded, setLoaded] = useState(false)
  useEffect(() => setLoaded(true), [])

  function updateTheme(themeName: string) {
    setTheme(themeName)
  }

  return (
    <RecoilRoot>
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
    </RecoilRoot>
  )
}
export default MyApp
