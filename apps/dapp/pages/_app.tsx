// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import '@dao-dao/ui/styles/index.css'
import '@fontsource/inter/latin.css'
import '@fontsource/jetbrains-mono/latin.css'

import { appWithTranslation } from 'next-i18next'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil'

import { activeThemeAtom, mountedInBrowserAtom } from '@dao-dao/state'
import { Notifications, Theme, ThemeProvider } from '@dao-dao/ui'
import { SITE_IMAGE, SITE_URL } from '@dao-dao/utils'

import { AppLayout, HomepageLayout } from '@/components'

const InnerApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()

  const setMountedInBrowser = useSetRecoilState(mountedInBrowserAtom)
  const [_theme, setTheme] = useRecoilState(activeThemeAtom)
  const [themeChangeCount, setThemeChangeCount] = useState(0)

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
      theme={theme}
      themeChangeCount={themeChangeCount}
      updateTheme={setTheme}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>

      <Notifications />
    </ThemeProvider>
  )
}

const DApp = (props: AppProps) => {
  const { t } = useTranslation()

  return (
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
          {
            href: '/yin_yang.png',
            rel: 'icon',
          },
        ]}
        additionalMetaTags={[
          {
            name: 'viewport',
            content:
              'width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover',
          },
          {
            name: 'msapplication-TileColor',
            content: '#da532c',
          },
          {
            name: 'theme-color',
            content: '#111213',
          },
        ]}
        description={t('meta.description').replace(
          // eslint-disable-next-line i18next/no-literal-string
          'meta.description',
          'Loading...'
        )}
        openGraph={{
          url: SITE_URL,
          type: 'website',
          title: t('meta.title').replace('meta.title', 'Loading...'),
          description: t('meta.description').replace(
            'meta.description',
            'Loading...'
          ),
          images: SITE_IMAGE ? [{ url: SITE_IMAGE }] : [],
        }}
        // eslint-disable-next-line i18next/no-literal-string
        title={t('meta.title').replace('meta.title', 'Loading...')}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />

      <RecoilRoot>
        <InnerApp {...props} />
      </RecoilRoot>
    </>
  )
}

export default appWithTranslation(DApp)
