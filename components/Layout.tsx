import { ReactNode } from 'react'
import Head from 'next/head'
import SidebarLayout from 'components/Sidebar'

const PUBLIC_SITE_TITLE = process.env.NEXT_PUBLIC_SITE_TITLE

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Head>
        <title>{PUBLIC_SITE_TITLE}</title>
        <link rel="icon" type="image/svg+xml" href="/daodao-dark.svg" />
        <link rel="icon" href="/yin_yang.png" />
      </Head>
      <SidebarLayout>{children}</SidebarLayout>
    </div>
  )
}
