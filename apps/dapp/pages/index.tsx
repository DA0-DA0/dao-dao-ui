import { ArrowRightIcon, ScaleIcon } from '@heroicons/react/outline'
import {
  ArrowNarrowRightIcon,
  PlusSmIcon,
  StarIcon,
} from '@heroicons/react/solid'
import type { NextPage } from 'next'
import Link from 'next/link'
import { ReactNode } from 'react'

import { ArrowUpRight } from '@dao-dao/icons'
import {
  Button,
  GradientWrapper,
  LoadingScreen,
  Logo,
  RotatableLogo,
} from '@dao-dao/ui'
import { SITE_TITLE } from '@dao-dao/utils'

import ThemeToggle from 'components/ThemeToggle'

import { FeaturedDaos } from '@/components/FeaturedDaos'
import { HomepageCards } from '@/components/HomepageCards'
import { SuspenseLoader } from '@/components/SuspenseLoader'

const EnterAppButton = ({ small }: { small?: boolean }) => (
  <Link href="/starred">
    <a>
      <Button size={small ? 'sm' : 'lg'}>
        Enter the app{' '}
        <ArrowUpRight color="currentColor" height="10px" width="10px" />
      </Button>
    </a>
  </Link>
)

const InfoCard = ({
  title,
  body,
  children,
}: {
  title: string
  body: string
  children: ReactNode
}) => (
  <div
    className="flex relative flex-col justify-around py-4 px-6 mt-2 w-80 h-48 rounded-lg"
    style={{
      backgroundColor: 'rgba(var(--brand), 0.08)',
    }}
  >
    <div
      className="absolute top-0 left-0 -z-10 w-full h-16"
      style={{
        backgroundColor: 'rgba(var(--dark), 0.01)',
      }}
    ></div>
    <div className="flex justify-center items-center p-2 mb-7 w-fit h-fit bg-primary rounded">
      {children}
    </div>
    <div>
      <h3 className="header-text">{title}</h3>
      <p className="mt-[12px] body-text">{body}</p>
    </div>
  </div>
)

const AnouncementCard = ({}) => (
  <div
    className="flex flex-row flex-wrap gap-2 justify-between py-7 px-8 mx-2 max-w-[780px] rounded"
    style={{
      backgroundImage:
        'linear-gradient(rgba(var(--brand), 0.1), rgba(var(--brand), 0.1)), linear-gradient(rgba(var(--light), 0.7), rgba(var(--light), 0.7))',
    }}
  >
    <div className="flex flex-col gap-1">
      <h3 className="primary-text">What is a DAO?</h3>
      <p className="body-text">
        A DAO is an organization democratically controlled by its members.
      </p>
    </div>
    <a
      className="flex flex-row gap-1 items-center secondary-text"
      href="https://nickmerrill.substack.com/p/what-are-daos"
      rel="noopener noreferrer"
      target="_blank"
    >
      <p>Read more</p>
      <ArrowRightIcon className="w-4 h-3" />
    </a>
  </div>
)

const Home: NextPage = () => (
  <SuspenseLoader fallback={<LoadingScreen />}>
    <GradientWrapper>
      <nav className="py-4 px-6 w-full bg-clip-padding bg-opacity-40 border-b border-inactive backdrop-blur-xl backdrop-filter">
        <div className="flex justify-between items-center mx-auto max-w-screen-lg">
          <Link href="/" passHref>
            <a className="flex items-center">
              <div className="mr-3">
                <Logo alt={`${SITE_TITLE} Logo`} height={32} width={32} />
              </div>
              <p className="mr-1 font-medium">DAO</p>
              <p
                className="font-medium font-semibold text-secondary"
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
            <a
              className="flex gap-2 items-center"
              href="https://docs.daodao.zone"
            >
              Documentation
              <ArrowUpRight color="currentColor" height="10px" width="10px" />
            </a>
            <div className="hidden md:block">
              <EnterAppButton small />
            </div>
          </div>
        </div>
      </nav>
      <h1 className="mt-16 text-center md:mt-[33vh] hero-text">
        DAOs for everyone
      </h1>
      <p className="px-4 my-10 mx-auto max-w-lg text-lg text-center text-secondary">
        Simple, capable, free DAO tooling. Built with love, by DAO DAO, on Juno.
      </p>
      <div className="mx-auto">
        <EnterAppButton />
      </div>
      <div className="my-12 mx-auto md:my-20">
        <AnouncementCard />
      </div>
      <p className="mx-auto mx-2 max-w-prose text-2xl text-center hero-text">
        Explore DAOs
        <br />
        <span className="text-brand">and join a community.</span>
      </p>
      <p className="my-6 mx-2 max-w-xl text-center text-tertiary primary-text">
        DAOs built with DAO DAO manage decentralized exchanges, run grant
        programs, do security audits, and much, much more.
      </p>
      <div className="my-12">
        <FeaturedDaos />
      </div>
      <div className="mx-3 -mt-10">
        <h3 className="mb-8 font-mono text-sm text-center primary-text">
          2,000+ DAOs created and counting...
        </h3>
        <div className="flex flex-row flex-wrap gap-3 justify-center">
          <InfoCard
            body="Create and grow a DAO for your community with a simple user interface. No command line required."
            title="Create DAOs"
          >
            <PlusSmIcon className="w-4" />
          </InfoCard>
          <InfoCard
            body="Proposals can do anything you can do on chain. They pass when the community votes on them."
            title="Propose and vote"
          >
            <ScaleIcon className="w-4" />
          </InfoCard>
          <InfoCard
            body="DAO DAO DAOs can manage IBC assets, instantiate smart contracts, and manage entire protocols."
            title="IBC enabled"
          >
            <StarIcon className="w-4" />
          </InfoCard>
        </div>
        <div className="flex gap-4 justify-center mx-3 mt-12 w-full md:mt-28">
          <RotatableLogo initialRotation={135} />
          <RotatableLogo initialRotation={90} />
          <RotatableLogo initialRotation={45} />
        </div>
        <h2 className="px-4 mt-12 w-full text-center header-text">
          Transparent governance, entirely on chain
        </h2>
        <p className="px-4 mx-auto mt-4 max-w-xl text-center text-tertiary primary-text">
          Anyone, anywhere can participate. Decisions are stored on a blockchain
          so they are public and hard to censor.
        </p>
        <div className="mt-12">
          <HomepageCards />
        </div>
        <div className="grid grid-cols-1 gap-2 my-10 font-mono md:grid-cols-3 caption-text">
          <div className="flex flex-wrap gap-6 items-center mx-2 text-xs">
            <p>DAO DAO v{process.env.NEXT_PUBLIC_DAO_DAO_VERSION}</p>
            <a
              className="hover:text-primary transition"
              href="https://www.junonetwork.io/"
              rel="noreferrer"
              target="_blank"
            >
              Powered by Juno
              <ArrowNarrowRightIcon
                className="inline mb-0.5 w-6 h-4 font-light"
                style={{ transform: 'rotateY(0deg) rotate(-45deg)' }}
              />
            </a>
          </div>
        </div>
      </div>
    </GradientWrapper>
  </SuspenseLoader>
)

export default Home
