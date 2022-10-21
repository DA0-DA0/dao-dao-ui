// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { ArrowOutward } from '@mui/icons-material'
import type { GetStaticProps, NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { SuspenseLoader } from '@dao-dao/common'
import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import { useLoadingFeaturedDaoCardInfos } from '@dao-dao/state'
import {
  FeaturedDaos,
  Logo,
  PageLoader,
  RotatableLogo,
  SplashAnnouncementCard,
  SplashCards,
  SplashEnterAppButton,
  SplashGradientWrapper,
  SplashStatsCard,
} from '@dao-dao/ui'

import { SplashDaoCard } from '@/components'

const SplashPage: NextPage = () => {
  const { t } = useTranslation()

  const featuredDaosLoading = useLoadingFeaturedDaoCardInfos()

  const [tvl, setTVL] = useState<number>()
  const [daos, setDaos] = useState<number>()
  const [proposals, setProposals] = useState<number>()

  useEffect(() => {
    fetch('https://dao-stats.withoutdoing.com/mainnet/balances.json')
      .then((response) => response.json())
      .then((data) => setTVL(data[data.length - 1].value))
    fetch('https://dao-stats.withoutdoing.com/mainnet/count.json')
      .then((response) => response.json())
      .then((data) => setDaos(data[data.length - 1].value))
    fetch('https://dao-stats.withoutdoing.com/mainnet/proposals.json')
      .then((response) => response.json())
      .then((data) => setProposals(data[data.length - 1].value))
  }, [])

  return (
    <SuspenseLoader fallback={<PageLoader className="h-screen w-screen" />}>
      <SplashGradientWrapper>
        <nav className="w-full border-b border-border-secondary bg-opacity-40 bg-clip-padding py-4 px-6 backdrop-blur-xl backdrop-filter">
          <div className="mx-auto flex max-w-screen-lg items-center justify-between">
            <div className="flex flex-row items-center">
              <Logo className="mr-3" size={32} />
              <p className="mr-1 font-medium">DAO</p>
              <p
                className="font-semibold text-text-secondary"
                style={{ transform: 'scaleY(-1) scaleX(-1)' }}
              >
                DAO
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a
                className="flex items-center gap-2"
                href="https://docs.daodao.zone"
              >
                {t('splash.documentation')}
                <ArrowOutward className="!h-4 !w-4" />
              </a>
              <div className="hidden md:block">
                <SplashEnterAppButton small />
              </div>
            </div>
          </div>
        </nav>
        <h1 className="hero-text mt-16 text-center md:mt-[33vh]">
          {t('splash.shortTagline')}
        </h1>
        <p className="my-10 mx-auto max-w-lg px-4 text-center text-lg text-text-secondary">
          {t('splash.longTagline')}
        </p>
        <div className="mx-auto">
          <SplashEnterAppButton />
        </div>
        <div className="my-12 mx-auto md:my-20">
          <SplashAnnouncementCard />
        </div>

        <FeaturedDaos
          DaoCard={SplashDaoCard}
          featuredDaos={featuredDaosLoading}
        />

        <div className="divide-focus flex grid-cols-3 flex-col justify-around gap-6 py-6 md:grid md:gap-3 md:divide-x md:py-8">
          <SplashStatsCard>
            <h3 className="header-text">
              {tvl
                ? '$' +
                  tvl.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : t('info.loading')}
            </h3>
            <p className="caption-text">{t('splash.usdcTotalValue')}</p>
          </SplashStatsCard>
          <SplashStatsCard>
            <h3 className="header-text">
              {daos ? daos.toLocaleString() : t('info.loading')}
            </h3>
            <p className="caption-text">{t('splash.daosCreated')}</p>
          </SplashStatsCard>
          <SplashStatsCard>
            <h3 className="header-text">
              {proposals ? proposals.toLocaleString() : t('info.loading')}
            </h3>
            <p className="caption-text">{t('splash.proposalsCreated')}</p>
          </SplashStatsCard>
        </div>

        <div className="-mt-8 px-3">
          <div className="mt-12 flex w-full justify-center gap-4 md:mt-28 md:px-3">
            <RotatableLogo initialRotation={135} />
            <RotatableLogo initialRotation={90} />
            <RotatableLogo initialRotation={45} />
          </div>
          <h2 className="header-text mt-12 w-full px-4 text-center">
            {t('splash.transparentGovernanceOnChain')}
          </h2>
          <p className="primary-text mx-auto mt-4 max-w-xl px-4 text-center text-text-tertiary">
            {t('splash.transparencyExplanation')}
          </p>
          <div className="mt-12">
            <SplashCards />
          </div>
          <div className="my-12 flex flex-col items-center gap-4">
            <h2 className="header-text mx-4 max-w-xl text-center">
              {t('splash.createExploreJoin')}
            </h2>
            <SplashEnterAppButton />
          </div>
          <div className="caption-text my-10 grid grid-cols-1 gap-2 font-mono md:grid-cols-3">
            <div className="mx-2 flex flex-wrap items-center gap-6 text-xs">
              <p>
                {t('info.productVersion', {
                  versionNumber: process.env.NEXT_PUBLIC_DAO_DAO_VERSION,
                })}
              </p>
              <a
                className="inline-flex flex-row items-center gap-2 transition hover:text-text-primary"
                href="https://www.junonetwork.io/"
                rel="noreferrer"
                target="_blank"
              >
                {t('splash.poweredByJuno')}
                <ArrowOutward className="!h-4 !w-4 font-light" />
              </a>
            </div>
          </div>
        </div>
      </SplashGradientWrapper>
    </SuspenseLoader>
  )
}

export default SplashPage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['translation'])),
  },
})
