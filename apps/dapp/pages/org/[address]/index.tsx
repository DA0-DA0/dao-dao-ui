import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import { MemberCheck } from '@dao-dao/icons'
import { useVotingModule } from '@dao-dao/state'
import {
  useThemeContext,
  GradientHero,
  StarButton,
  Breadcrumbs,
  MobileMenuTab,
} from '@dao-dao/ui'
import { VotingModuleType } from '@dao-dao/utils'

import { pinnedAddressesAtom } from '@/atoms/pinned'
import { ContractHeader } from '@/components/ContractHeader'
import { ContractProposalsDisplay } from '@/components/ContractProposalsDisplay'
import { DaoContractInfo } from '@/components/DaoContractInfo'
import { DaoHorizontalInfoDisplay } from '@/components/DaoHorizontalInfoDisplay'
import { DaoTreasury } from '@/components/DaoTreasury'
import { PageLoader } from '@/components/Loader'
import { MultisigMemberList } from '@/components/MultisigMemberList'
import { OrgMobileHeader } from '@/components/OrgMobileHeader'
import {
  makeGetOrgStaticProps,
  OrgPageWrapper,
  OrgPageWrapperProps,
  useOrgInfoContext,
} from '@/components/OrgPageWrapper'
import { SmallScreenNav } from '@/components/SmallScreenNav'
import { SuspenseLoader } from '@/components/SuspenseLoader'
import { YourShares } from '@/components/YourShares'
import { addToken } from '@/util/addToken'
import { getFastAverageColor } from '@/util/colors'

enum MobileMenuTabSelection {
  Proposal,
  Members,
  Staking,
  Treasury,
  Info,
}

const InnerMobileDaoHome: FC = () => {
  const { votingModuleType } = useOrgInfoContext()
  const [tab, setTab] = useState(MobileMenuTabSelection.Proposal)
  const makeTabSetter = (tab: MobileMenuTabSelection) => () => setTab(tab)

  return (
    <div className="flex flex-col gap-2">
      <GradientHero>
        <SmallScreenNav />
        <OrgMobileHeader />
      </GradientHero>
      <div className="flex overflow-auto gap-1 px-6 pb-4 border-b border-inactive no-scrollbar">
        <MobileMenuTab
          icon="🗳"
          onClick={makeTabSetter(MobileMenuTabSelection.Proposal)}
          selected={tab === MobileMenuTabSelection.Proposal}
          text="Proposal"
        />
        {votingModuleType === VotingModuleType.Cw4Voting ? (
          <MobileMenuTab
            icon="👥"
            onClick={makeTabSetter(MobileMenuTabSelection.Members)}
            selected={tab === MobileMenuTabSelection.Members}
            text="Members"
          />
        ) : votingModuleType === VotingModuleType.Cw20StakedBalanceVoting ? (
          <MobileMenuTab
            icon="💵"
            onClick={makeTabSetter(MobileMenuTabSelection.Staking)}
            selected={tab === MobileMenuTabSelection.Staking}
            text="Staking"
          />
        ) : null}
        <MobileMenuTab
          icon="🏛"
          onClick={makeTabSetter(MobileMenuTabSelection.Treasury)}
          selected={tab === MobileMenuTabSelection.Treasury}
          text="Treasury"
        />
        <MobileMenuTab
          icon="⚙️"
          onClick={makeTabSetter(MobileMenuTabSelection.Info)}
          selected={tab === MobileMenuTabSelection.Info}
          text="Info"
        />
      </div>
      <div className="py-5 px-6">
        {tab === MobileMenuTabSelection.Proposal && (
          <ContractProposalsDisplay />
        )}
        {tab === MobileMenuTabSelection.Members && (
          <MultisigMemberList primaryText />
        )}
        {tab === MobileMenuTabSelection.Staking && <YourShares primaryText />}
        {tab === MobileMenuTabSelection.Treasury && <DaoTreasury />}
        {tab === MobileMenuTabSelection.Info && (
          <DaoContractInfo hideTreasury />
        )}
      </div>
    </div>
  )
}

const InnerOrgHome: FC = () => {
  const router = useRouter()

  const {
    votingModuleType,
    coreAddress,
    governanceTokenAddress,
    name: orgName,
  } = useOrgInfoContext()
  const { isMember } = useVotingModule(coreAddress)

  const [pinnedAddresses, setPinnedAddresses] =
    useRecoilState(pinnedAddressesAtom)
  const pinned = pinnedAddresses.includes(coreAddress)

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
                  ['/starred', 'Home'],
                  [router.asPath, orgName],
                ]}
              />
              <div className="flex flex-row gap-4 items-center">
                {isMember && (
                  <div className="flex flex-row gap-2 items-center">
                    <MemberCheck fill="currentColor" width="16px" />
                    <p className="text-sm text-primary">You{"'"}re a member</p>
                  </div>
                )}
                <StarButton
                  onPin={() => {
                    if (pinned) {
                      setPinnedAddresses((p) =>
                        p.filter((a) => a !== coreAddress)
                      )
                    } else {
                      setPinnedAddresses((p) => p.concat([coreAddress]))
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
                <MultisigMemberList />
              ) : votingModuleType ===
                VotingModuleType.Cw20StakedBalanceVoting ? (
                <YourShares />
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
          <MultisigMemberList />
        ) : votingModuleType === VotingModuleType.Cw20StakedBalanceVoting ? (
          <YourShares />
        ) : null}
      </div>
    </div>
  )
}

interface DaoHomePageProps extends OrgPageWrapperProps {
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
    <OrgPageWrapper {...props}>
      <SuspenseLoader fallback={<PageLoader />}>
        <div className="block md:hidden">
          <InnerMobileDaoHome />
        </div>
        <div className="hidden md:block">
          <InnerOrgHome />
        </div>
      </SuspenseLoader>
    </OrgPageWrapper>
  )
}

export default DaoHomePage

// Fallback to loading screen if page has not yet been statically generated.
export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: true,
})

export const getStaticProps: GetStaticProps<DaoHomePageProps> =
  makeGetOrgStaticProps({
    getAdditionalProps: async ({ image_url }) =>
      image_url
        ? { accentColor: await getFastAverageColor(image_url) }
        : undefined,
  })
