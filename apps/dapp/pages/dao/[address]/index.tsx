import axios from 'axios'
import { getAverageColor } from 'fast-average-color-node'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'

import i18n from '@dao-dao/i18n'
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
import { VotingModuleType } from '@dao-dao/utils'

import {
  ContractHeader,
  ContractProposalsDisplay,
  Cw20StakedBalanceVotingSharesDisplay,
  Cw4VotingMemberList,
  DAOMobileHeader,
  DAOPageWrapper,
  DAOPageWrapperProps,
  DaoContractInfo,
  DaoHorizontalInfoDisplay,
  DaoTreasury,
  PageLoader,
  SmallScreenNav,
  makeGetDAOStaticProps,
  useDAOInfoContext,
} from '@/components'
import { usePinnedDAOs } from '@/hooks'
import { addToken } from '@/util'

enum MobileMenuTabSelection {
  Proposal,
  Members,
  Staking,
  Treasury,
  Info,
}

const InnerMobileDaoHome: FC = () => {
  const { votingModuleType } = useDAOInfoContext()
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
          text={i18n.t('Proposals')}
        />
        {votingModuleType === VotingModuleType.Cw4Voting ? (
          <MobileMenuTab
            icon="👥"
            onClick={makeTabSetter(MobileMenuTabSelection.Members)}
            selected={tab === MobileMenuTabSelection.Members}
            text={i18n.t('Members')}
          />
        ) : votingModuleType === VotingModuleType.Cw20StakedBalanceVoting ? (
          <MobileMenuTab
            icon="💵"
            onClick={makeTabSetter(MobileMenuTabSelection.Staking)}
            selected={tab === MobileMenuTabSelection.Staking}
            text={i18n.t('Staking')}
          />
        ) : null}
        <MobileMenuTab
          icon="🏛"
          onClick={makeTabSetter(MobileMenuTabSelection.Treasury)}
          selected={tab === MobileMenuTabSelection.Treasury}
          text={i18n.t('Treasury')}
        />
        <MobileMenuTab
          icon="⚙️"
          onClick={makeTabSetter(MobileMenuTabSelection.Info)}
          selected={tab === MobileMenuTabSelection.Info}
          text={i18n.t('Info')}
        />
      </div>
      <div className="py-5 px-6">
        {tab === MobileMenuTabSelection.Proposal && (
          <ContractProposalsDisplay />
        )}
        {tab === MobileMenuTabSelection.Members && (
          <Cw4VotingMemberList primaryText />
        )}
        {tab === MobileMenuTabSelection.Staking && (
          <Cw20StakedBalanceVotingSharesDisplay primaryText />
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
  const router = useRouter()

  const { votingModuleType, coreAddress, governanceTokenAddress, name } =
    useDAOInfoContext()
  const { isMember } = useVotingModule(coreAddress)

  const { isPinned, setPinned, setUnpinned } = usePinnedDAOs()
  const pinned = isPinned(coreAddress)

  const shouldAddToken = router.query.add_token
  useEffect(() => {
    if (shouldAddToken && governanceTokenAddress) {
      addToken(governanceTokenAddress)
    }
  }, [shouldAddToken, governanceTokenAddress])

  return (
    <div className="flex flex-col items-stretch lg:grid lg:grid-cols-6">
      <div className="col-span-4 min-h-screen">
        <GradientHero>
          <SmallScreenNav />
          <div className="p-6">
            <div className="flex justify-between items-center">
              <Breadcrumbs
                crumbs={[
                  ['/home', i18n.t('Home page')],
                  [router.asPath, name],
                ]}
              />
              <div className="flex flex-row gap-4 items-center">
                {isMember && (
                  <div className="flex flex-row gap-2 items-center">
                    <MemberCheck fill="currentColor" width="16px" />
                    <p className="text-sm text-primary">
                      {i18n.t('You are a member')}
                    </p>
                  </div>
                )}
                <HeartButton
                  onPin={() => {
                    if (pinned) {
                      setUnpinned(coreAddress)
                    } else {
                      setPinned(coreAddress)
                      governanceTokenAddress && addToken(governanceTokenAddress)
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
              {votingModuleType === VotingModuleType.Cw4Voting ? (
                <Cw4VotingMemberList />
              ) : votingModuleType ===
                VotingModuleType.Cw20StakedBalanceVoting ? (
                <Cw20StakedBalanceVotingSharesDisplay />
              ) : null}
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
        {votingModuleType === VotingModuleType.Cw4Voting ? (
          <Cw4VotingMemberList />
        ) : votingModuleType === VotingModuleType.Cw20StakedBalanceVoting ? (
          <Cw20StakedBalanceVotingSharesDisplay />
        ) : null}
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
  fallback: true,
})

export const getStaticProps: GetStaticProps<DaoHomePageProps> =
  makeGetDAOStaticProps({
    getAdditionalProps: async ({ image_url }) => {
      if (!image_url) return undefined

      const response = await axios.get(image_url, {
        responseType: 'arraybuffer',
      })
      const buffer = Buffer.from(response.data, 'binary')

      const result = await getAverageColor(buffer)
      return { accentColor: result.rgb }
    },
  })
