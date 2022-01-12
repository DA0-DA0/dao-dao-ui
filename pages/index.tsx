import {
  ArrowNarrowRightIcon,
  PlusSmIcon,
  StarIcon,
} from '@heroicons/react/solid'
import { ScaleIcon } from '@heroicons/react/outline'
import { Logo, LogoNoborder } from 'components/Logo'
import ThemeToggle from 'components/ThemeToggle'
import type { NextPage } from 'next'
import Link from 'next/link'
import { ReactNode } from 'react'

const PUBLIC_SITE_TITLE = process.env.NEXT_PUBLIC_SITE_TI

function EnterAppButton() {
  return (
    <Link href="/dao/list" passHref>
      <a className="btn btn-sm normal-case font-normal bg-primary text-primary-content hover:bg-gray-400 rounded-md">
        Enter the app
        <ArrowNarrowRightIcon
          className="w-4 h-4 ml-2"
          style={{ transform: 'rotateY(0deg) rotate(-45deg)' }}
        />
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
    <div className="bg-base-300 rounded-lg w-80 h-48 mt-2 px-6 py-4 flex flex-col justify-around">
      <div className="bg-accent-content rounded-lg h-fit w-fit p-1 w-9 h-8 flex items-center justify-center">
        {children}
      </div>
      <div>
        <h3 className="text-xl font-medium">{title}</h3>
        <p className="text-sm text-secondary mt-1">{body}</p>
      </div>
    </div>
  )
}

function GradientWrapper({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="fixed -top-12 left-1/2 -ml-[250px] text-transparent animate-spin-slow">
        <LogoNoborder width={500} height={500} />
      </div>
      <div className="fixed bg-gradient-radial-t-wide from-slate-500/80 via-transparent w-full h-full">
      </div>
      <div className="bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-60 w-screen h-screen flex flex-col justify-between">
        {children}
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
                className="font-medium text-secondary"
                style={{ transform: 'scaleY(-1) scaleX(-1)' }}
              >
                DAO
              </p>
            </a>
          </Link>
          <div className="flex gap-4 items-center">
            <div className="text-secondary">
              <ThemeToggle />
            </div>
            <a
              href="https://docs.daodao.zone"
              className="flex items-center text-secondary"
            >
              Documentation
              <ArrowNarrowRightIcon
                className="inline w-4 h-4 ml-2"
                style={{ transform: 'rotateY(0deg) rotate(-45deg)' }}
              />
            </a>
            <EnterAppButton />
          </div>
        </div>
      </nav>
      <div className="flex flex-col items-center">
        <div className="text-center">
          <h1 className="text-5xl font-medium mt-12">DAOs for everyone</h1>
          <p className="text-secondary max-w-lg my-5">
            We provide tooling for creating, deploying, managing, and joining
            DAOs. Built with love on Juno.
          </p>
          <div className="mb-12">
            <EnterAppButton />
          </div>
        </div>
        <div className="flex flex-row mb-20 gap-3 flex-wrap justify-center mx-3">
          <InfoCard
            title="Create DAOs"
            body="Create DAOs with a point-and-click interface. No command line required.."
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
            title="Join the Cosmoverse"
            body="Launch tokens and share them across chains. Your DAO can send and receive assets to any chain that supports IBC."
          >
            <StarIcon />
          </InfoCard>
        </div>
      </div>
    </GradientWrapper>
  )
}

export default Home
