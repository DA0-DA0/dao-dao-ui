import '@dao-dao/ui/styles/index.css'
import '@fontsource/inter/latin.css'
import '@fontsource/jetbrains-mono/latin.css'

import { useState, useEffect } from 'react'
import { Suspense } from 'react'

import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import { RecoilRoot } from 'recoil'

import {
  DEFAULT_THEME_NAME,
  Theme,
  ThemeProvider,
  LoadingScreen,
} from '@dao-dao/ui'

import ErrorBoundary from 'components/ErrorBoundary'
import { HomepageLayout } from 'components/HomepageLayout'
import SidebarLayout from 'components/Layout'
import Notifications from 'components/Notifications'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const [theme, setTheme] = useState(DEFAULT_THEME_NAME)
  const [accentColor, setAccentColor] = useState<string | undefined>()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => setLoaded(true), [])
  useEffect(() => {
    setTheme((theme) => {
      let savedTheme = localStorage.getItem('theme') as Theme
      if (!Object.values(Theme).includes(savedTheme)) {
        // Theme used to be either junoDark or junoLight. We've since moved on
        // to our own theming. This handles case where user has those old themes in
        // local storage.
        savedTheme = Theme.Dark
        localStorage.setItem('theme', savedTheme)
      }
      const themeToUse = savedTheme ? savedTheme : theme
      document.documentElement.classList.add(themeToUse)
      return themeToUse
    })
  }, [])

  function updateTheme(themeName: Theme) {
    setTheme(themeName)
    Object.values(Theme).forEach((value) =>
      document.documentElement.classList.toggle(value, value === themeName)
    )
    localStorage.setItem('theme', themeName)
  }

  const Layout = router.pathname === '/' ? HomepageLayout : SidebarLayout

  return (
    <RecoilRoot>
      <ErrorBoundary title="An unexpected error occurred.">
        <Suspense fallback={<LoadingScreen />}>
          <ThemeProvider
            accentColor={accentColor}
            setAccentColor={setAccentColor}
            theme={theme}
            updateTheme={updateTheme}
          >
            {loaded && (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            )}
          </ThemeProvider>
        </Suspense>

        <Notifications />
      </ErrorBoundary>
    </RecoilRoot>
  )
}
export default MyApp
