import '@dao-dao/ui/styles/index.css'
import '@fontsource/inter/latin.css'
import '@fontsource/jetbrains-mono/latin.css'

import { appWithTranslation, useTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil'

import { activeThemeAtom, mountedInBrowserAtom } from '@dao-dao/state'
import { ErrorBoundary, Notifications, Theme, ThemeProvider } from '@dao-dao/ui'

import { AppLayout, HomepageLayout } from '@/components'

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
  const Layout = isHomepage ? HomepageLayout : AppLayout

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
    <ThemeProvider
      accentColor={accentColor}
      setAccentColor={setAccentColor}
      theme={theme}
      themeChangeCount={themeChangeCount}
      updateTheme={setTheme}
    >
      <ErrorBoundary title={t('error.unexpectedError')}>
        <Layout>
          <Component {...pageProps} />
        </Layout>

        <Notifications />
      </ErrorBoundary>
    </ThemeProvider>
  )
}

const dApp: FC<AppProps> = (props) => (
  <>
    <Head>
      <meta
        content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
        name="viewport"
      />
    </Head>

    <RecoilRoot>
      <InnerApp {...props} />
    </RecoilRoot>
  </>
)

export default appWithTranslation(dApp)
