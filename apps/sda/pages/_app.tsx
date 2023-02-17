// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import '@dao-dao/stateless/styles/index.css'
import '@fontsource/inter/latin.css'
import '@fontsource/jetbrains-mono/latin.css'

import { appWithTranslation } from 'next-i18next'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil'

import {
  activeThemeAtom,
  mountedInBrowserAtom,
  navigatingToHrefAtom,
} from '@dao-dao/state'
import {
  AppContextProvider,
  DaoPageWrapper,
  DaoPageWrapperProps,
  SdaLayout,
  WalletProvider,
} from '@dao-dao/stateful'
import {
  PageLoader,
  Theme,
  ThemeProvider,
  ToastNotifications,
} from '@dao-dao/stateless'
import { DaoPageMode } from '@dao-dao/types'
import { SITE_IMAGE, SITE_URL } from '@dao-dao/utils'

const InnerApp = ({
  Component,
  pageProps,
  setIcon,
}: AppProps<DaoPageWrapperProps> & {
  setIcon: (icon: string | undefined) => void
}) => {
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
      {/* When on fallback page (loading static props), don't wrap in WalletProvider or SdaLayout, since things look weird and broken (e.g. translations aren't loaded, the wallet tries to connect multiple times, etc.). Render the component still so that the SEO meta tags load on first render (on the server) so that URL previews work. Component is responsible for suspending its non-SEO meta tag content with a SuspenseLoader when it needs to wait for the page to load. */}
      {router.isFallback ? (
        <PageLoader />
      ) : router.pathname === '/discord' ||
        router.pathname === '/404' ||
        router.pathname === '/500' ||
        router.pathname === '/_error' ? (
        <Component {...pageProps} />
      ) : (
        <WalletProvider>
          {/* AppContextProvider uses wallet context. */}
          <AppContextProvider mode={DaoPageMode.Sda}>
            {/* All non-error/discord redirect SDA pages are a DAO page. */}
            <DaoPageWrapper setIcon={setIcon} {...pageProps}>
              {/* SdaLayout needs DaoPageWrapper for navigation tabs. */}
              <SdaLayout>
                <Component {...pageProps} />
              </SdaLayout>
            </DaoPageWrapper>
          </AppContextProvider>
        </WalletProvider>
      )}

      <ToastNotifications />
    </ThemeProvider>
  )
}

const Sda = (props: AppProps<DaoPageWrapperProps>) => {
  const { t } = useTranslation()

  const [icon, setIcon] = useState<string>()

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
            href: '/site.webmanifest',
            rel: 'manifest',
          },
          {
            href: icon || '/yin_yang.png',
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
        <InnerApp setIcon={setIcon} {...props} />
      </RecoilRoot>
    </>
  )
}

export default appWithTranslation(Sda)
