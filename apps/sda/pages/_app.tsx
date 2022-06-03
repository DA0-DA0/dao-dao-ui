import '@dao-dao/ui/styles/index.css'
import '@fontsource/inter/latin.css'
import '@fontsource/jetbrains-mono/latin.css'

import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import { useState, useEffect, FC } from 'react'
import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil'

import {
  activeThemeAtom,
  mountedInBrowserAtom,
  WalletProvider,
} from '@dao-dao/state'
import { ThemeProvider, Theme, ErrorBoundary } from '@dao-dao/ui'
import {
  SITE_DESCRIPTION,
  SITE_IMAGE,
  SITE_TITLE,
  SITE_URL,
} from '@dao-dao/utils'

import { Footer, Notifications } from '@/components'

const InnerApp: FC<AppProps> = ({ Component, pageProps }) => {
  const setMountedInBrowser = useSetRecoilState(mountedInBrowserAtom)
  const [theme, setTheme] = useRecoilState(activeThemeAtom)
  const [themeChangeCount, setThemeChangeCount] = useState(0)
  const [accentColor, setAccentColor] = useState<string | undefined>()

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
      <ErrorBoundary title="An unexpected error occurred.">
        <Component {...pageProps} />
      </ErrorBoundary>

      <Footer />

      <Notifications />
    </ThemeProvider>
  )
}

const SDA: FC<AppProps> = (props) => (
  <>
    <DefaultSeo
      additionalLinkTags={[
        {
          href: '/apple-touch-icon.png',
          rel: 'apple-touch-icon',
          sizes: '180x180',
          type: 'image/png',
        },
        {
          href: '/favicon-32x32.png',
          rel: 'icon',
          sizes: '32x32',
          type: 'image/png',
        },
        {
          href: '/favicon-16x16.png',
          rel: 'icon',
          sizes: '16x16',
          type: 'image/png',
        },
        {
          href: '/site.webmanifest',
          rel: 'manifest',
        },
      ]}
      additionalMetaTags={[
        {
          name: 'msapplication-TileColor',
          content: '#da532c',
        },
        {
          name: 'theme-color',
          content: '#ffffff',
        },
      ]}
      description={SITE_DESCRIPTION}
      openGraph={{
        url: SITE_URL,
        type: 'website',
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        images: SITE_IMAGE ? [{ url: SITE_IMAGE }] : [],
      }}
      title={SITE_TITLE}
      twitter={{
        cardType: 'summary_large_image',
      }}
    />

    <RecoilRoot>
      <WalletProvider>
        <InnerApp {...props} />
      </WalletProvider>
    </RecoilRoot>
  </>
)

export default SDA
