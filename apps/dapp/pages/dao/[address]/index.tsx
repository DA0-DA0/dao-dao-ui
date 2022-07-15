import axios from 'axios'
import { getAverageColor } from 'fast-average-color-node'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { MemberCheck } from '@dao-dao/icons'
import { useVotingModule } from '@dao-dao/state'
import {
  Breadcrumbs,
  GradientHero,
  HeartButton,
  MobileMenuTab,
  SuspenseLoader,
  useThemeContext,
} from '@dao-dao/ui'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter/react'

import {
  ContractHeader,
  ContractProposalsDisplay,
  DAOMobileHeader,
  DAOPageWrapper,
  DAOPageWrapperProps,
  DaoContractInfo,
  DaoHorizontalInfoDisplay,
  DaoTreasury,
  Loader,
  PageLoader,
  SmallScreenNav,
  useDAOInfoContext,
} from '@/components'
import { usePinnedDAOs } from '@/hooks'
import { makeGetDAOStaticProps } from '@/server/makeGetDAOStaticProps'
import { useAddToken } from '@/util'

enum MobileMenuTabSelection {
  Proposal,
  Membership,
  Treasury,
  Info,
}

const InnerMobileDaoHome: FC = () => {
  const { t } = useTranslation()
  const { coreAddress } = useDAOInfoContext()
  const votingModuleAdapter = useVotingModuleAdapter()
  const [tab, setTab] = useState(MobileMenuTabSelection.Proposal)
  const makeTabSetter = (tab: MobileMenuTabSelection) => () => setTab(tab)

  return (
    <div className="flex flex-col gap-2">
      <GradientHero>
        <SmallScreenNav />
        <DAOMobileHeader />
      </GradientHero>
      <div className="flex overflow-auto gap-1 px-6 pb-4 border-b border-inactive no-scrollbar">
        <MobileMenuTab
          icon="🗳"
          onClick={makeTabSetter(MobileMenuTabSelection.Proposal)}
          selected={tab === MobileMenuTabSelection.Proposal}
          text={t('title.proposals')}
        />
        <votingModuleAdapter.ui.membership.mobileTab
          onClick={makeTabSetter(MobileMenuTabSelection.Membership)}
          selected={tab === MobileMenuTabSelection.Membership}
        />
        <MobileMenuTab
          icon="🏛"
          onClick={makeTabSetter(MobileMenuTabSelection.Treasury)}
          selected={tab === MobileMenuTabSelection.Treasury}
          text={t('title.treasury')}
        />
        <MobileMenuTab
          icon="⚙️"
          onClick={makeTabSetter(MobileMenuTabSelection.Info)}
          selected={tab === MobileMenuTabSelection.Info}
          text={t('title.info')}
        />
      </div>
      <div className="py-5 px-6">
        {tab === MobileMenuTabSelection.Proposal && (
          <ContractProposalsDisplay />
        )}
        {tab === MobileMenuTabSelection.Membership && (
          <votingModuleAdapter.ui.membership.mobile
            Loader={Loader}
            coreAddress={coreAddress}
          />
        )}
        {tab === MobileMenuTabSelection.Treasury && <DaoTreasury />}
        {tab === MobileMenuTabSelection.Info && (
          <DaoContractInfo hideTreasury />
        )}
      </div>
    </div>
  )
}

const InnerDAOHome: FC = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const addToken = useAddToken()

  const { coreAddress, governanceTokenAddress, name } = useDAOInfoContext()
  const votingModuleAdapter = useVotingModuleAdapter()
  const { isMember } = useVotingModule(coreAddress)

  const { isPinned, setPinned, setUnpinned } = usePinnedDAOs()
  const pinned = isPinned(coreAddress)

  const shouldAddToken = router.query.add_token
  useEffect(() => {
    if (shouldAddToken && governanceTokenAddress) {
      addToken?.(governanceTokenAddress)
    }
  }, [shouldAddToken, governanceTokenAddress, addToken])

  return (
    <div className="flex flex-col items-stretch lg:grid lg:grid-cols-6">
      <div className="col-span-4 min-h-screen">
        <GradientHero>
          <SmallScreenNav />
          <div className="p-6">
            <div className="flex justify-between items-center">
              <Breadcrumbs
                crumbs={[
                  ['/home', t('title.home')],
                  [router.asPath, name],
                ]}
              />
              <div className="flex flex-row gap-4 items-center">
                {isMember && (
                  <div className="flex flex-row gap-2 items-center">
                    <MemberCheck fill="currentColor" width="16px" />
                    <p className="text-sm text-primary">
                      {t('info.youAreMember')}
                    </p>
                  </div>
                )}
                <HeartButton
                  onPin={() => {
                    if (pinned) {
                      setUnpinned(coreAddress)
                    } else {
                      setPinned(coreAddress)
                      governanceTokenAddress &&
                        addToken?.(governanceTokenAddress)
                    }
                  }}
                  pinned={pinned}
                />
              </div>
            </div>

            <ContractHeader />

            <div className="mt-2">
              <DaoHorizontalInfoDisplay />
            </div>
            <div className="block mt-4 lg:hidden">
              <votingModuleAdapter.ui.membership.desktop
                Loader={Loader}
                coreAddress={coreAddress}
              />
            </div>
            <div className="pt-[22px] pb-[28px] border-b border-inactive">
              <DaoContractInfo />
            </div>
          </div>
        </GradientHero>
        <div className="px-6">
          <ContractProposalsDisplay />
        </div>
      </div>
      <div className="hidden col-span-2 p-6 w-full h-full min-h-screen lg:block">
        <votingModuleAdapter.ui.membership.desktop
          Loader={Loader}
          coreAddress={coreAddress}
        />
      </div>
    </div>
  )
}

interface DaoHomePageProps extends DAOPageWrapperProps {
  accentColor?: string
}

const DaoHomePage: NextPage<DaoHomePageProps> = ({
  accentColor,
  children: _,
  ...props
}) => {
  const { isReady, isFallback } = useRouter()

  const { setAccentColor, theme } = useThemeContext()

  // Only set the accent color if we have enough contrast.
  if (accentColor) {
    const rgb = accentColor
      .replace(/^rgba?\(|\s+|\)$/g, '')
      .split(',')
      .map(Number)
    const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000
    if (
      (theme === 'dark' && brightness < 60) ||
      (theme === 'light' && brightness > 255 - 80)
    ) {
      accentColor = undefined
    }
  }

  useEffect(() => {
    if (!isReady || isFallback) return

    setAccentColor(accentColor)
  }, [accentColor, setAccentColor, isReady, isFallback])

  return (
    <DAOPageWrapper {...props}>
      <SuspenseLoader fallback={<PageLoader />}>
        <div className="block md:hidden">
          <InnerMobileDaoHome />
        </div>
        <div className="hidden md:block">
          <InnerDAOHome />
        </div>
      </SuspenseLoader>
    </DAOPageWrapper>
  )
}

export default DaoHomePage

// Fallback to loading screen if page has not yet been statically generated.
export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  // Need to block until i18n translations are ready, since i18n depends
  // on server side translations being loaded.
  fallback: true,
})

export const getStaticProps: GetStaticProps<DaoHomePageProps> =
  makeGetDAOStaticProps(async ({ config: { image_url } }) => {
    if (!image_url) {
      return
    }

    const response = await axios.get(image_url, {
      responseType: 'arraybuffer',
    })
    const buffer = Buffer.from(response.data, 'binary')
    const result = await getAverageColor(buffer)

    return {
      additionalProps: { accentColor: result.rgb },
    }
  })
