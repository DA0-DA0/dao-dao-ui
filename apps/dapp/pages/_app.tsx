// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import '@dao-dao/stateless/styles/index.css'
import '@fontsource/inter/latin.css'
import '@fontsource/jetbrains-mono/latin.css'

import { appWithTranslation } from 'next-i18next'
import PlausibleProvider from 'next-plausible'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil'

import {
  activeThemeAtom,
  mountedInBrowserAtom,
  navigatingToHrefAtom,
} from '@dao-dao/state'
import {
  AppContextProvider,
  DappLayout,
  WalletProvider,
} from '@dao-dao/stateful'
import {
  PageLoader,
  Theme,
  ThemeProvider,
  ToastNotifications,
} from '@dao-dao/stateless'
import { DaoPageMode } from '@dao-dao/types'
import {
  DEFAULT_SITE_DESCRIPTION,
  SITE_IMAGE,
  SITE_TITLE,
  SITE_URL,
} from '@dao-dao/utils'

const InnerApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()

  const setMountedInBrowser = useSetRecoilState(mountedInBrowserAtom)

  const [navigatingToHref, setNavigatingToHref] =
    useRecoilState(navigatingToHrefAtom)

  const [theme, setTheme] = useRecoilState(activeThemeAtom)
  const [themeChangeCount, setThemeChangeCount] = useState(0)

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

  // On route change, clear navigation loading state.
  useEffect(() => {
    setNavigatingToHref(undefined)
  }, [router.asPath, setNavigatingToHref])

  // Unset navigation loading state after 30 second timeout.
  useEffect(() => {
    const timeout = setTimeout(() => setNavigatingToHref(undefined), 30 * 1000)
    return () => clearTimeout(timeout)
  }, [navigatingToHref, setNavigatingToHref])

  return (
    <PlausibleProvider
      domain="daodao.zone"
      scriptProps={{
        src: 'https://vis.daodao.zone/dao/dao.js',
        // @ts-ignore
        'data-api': 'https://vis.daodao.zone/dao/event',
      }}
      trackOutboundLinks
    >
      <ThemeProvider
        theme={theme}
        themeChangeCount={themeChangeCount}
        updateTheme={setTheme}
      >
        {/* Show loader on fallback page when loading static props. */}
        {router.isFallback ? (
          <PageLoader />
        ) : (
          <WalletProvider>
            {/* AppContextProvider uses wallet context via the inbox. */}
            <AppContextProvider mode={DaoPageMode.Dapp}>
              <DappLayout>
                <Component {...pageProps} />
              </DappLayout>
            </AppContextProvider>
          </WalletProvider>
        )}

        <ToastNotifications />
      </ThemeProvider>
    </PlausibleProvider>
  )
}

const DApp = (props: AppProps) => (
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
          content: '#151617',
        },
        {
          name: 'theme-color',
          content: '#151617',
        },
        {
          name: 'apple-mobile-web-app-title',
          content: SITE_TITLE,
        },
        {
          name: 'apple-mobile-web-app-capable',
          content: 'yes',
        },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'black-translucent',
        },
      ]}
      description={DEFAULT_SITE_DESCRIPTION}
      openGraph={{
        url: SITE_URL,
        type: 'website',
        title: SITE_TITLE,
        description: DEFAULT_SITE_DESCRIPTION,
        images: SITE_IMAGE ? [{ url: SITE_IMAGE }] : [],
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

export default appWithTranslation(DApp)
