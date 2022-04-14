import { ReactNode } from 'react'

import Head from 'next/head'

import { SITE_TITLE } from 'util/constants'

export function HomepageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>{SITE_TITLE}</title>
        <link href="/daodao-dark.svg" rel="icon" type="image/svg+xml" />
        <link href="/yin_yang.png" rel="icon" />
      </Head>
      {children}
    </>
  )
}
