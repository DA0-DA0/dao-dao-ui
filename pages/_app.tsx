import 'styles/globals.css'
import { useState } from 'react'
import type { AppProps } from 'next/app'
import Layout from 'components/Layout'
import { SigningCosmWasmProvider } from 'contexts/cosmwasm'
import { ThemeProvider } from 'contexts/theme'
import Notifications from 'components/Notifications'
import { RecoilRoot } from 'recoil'
import { Suspense } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState('junoLight')

  function updateTheme(themeName: string) {
    setTheme(themeName)
  }

  return (
    <RecoilRoot>
      <Suspense fallback={<div>Loading...</div>}>
        <SigningCosmWasmProvider>
          <ThemeProvider updateTheme={updateTheme} theme={theme}>
            <Layout>
              <Component {...pageProps} />
              <Notifications />
            </Layout>
          </ThemeProvider>
        </SigningCosmWasmProvider>
      </Suspense>
    </RecoilRoot>
  )
}
export default MyApp
