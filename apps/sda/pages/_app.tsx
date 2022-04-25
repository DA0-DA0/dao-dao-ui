import '@dao-dao/ui/styles/index.css'
import '@fontsource/inter/latin.css'
import '@fontsource/jetbrains-mono/latin.css'

import { useState, useEffect } from 'react'

import type { AppProps } from 'next/app'

import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil'

import { activeThemeAtom, mountedInBrowserAtom } from '@dao-dao/state'
import { ThemeProvider, Theme } from '@dao-dao/ui'
import { SITE_TITLE } from '@dao-dao/utils'
import { DefaultSeo } from 'next-seo'

import {
  ErrorBoundary,
  Footer,
  Header,
  Notifications,
  Loader,
  SuspenseLoader,
} from '@/components'

const description = process.env.NEXT_PUBLIC_SITE_DESCRIPTION
const image = process.env.NEXT_PUBLIC_SITE_IMAGE
const url = process.env.NEXT_PUBLIC_SITE_URL

const InnerApp = ({ Component, pageProps }: AppProps) => {
  const setMountedInBrowser = useSetRecoilState(mountedInBrowserAtom)
  const [theme, setTheme] = useRecoilState(activeThemeAtom)
  const [accentColor, setAccentColor] = useState<string | undefined>()

  // Indicate that we are mounted.
  useEffect(() => setMountedInBrowser(true), [setMountedInBrowser])

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
      <Header />

      <ErrorBoundary title="An unexpected error occurred.">
        <SuspenseLoader fallback={<Loader fillScreen size={64} />}>
          <Component {...pageProps} />
        </SuspenseLoader>
      </ErrorBoundary>

      <Footer />

      <Notifications />
    </ThemeProvider>
  )
}

const SDA = (props: AppProps) => (
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
      description={description}
      openGraph={{
        url,
        type: 'website',
        title: SITE_TITLE,
        description,
        images: image ? [{ url: image }] : [],
      }}
      title={SITE_TITLE}
      twitter={{
        cardType: 'summary_large_image',
      }}
    />

    <RecoilRoot>
      <InnerApp {...props} />
    </RecoilRoot>
  </>
)

export default SDA
