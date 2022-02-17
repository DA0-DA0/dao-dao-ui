import { Suspense } from 'react'

import type { NextPage } from 'next'
import Link from 'next/link'

import { ArrowNarrowRightIcon } from '@heroicons/react/solid'

import { GradientWrapper } from 'components/GradientWrapper'
import { Logo } from 'components/Logo'
import ThemeToggle from 'components/ThemeToggle'

import { SITE_TITLE } from '../util/constants'
import { AnnouncementCard } from '@components/homepage/AnnouncementCard'
import { EnterAppButton } from '@components/homepage/EnterAppButton'
import { InfoSection } from '@components/homepage/InfoSection'
import {
  FeaturedDaosDisplay,
  FeaturedDaosLoadingPlaceholder,
} from '@components/homepage/FeaturedDaosDisplay'
import { CommunitySection } from '@components/homepage/CommunitySection'

const Home: NextPage = () => {
  return (
    <GradientWrapper>
      <nav className="border-b border-base-300/40 py-4 w-full px-6 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-40">
        <div className="flex max-w-screen-lg items-center justify-between mx-auto">
          <Link href="/" passHref>
            <a className="flex items-center">
              <div className="mr-3">
                <Logo height={32} width={32} alt={`${SITE_TITLE} Logo`} />
              </div>
              <p className="font-medium mr-1">DAO</p>
              <p
                className="font-medium text-secondary font-semibold"
                style={{ transform: 'scaleY(-1) scaleX(-1)' }}
              >
                DAO
              </p>
            </a>
          </Link>
          <div className="flex gap-4 items-center">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <a href="https://docs.daodao.zone" className="flex items-center">
              Documentation
              <ArrowNarrowRightIcon
                className="inline w-4 h-4 ml-2"
                style={{ transform: 'rotateY(0deg) rotate(-45deg)' }}
              />
            </a>
            <div className="hidden md:block">
              <EnterAppButton small />
            </div>
          </div>
        </div>
      </nav>
      <h1 className="text-7xl text-center font-medium mt-[33vh]">
        DAOs for everyone.
      </h1>
      <p className="text-lg text-center max-w-lg mx-auto my-5 text-secondary px-2">
        We provide tooling for creating, deploying, managing, and joining DAOs.
        Built with love on Juno.
      </p>
      <div className="mb-12 mx-auto">
        <EnterAppButton />
      </div>
      <div className="mb-14 mx-2">
        <AnnouncementCard
          title="What is a DAO?"
          body="DAO stands for Distributed Atonomous Organization. DAOs give communities democratic control over funds and state."
          href="https://nickmerrill.substack.com/p/what-are-daos"
        />
      </div>
      <div className="mb-6 md:-mb-12">
        <Suspense fallback={<FeaturedDaosLoadingPlaceholder />}>
          <FeaturedDaosDisplay />
        </Suspense>
      </div>
      <InfoSection
        titleRight="Create interchain DAOs"
        titleLeft="No command line required"
      >
        <p>
          Instantiating a new DAO is as easy as describing it and pressing
          create.
        </p>
        <p className="mt-4">
          Instantiated DAOs can manage interchain assets, instantiate smart
          contracts, and do everything you can do with a wallet.
        </p>
        <p className="mt-4">
          Message templates mean that no programming knoledge is required to
          have a fully operational DAO.
        </p>
      </InfoSection>
      <h2 className="font-medum text-2xl mb-6 mt-20 text-center whitespace-normal mx-3">
        Never resort to the command line again
      </h2>
      <p className="text-secondary text-center max-w-[628px] mx-3 mb-12">
        No programming experience is required. The technical details are handled
        so you can focus on building.
      </p>
      <InfoSection
        titleRight="Propose and vote"
        titleLeft="Easy to use interface"
        infoLeft
      >
        <p>
          Proposals can be created and voted on to mange your DAO treasury
          directly from the UI.
        </p>
        <p className="mt-4">
          The DAO DAO UI beautifully renders information about your DAOs and
          Multisigs.
        </p>
        <p className="mt-4">
          With DAO DAO your community is transparent and auditable.
        </p>
      </InfoSection>
      <CommunitySection />
      <div className="mx-3">
        <div className="text-secondary grid grid-cols-1 md:grid-cols-3 my-10 gap-2">
          <div className="flex flex-wrap gap-6 text-sm justify-center md:justify-left items-center">
            <p className="font-mono font-light">
              DAO DAO v{process.env.NEXT_PUBLIC_DAO_DAO_VERSION}
            </p>
            <a
              href="https://www.junonetwork.io/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-primary"
            >
              Powered by Juno
              <ArrowNarrowRightIcon
                className="w-6 h-4 inline mb-0.5 font-light"
                style={{ transform: 'rotateY(0deg) rotate(-45deg)' }}
              />
            </a>
          </div>
        </div>
      </div>
    </GradientWrapper>
  )
}

export default Home
