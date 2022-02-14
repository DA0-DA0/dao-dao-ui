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
import { DEFAULT_THEME_NAME, ThemeProvider } from 'contexts/theme'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const [theme, setTheme] = useState(DEFAULT_THEME_NAME)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => setLoaded(true), [])
  useEffect(() => {
    setTheme((theme) => {
      const savedTheme = localStorage.getItem('theme')
      let themeToUse = theme
      if (!savedTheme) {
        themeToUse = DEFAULT_THEME_NAME
      }
      document.documentElement.setAttribute('data-theme', themeToUse)
      return themeToUse
    })
  })

  function updateTheme(themeName: string) {
    document.documentElement.setAttribute('data-theme', themeName)
    setTheme(themeName)
    localStorage.setItem('theme', themeName)
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
