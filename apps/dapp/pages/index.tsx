import { ReactNode } from 'react'

import type { NextPage } from 'next'
import Link from 'next/link'

import { Button } from '@dao-dao/ui'
import { SITE_TITLE } from '@dao-dao/utils'
import { ScaleIcon } from '@heroicons/react/outline'
import {
  ArrowNarrowRightIcon,
  PlusSmIcon,
  StarIcon,
} from '@heroicons/react/solid'

import SvgArrowUpRight from '@components/icons/ArrowUpRight'
import SvgDiscord from '@components/icons/Discord'
import { GradientWrapper } from 'components/GradientWrapper'
import { Logo } from 'components/Logo'
import ThemeToggle from 'components/ThemeToggle'

function EnterAppButton({ small }: { small?: boolean }) {
  return (
    <Link href="/starred" passHref>
      <a>
        <Button size={small ? 'sm' : 'lg'}>
          Enter the app{' '}
          <ArrowUpRight color="currentColor" height="10px" width="10px" />
        </Button>
      </a>
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
    <div className="flex flex-col justify-around py-4 px-6 mt-2 w-80 h-48 bg-clip-padding bg-primary bg-opacity-60 rounded-lg backdrop-blur-2xl backdrop-filter">
      <div className="flex justify-center items-center p-2 w-fit w-9 h-fit h-8 bg-secondary rounded">
        {children}
      </div>
      <div>
        <h3 className="header-text">{title}</h3>
        <p className="mt-[12px] body-text">{body}</p>
      </div>
    </div>
  )
}

const Home: NextPage = () => {
  return (
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
      <h1 className="mt-[33vh] text-[54px] text-center text-primary hero-text">
        DAOs for everyone
      </h1>
      <p className="px-2 my-[40px] mx-auto max-w-lg text-lg text-center text-secondary">
        We provide tooling for creating, deploying, managing, and joining DAOs.
        Built with love on Juno.
      </p>
      <div className="mx-auto mb-12">
        <EnterAppButton />
      </div>
      <div className="mx-3">
        <div className="flex flex-row flex-wrap gap-3 justify-center">
          <InfoCard
            body="Make DAOs with a visual interface. No command line required."
            title="Create DAOs"
          >
            <PlusSmIcon />
          </InfoCard>
          <InfoCard
            body="Create and vote on proposals without writing code."
            title="Propose and vote"
          >
            <ScaleIcon />
          </InfoCard>
          <InfoCard
            body="Launch your token. Share them across any chain that supports IBC."
            title="Launch tokens"
          >
            <StarIcon />
          </InfoCard>
        </div>
        <div className="grid grid-cols-1 gap-2 my-10 font-mono md:grid-cols-3 caption-text">
          <div className="flex flex-wrap gap-6 justify-center items-center text-sm md:justify-left">
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
          <div className="flex gap-4 justify-center items-center">
            <a
              className="hover:text-primary transition"
              href="https://github.com/DA0-DA0"
              rel="noreferrer"
              target="_blank"
            >
              <Github fill="currentColor" height="20px" width="20px" />
            </a>
            <a
              className="hover:text-primary transition"
              href="https://twitter.com/da0_da0"
              rel="noreferrer"
              target="_blank"
            >
              <Twitter fill="currentColor" height="20px" width="20px" />
            </a>
            <a
              className="hover:text-primary transition"
              href="https://discord.gg/sAaGuyW3D2"
              rel="noreferrer"
              target="_blank"
            >
              <Discord fill="currentColor" height="20px" width="20px" />
            </a>
          </div>
        </div>
      </div>
    </GradientWrapper>
  )
}

export default Home
