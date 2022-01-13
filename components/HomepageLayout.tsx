import Head from 'next/head'
import { ReactNode } from 'react'

const PUBLIC_SITE_TITLE = process.env.NEXT_PUBLIC_SITE_TITLE

export function HomepageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>{PUBLIC_SITE_TITLE}</title>
        <link rel="icon" type="image/svg+xml" href="/daodao-dark.svg" />
        <link rel="icon" href="/yin_yang.png" />
      </Head>
      {children}
    </>
  )
}
