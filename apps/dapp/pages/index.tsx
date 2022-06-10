import { ScaleIcon } from '@heroicons/react/outline'
import {
  ArrowNarrowRightIcon,
  PlusSmIcon,
  StarIcon,
} from '@heroicons/react/solid'
import type { NextPage } from 'next'
import Link from 'next/link'
import { ReactNode } from 'react'

import i18n from '@dao-dao/i18n'
import { ArrowUpRight, Discord, Github, Twitter } from '@dao-dao/icons'
import {
  Button,
  GradientWrapper,
  LoadingScreen,
  Logo,
  SuspenseLoader,
} from '@dao-dao/ui'
import { SITE_TITLE } from '@dao-dao/utils'

import ThemeToggle from 'components/ThemeToggle'

const EnterAppButton = ({ small }: { small?: boolean }) => (
  <Link href="/starred">
    <a>
      <Button size={small ? 'sm' : 'lg'}>
        {i18n.t('landingPage.CTA')}
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
  <div className="flex flex-col justify-around py-4 px-6 mt-2 w-80 h-48 bg-clip-padding bg-primary bg-opacity-60 rounded-lg backdrop-blur-2xl backdrop-filter">
    <div className="flex justify-center items-center p-2 w-fit h-fit bg-secondary rounded">
      {children}
    </div>
    <div>
      <h3 className="header-text">{title}</h3>
      <p className="mt-[12px] body-text">{body}</p>
    </div>
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
                className="font-semibold text-secondary"
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
              {i18n.t('Documentation')}
              <ArrowUpRight color="currentColor" height="10px" width="10px" />
            </a>
            <div className="hidden md:block">
              <EnterAppButton small />
            </div>
          </div>
        </div>
      </nav>
      <h1 className="mt-16 text-center md:mt-[33vh] hero-text">
        {i18n.t('landingPage.short tagline')}
      </h1>
      <p className="px-4 my-10 mx-auto max-w-lg text-lg text-center text-secondary">
        {i18n.t('landingPage.long tagline')}
      </p>
      <div className="mx-auto mb-12">
        <EnterAppButton />
      </div>
      <div className="mx-3">
        <div className="flex flex-row flex-wrap gap-3 justify-center">
          <InfoCard
            body={i18n.t('landingPage.Create DAOs tagline')}
            title={i18n.t('landingPage.Create DAOs')}
          >
            <PlusSmIcon className="w-6" />
          </InfoCard>
          <InfoCard
            body={i18n.t('landingPage.Propose and vote tagline')}
            title={i18n.t('landingPage.Propose and vote')}
          >
            <ScaleIcon className="w-6" />
          </InfoCard>
          <InfoCard
            body={i18n.t('landingPage.IBC enabled tagline')}
            title={i18n.t('landingPage.IBC enabled')}
          >
            <StarIcon className="w-6" />
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
              {i18n.t('landingPage.Powered by Juno')}
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
  </SuspenseLoader>
)

export default Home
