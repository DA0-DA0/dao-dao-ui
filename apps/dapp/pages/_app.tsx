import 'ui/globals.css'
import 'styles/app.css'
import { useState, useEffect } from 'react'
import { Suspense } from 'react'

import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import { RecoilRoot } from 'recoil'

import ReactTooltip from 'react-tooltip'
import { DEFAULT_THEME_NAME, ThemeProvider } from 'ui'

import ErrorBoundary from 'components/ErrorBoundary'
import { HomepageLayout } from 'components/HomepageLayout'
import SidebarLayout from 'components/Layout'
import LoadingScreen from 'components/LoadingScreen'
import Notifications from 'components/Notifications'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const [theme, setTheme] = useState(DEFAULT_THEME_NAME)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => setLoaded(true), [])
  useEffect(() => {
    setTheme((theme) => {
      let savedTheme = localStorage.getItem('theme')
      if (!(savedTheme === 'dark' || savedTheme === 'light')) {
        // Theme used to be either junoDark or junoLight. We've sinced moved on
        // to our own theming. This handles case where user has those old themes in
        // local storage.
        localStorage.setItem('theme', 'dark')
        savedTheme = 'dark'
      }
      const themeToUse = savedTheme ? savedTheme : theme
      document.documentElement.classList.add(themeToUse)
      return themeToUse
    })
  }, [])

  function updateTheme(themeName: string) {
    setTheme(themeName)
    const replace = themeName === 'dark' ? 'light' : 'dark'
    document.documentElement.classList.replace(replace, themeName)
    localStorage.setItem('theme', themeName)
  }

  const Layout = router.pathname === '/' ? HomepageLayout : SidebarLayout

  return (
    <RecoilRoot>
      <ErrorBoundary title="An unexpected error occured.">
        <Suspense fallback={<LoadingScreen />}>
          <ThemeProvider updateTheme={updateTheme} theme={theme}>
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
