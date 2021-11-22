import 'styles/globals.css'
import { useState } from 'react'
import type { AppProps } from 'next/app'
import Layout from 'components/Layout'
import { SigningCosmWasmProvider } from 'contexts/cosmwasm'
import { ThemeProvider } from 'contexts/theme'
import Notifications from 'components/Notifications'

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState('junoLight')

  function updateTheme(themeName: string) {
    setTheme(themeName)
  }

  return (
    <SigningCosmWasmProvider>
      <ThemeProvider updateTheme={updateTheme} theme={theme}>
        <Layout>
          <Component {...pageProps} />
          <Notifications />
        </Layout>
      </ThemeProvider>
    </SigningCosmWasmProvider>
  )
}
export default MyApp
