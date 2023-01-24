// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import '@dao-dao/stateless/styles/index.css'
import '@fontsource/inter/latin.css'
import '@fontsource/jetbrains-mono/latin.css'

import { appWithTranslation } from 'next-i18next'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil'

import {
  activeThemeAtom,
  featuredDaoDumpStatesAtom,
  mountedInBrowserAtom,
  navigatingToHrefAtom,
} from '@dao-dao/state'
import { ApolloGqlProvider, AppLayout, WalletProvider } from '@dao-dao/stateful'
import { Theme, ThemeProvider, ToastNotifications } from '@dao-dao/stateless'
import { SITE_IMAGE, SITE_URL } from '@dao-dao/utils'

type DappProps = AppProps<{ featuredDaoDumpStates?: any[] } | {}>

const InnerApp = ({ Component, pageProps }: DappProps) => {
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
    <ThemeProvider
      theme={theme}
      themeChangeCount={themeChangeCount}
      updateTheme={setTheme}
    >
      <ApolloGqlProvider>
        {/* Don't mount wallet or load AppLayout while static page data is still loading. Things look weird and broken, and the wallet connects twice. AppLayout uses wallet hook, which depends on WalletProvider, so use placeholder Layout during fallback. */}
        {router.isFallback ? (
          <LayoutLoading>
            <Component {...pageProps} />
          </LayoutLoading>
        ) : (
          <WalletProvider>
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </WalletProvider>
        )}

        <ToastNotifications />
      </ApolloGqlProvider>
    </ThemeProvider>
  )
}

// Plain layout while layout is loading (fallback page).
const LayoutLoading = ({ children }: { children: ReactNode }) => (
  <main className="h-full min-h-screen w-full overflow-hidden">{children}</main>
)

const DApp = (props: DappProps) => {
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

      <RecoilRoot
        initializeState={(snapshot) => {
          if (
            'featuredDaoDumpStates' in props.pageProps &&
            props.pageProps.featuredDaoDumpStates &&
            Array.isArray(props.pageProps.featuredDaoDumpStates)
          ) {
            snapshot.set(
              featuredDaoDumpStatesAtom,
              props.pageProps.featuredDaoDumpStates
            )
          }
        }}
      >
        <InnerApp {...props} />
      </RecoilRoot>
    </>
  )
}

export default appWithTranslation(DApp)
