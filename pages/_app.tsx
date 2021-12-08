import 'styles/globals.css'
import { useState } from 'react'
import type { AppProps } from 'next/app'
import Layout from 'components/Layout'
import { SigningCosmWasmProvider } from 'contexts/cosmwasm'
import { ThemeProvider } from 'contexts/theme'
import Notifications from 'components/Notifications'
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil'

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState('junoLight')

  function updateTheme(themeName: string) {
    setTheme(themeName)
  }

  return (
    <RecoilRoot>
      <SigningCosmWasmProvider>
        <ThemeProvider updateTheme={updateTheme} theme={theme}>
          <Layout>
            <Component {...pageProps} />
            <Notifications />
          </Layout>
        </ThemeProvider>
      </SigningCosmWasmProvider>
    </RecoilRoot>
  )
}
export default MyApp
