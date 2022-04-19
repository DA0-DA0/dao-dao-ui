import '@dao-dao/ui/globals.css'

import { useState, useEffect, Suspense } from 'react'

import type { AppProps } from 'next/app'

import { RecoilRoot, useRecoilState } from 'recoil'

import { activeThemeAtom } from '@dao-dao/state'
import { ThemeProvider, Theme, LoadingScreen } from '@dao-dao/ui'

import { ErrorBoundary, Notifications } from '@/components'

const InnerApp = ({ Component, pageProps }: AppProps) => {
  const [theme, setTheme] = useRecoilState(activeThemeAtom)
  const [accentColor, setAccentColor] = useState<string | undefined>()

  // Ensure correct theme class is set on document.
  useEffect(() => {
    Object.values(Theme).forEach((value) =>
      document.documentElement.classList.toggle(value, value === theme)
    )
  }, [theme])

  return (
    <ThemeProvider
      accentColor={accentColor}
      setAccentColor={setAccentColor}
      theme={theme}
      updateTheme={setTheme}
    >
      <ErrorBoundary title="An unexpected error occurred.">
        <Suspense fallback={<LoadingScreen />}>
          <Header />

          <Component {...pageProps} />
        </Suspense>
      </ErrorBoundary>

      <Notifications />
    </ThemeProvider>
  )
}

const MyApp = (props: AppProps) => (
  <RecoilRoot>
    <InnerApp {...props} />
  </RecoilRoot>
)

export default MyApp
