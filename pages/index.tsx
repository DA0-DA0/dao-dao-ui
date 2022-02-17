import { ReactNode, Suspense } from 'react'

import type { NextPage } from 'next'
import Link from 'next/link'

import { useRecoilValue, waitForAll } from 'recoil'

import { ArrowRightIcon } from '@heroicons/react/outline'
import { ArrowNarrowRightIcon } from '@heroicons/react/solid'

import { Button } from '@components'

import { ContractCard, LoadingContractCard } from '@components/ContractCard'
import SvgArrowTopRight from '@components/icons/ArrowTopRight'
import SvgDiscord from '@components/icons/Discord'
import { GradientWrapper } from 'components/GradientWrapper'
import SvgGithub from 'components/icons/Github'
import SvgTwitter from 'components/icons/Twitter'
import { Logo } from 'components/Logo'
import ThemeToggle from 'components/ThemeToggle'
import { featuredDaosSelector } from 'selectors/contracts'
import { memberDaoSelector } from 'selectors/daos'
import { cw20TokenInfo } from 'selectors/treasury'
import { convertMicroDenomToDenomWithDecimals } from 'util/conversion'

import { SITE_TITLE } from '../util/constants'

function EnterAppButton({ small }: { small?: boolean }) {
  return (
    <Link href="/starred" passHref>
      <Button
        size={small ? 'md' : 'xl'}
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

function AnnouncementCard({
  title,
  body,
  href,
}: {
  title: string
  body: string
  href: string
}) {
  return (
    <div className="bg-base-300 rounded-lg mt-2 px-8 py-6 flex justify-between items-center flex-wrap mx-0 sm:mx-3">
      <div className="max-w-prose">
        <h2 className="font-medium">{title}</h2>
        <p className="text-base text-secondary mt-1">{body}</p>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm flex items-center gap-2 mt-2"
      >
        Read more
        <ArrowRightIcon className="w-4 inline" />
      </a>
    </div>
  )
}

function InfoSection({
  titleRight,
  titleLeft,
  infoLeft,
  children,
}: {
  titleRight: string
  titleLeft: string
  infoLeft?: boolean
  children: ReactNode
}) {
  const info = (
    <div className="bg-base-300 rounded-lg p-6">
      <Link href="/starred" passHref>
        <a className="w-fit">
          <div className="bg-base-200 rounded-lg p-2 w-fit my-6">
            <SvgArrowTopRight fill="currentColor" width="15px" height="15px" />
          </div>
        </a>
      </Link>
      <h2 className="text-xl font-medium">{titleLeft}</h2>
      <div className="max-w-lg my-6 leading-relaxed lg:grid lg:grid-cols-6">
        <div className="lg:col-span-4 font-normal">{children}</div>
      </div>
    </div>
  )

  return (
    <div className="mx-3">
      <div className="flex flex-col md:flex-row gap-4 md:px-4 md:h-[476px] w-full justify-center">
        {infoLeft && info}
        <div className="bg-base-300 rounded-lg p-6 md:w-[386px]">
          <Link href="/starred" passHref>
            <a className="w-fit">
              <div className="bg-base-200 rounded-lg p-2 w-fit my-6">
                <SvgArrowTopRight
                  fill="currentColor"
                  width="15px"
                  height="15px"
                />
              </div>
            </a>
          </Link>
          <h2 className="text-xl font-medium">{titleRight}</h2>
        </div>
        {!infoLeft && info}
      </div>
    </div>
  )
}

function CommunitySection() {
  // Getting the sizing correct here is a nightmare..
  return (
    <div className="px-3 md:px-7 w-full flex justify-center">
      <div className="md:max-w-[962px] md:w-full rounded-lg p-6 md:h-[476px] bg-base-200 mt-4">
        <div className="flex flex-row gap-2 my-6">
          <Link href="/starred" passHref>
            <a className="w-fit">
              <div className="bg-base-300 rounded-lg p-2 w-fit">
                <SvgDiscord fill="currentColor" width="20px" height="20px" />
              </div>
            </a>
          </Link>
          <Link href="/starred" passHref>
            <a className="w-fit">
              <div className="bg-base-300 rounded-lg p-2 w-fit">
                <SvgTwitter fill="currentColor" width="20px" height="20px" />
              </div>
            </a>
          </Link>
          <Link href="/starred" passHref>
            <a className="w-fit">
              <div className="bg-base-300 rounded-lg p-2 w-fit">
                <SvgGithub fill="currentColor" width="20px" height="20px" />
              </div>
            </a>
          </Link>
        </div>
        <h2 className="text-xl font-medium">Join the growing community</h2>
        <div className="max-w-lg my-6">
          <p>
            Over a thousand DAOs have been created on DAO DAO. Gather your
            community and join up.
          </p>
        </div>
      </div>
    </div>
  )
}

function FeaturedDaosLoadingPlaceholder() {
  return (
    <>
      <h2 className="font-medum text-2xl mb-8 text-center whitespace-normal mx-3">
        Expore featured DAOs on the platform
      </h2>
      <div className="flex flex-row justify-center">
        <div className="w-64">
          <LoadingContractCard />
          <div className="pointer-events-none mask-image">
            <LoadingContractCard />
          </div>
        </div>
      </div>
    </>
  )
}

function FeaturedDaosDisplay() {
  const daoAddresses = useRecoilValue(featuredDaosSelector)
  const daos = useRecoilValue(
    waitForAll(daoAddresses.map((address) => memberDaoSelector(address)))
  )
  const tokenInfos = useRecoilValue(
    waitForAll(daos.map((dao) => cw20TokenInfo(dao.gov_token)))
  )

  return (
    (daoAddresses.length > 0 || null) && (
      <>
        <h2 className="font-medum text-2xl mb-8 text-center whitespace-normal mx-3">
          Expore featured DAOs on the platform
        </h2>
        <ul className="list-none flex md:flex-row flex-col gap-2 overflow-auto items-center">
          {daos.map((dao, idx) => {
            const tokenInfo = tokenInfos[idx]
            return (
              <div className="w-64" key={dao.address}>
                <ContractCard
                  name={dao.dao.name}
                  description={dao.dao.description}
                  href={`/dao/${daoAddresses[idx]}`}
                  weight={convertMicroDenomToDenomWithDecimals(
                    dao.weight,
                    tokenInfo.decimals
                  )}
                  balance={dao.balance}
                  proposals={dao.proposals}
                  pinned={true}
                  onPin={() => 0}
                  imgUrl={dao.dao.image_url}
                />
                <div className="pointer-events-none mask-image hidden md:block">
                  <ContractCard
                    name={dao.dao.name}
                    description={dao.dao.description}
                    href={`/dao/${daoAddresses[idx]}`}
                    weight={convertMicroDenomToDenomWithDecimals(
                      dao.weight,
                      tokenInfo.decimals
                    )}
                    balance={dao.balance}
                    proposals={dao.proposals}
                    pinned={true}
                    onPin={() => 0}
                    imgUrl={dao.dao.image_url}
                  />
                </div>
              </div>
            )
          })}
        </ul>
      </>
    )
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
