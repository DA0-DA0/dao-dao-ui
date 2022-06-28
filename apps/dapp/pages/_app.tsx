import '@dao-dao/ui/styles/index.css'
import '@fontsource/inter/latin.css'
import '@fontsource/jetbrains-mono/latin.css'

import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil'

import { appWithTranslation, useTranslation } from '@dao-dao/i18n'
import { activeThemeAtom, mountedInBrowserAtom } from '@dao-dao/state'
import { ErrorBoundary, Notifications, Theme, ThemeProvider } from '@dao-dao/ui'

import { HomepageLayout, SidebarLayout } from '@/components'

const InnerApp: FC<AppProps> = ({ Component, pageProps }) => {
  const { t } = useTranslation()
  const router = useRouter()

  const setMountedInBrowser = useSetRecoilState(mountedInBrowserAtom)
  const [_theme, setTheme] = useRecoilState(activeThemeAtom)
  const [themeChangeCount, setThemeChangeCount] = useState(0)
  const [accentColor, setAccentColor] = useState<string | undefined>()

  const isHomepage = router.pathname === '/'
  // Always display the homepage with dark theme.
  const theme = isHomepage ? Theme.Dark : _theme
  const Layout = isHomepage ? HomepageLayout : SidebarLayout

  // Indicate that we are mounted.
  useEffect(() => setMountedInBrowser(true), [setMountedInBrowser])

  // On theme change, update DOM and state.
  useEffect(() => {
    // Ensure correct theme class is set on document.
    Object.values(Theme).forEach((value) =>
      document.documentElement.classList.toggle(value, value === theme)
    )
    // Update theme change count.
    setThemeChangeCount((c) => c + 1)
  }, [theme])

  return (
    <>
      <Head>
        <meta
          content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
          name="viewport"
        />
      </Head>
      <ErrorBoundary title={t('error.unexpectedError')}>
        <ThemeProvider
          accentColor={accentColor}
          setAccentColor={setAccentColor}
          theme={theme}
          themeChangeCount={themeChangeCount}
          updateTheme={setTheme}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>

          <Notifications />
        </ThemeProvider>
      </ErrorBoundary>
    </>
  )
}

const dApp: FC<AppProps> = (props) => (
  <RecoilRoot>
    <InnerApp {...props} />
  </RecoilRoot>
)

export default appWithTranslation(dApp)
