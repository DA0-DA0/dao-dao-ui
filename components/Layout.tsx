import { ReactNode } from 'react'
import Head from 'next/head'
import Nav from './Nav'
import TwitterLogo from 'components/TwitterLogo'
import GitHubLogo from 'components/GitHubLogo'

const PUBLIC_SITE_TITLE = process.env.NEXT_PUBLIC_SITE_TITLE

const POWERED_BY_URL = 'https://junonetwork.io'
const TWITTER_URL = 'https://twitter.com/da0_da0'
const GITHUB_URL = 'https://github.com/DA0-DA0'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 text-base-content">
      <Head>
        <title>{PUBLIC_SITE_TITLE}</title>
        <link rel="icon" type="image/svg+xml" href="/daodao-dark.svg" />
        <link rel="icon" href="/yin_yang.png" />
      </Head>

      <Nav />
      <main className="flex flex-col items-center justify-center w-full flex-1 p-2 md:px-20 text-center">
        {children}
      </main>
      <footer className="border-t w-full h-24 flex align-center justify-center flex-col">
        <div className="flex items-center justify-center w-full">
          Powered by{'  '}
          <a
            className="pl-1 link link-primary link-hover"
            href={POWERED_BY_URL}
          >
            <div>Juno</div>
          </a>
        </div>
        <div className="flex items-center justify-center w-full">
          <a href={TWITTER_URL}>
            <TwitterLogo />
          </a>
          <a href={GITHUB_URL}>
            <GitHubLogo />
          </a>
        </div>
      </footer>
    </div>
  )
}
