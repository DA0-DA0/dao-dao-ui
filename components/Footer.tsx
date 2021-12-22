import React from 'react'
import TwitterLogo from 'components/TwitterLogo'
import GitHubLogo from 'components/GitHubLogo'

const POWERED_BY_URL = 'https://junonetwork.io'
const TWITTER_URL = 'https://twitter.com/da0_da0'
const GITHUB_URL = 'https://github.com/DA0-DA0'
const DOCS_URL = 'https://docs.daodao.zone'

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
        <a href={TWITTER_URL} target="blank">
          <TwitterLogo />
        </a>
        <a href={GITHUB_URL} target="blank">
          <GitHubLogo />
        </a>
        <a href={DOCS_URL} target="blank" className="ml-2 text-sm">
          Docs
        </a>
      </div>
    </footer>
  )
}
