import React from 'react'
import TwitterLogo from 'components/TwitterLogo'
import GitHubLogo from 'components/GitHubLogo'

const POWERED_BY_URL = 'https://junonetwork.io'
const TWITTER_URL = 'https://twitter.com/da0_da0'
const GITHUB_URL = 'https://github.com/DA0-DA0'

export default function Footer() {
  return (
    <footer className="border-t w-full h-24 flex align-center justify-center flex-col">
      <div className="flex items-center justify-center w-full">
        Powered by{'  '}
        <a className="pl-1 link link-primary link-hover" href={POWERED_BY_URL}>
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
  )
}
