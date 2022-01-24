import {
  ArrowNarrowRightIcon,
  PlusSmIcon,
  StarIcon,
} from '@heroicons/react/solid'
import { ScaleIcon } from '@heroicons/react/outline'
import { Logo } from 'components/Logo'
import ThemeToggle from 'components/ThemeToggle'
import type { NextPage } from 'next'
import Link from 'next/link'
import { ReactNode } from 'react'
import { GradientWrapper } from 'components/GradientWrapper'
import SvgGithub from 'components/icons/Github'
import SvgTwitter from 'components/icons/Twitter'
import { Button } from '@components'

const PUBLIC_SITE_TITLE = process.env.NEXT_PUBLIC_SITE_TI

function EnterAppButton({ small }: { small?: boolean }) {
  return (
    <Link href="/starred" passHref>
      <Button
        size={small ? 'md' : 'lg'}
        iconAfter={
          <ArrowNarrowRightIcon
            className="inline h-4 w-4"
            style={{ transform: 'rotateY(0deg) rotate(-45deg)' }}
          />
        }
      >
        Enter the app
      </Button>
    </Link>
  )
}

function InfoCard({
  title,
  body,
  children,
}: {
  title: string
  body: string
  children: ReactNode
}) {
  return (
    <div className="bg-base-300 rounded-lg w-80 h-48 mt-2 px-6 py-4 flex flex-col justify-around bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-60">
      <div className="bg-accent-content rounded-lg h-fit w-fit p-1 w-9 h-8 flex items-center justify-center">
        {children}
      </div>
      <div>
        <h3 className="text-xl font-medium">{title}</h3>
        <p className="text-base text-secondary mt-1">{body}</p>
      </div>
    </div>
  )
}

const Home: NextPage = () => {
  return (
    <GradientWrapper>
      <nav className="border-b border-base-300/40 py-4 w-full px-6 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-40">
        <div className="flex max-w-screen-lg items-center justify-between mx-auto">
          <Link href="/" passHref>
            <a className="flex items-center">
              <div className="mr-3">
                <Logo
                  height={32}
                  width={32}
                  alt={`${PUBLIC_SITE_TITLE} Logo`}
                />
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
      <div className="mx-3">
        <div className="flex flex-row gap-3 flex-wrap justify-center">
          <InfoCard
            title="Create DAOs"
            body="Make DAOs with a visual interface. No command line required."
          >
            <PlusSmIcon />
          </InfoCard>
          <InfoCard
            title="Propose and vote"
            body="Create and vote on proposals without writing code."
          >
            <ScaleIcon />
          </InfoCard>
          <InfoCard
            title="Launch tokens"
            body="Launch your token. Share them across any chain that supports IBC."
          >
            <StarIcon />
          </InfoCard>
        </div>
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
          <div className="flex gap-4 justify-center items-center">
            <a
              href="https://github.com/DA0-DA0"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-primary"
            >
              <SvgGithub fill="currentColor" width="20px" height="20px" />
            </a>
            <a
              href="https://twitter.com/da0_da0"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-primary"
            >
              <SvgTwitter fill="currentColor" width="20px" height="20px" />
            </a>
          </div>
        </div>
      </div>
    </GradientWrapper>
  )
}

export default Home
