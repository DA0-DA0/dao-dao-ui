import Head from 'next/head'
import { ReactNode } from 'react'
import { SITE_TITLE } from 'util/constants'

export function HomepageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>{SITE_TITLE}</title>
        <link rel="icon" type="image/svg+xml" href="/daodao-dark.svg" />
        <link rel="icon" href="/yin_yang.png" />
      </Head>
      {children}
    </>
  )
}
