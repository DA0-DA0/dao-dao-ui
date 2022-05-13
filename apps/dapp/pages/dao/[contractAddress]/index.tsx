import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValueLoadable } from 'recoil'

import { MemberCheck } from '@dao-dao/icons'
import {
  useThemeContext,
  GradientHero,
  StarButton,
  Breadcrumbs,
  MobileMenuTab,
} from '@dao-dao/ui'
import { CHAIN_RPC_ENDPOINT, cosmWasmClientRouter } from '@dao-dao/utils'

import { pinnedDaosAtom } from '@/atoms/pinned'
import { ContractHeader } from '@/components/ContractHeader'
import { ContractProposalsDisplay } from '@/components/ContractView'
import { YourShares } from '@/components/dao'
import { DaoContractInfo } from '@/components/DaoContractInfo'
import { DaoHorizontalInfoDisplay } from '@/components/DaoHorizontalInfoDisplay'
import { DaoTreasury } from '@/components/DaoTreasury'
import ErrorBoundary from '@/components/ErrorBoundary'
import { Loader } from '@/components/Loader'
import { MobileHeader } from '@/components/MobileHeader'
import { SmallScreenNav } from '@/components/SmallScreenNav'
import { SuspenseLoader } from '@/components/SuspenseLoader'
import { isMemberSelector } from '@/selectors/cosm'
import { daoSelector } from '@/selectors/daos'
import { addToken } from '@/util/addToken'
import { getFastAverageColor } from '@/util/colors'

enum MobileMenuTabSelection {
  Proposal,
  Staking,
  Treasury,
  Info,
}

const InnerMobileDaoHome: FC = () => {
  const router = useRouter()
  const contractAddress = router.query.contractAddress as string

  const [tab, setTab] = useState(MobileMenuTabSelection.Proposal)
  const makeTabSetter = (tab: MobileMenuTabSelection) => () => setTab(tab)

  return (
    <div className="flex flex-col gap-2">
      <GradientHero>
        <SmallScreenNav />
        <MobileHeader contractAddress={contractAddress} />
      </GradientHero>
      <div className="flex overflow-auto gap-1 px-6 pb-4 border-b border-inactive no-scrollbar">
        <MobileMenuTab
          icon="🗳"
          onClick={makeTabSetter(MobileMenuTabSelection.Proposal)}
          selected={tab === MobileMenuTabSelection.Proposal}
          text="Proposal"
        />
        <MobileMenuTab
          icon="💵"
          onClick={makeTabSetter(MobileMenuTabSelection.Staking)}
          selected={tab === MobileMenuTabSelection.Staking}
          text="Staking"
        />
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
        {tab === MobileMenuTabSelection.Staking && <YourShares primaryText />}
        {tab === MobileMenuTabSelection.Proposal && (
          <ContractProposalsDisplay
            contractAddress={contractAddress}
            proposalCreateLink={`/dao/${contractAddress}/proposals/create`}
          />
        )}
        {tab === MobileMenuTabSelection.Treasury && (
          <DaoTreasury address={contractAddress} />
        )}
        {tab === MobileMenuTabSelection.Info && (
          <DaoContractInfo address={contractAddress} hideTreasury />
        )}
      </div>
    </div>
  )
}

const InnerDaoHome: FC = () => {
  const router = useRouter()
  const contractAddress = router.query.contractAddress as string

  const daoInfo = useRecoilValueLoadable(daoSelector(contractAddress))
  const member = useRecoilValueLoadable(isMemberSelector(contractAddress))

  const [pinnedDaos, setPinnedDaos] = useRecoilState(pinnedDaosAtom)
  const pinned = pinnedDaos.includes(contractAddress)

  const shouldAddToken = router.query.add_token
  useEffect(() => {
    if (shouldAddToken && daoInfo.state === 'hasValue') {
      addToken(daoInfo.getValue().gov_token)
    }
  }, [shouldAddToken, daoInfo])

  return (
    <div className="flex flex-row lg:grid lg:grid-cols-6">
      <div className="col-span-4 mx-auto min-h-screen lg:mx-0">
        <GradientHero>
          <div className="block lg:hidden">
            <SmallScreenNav />
          </div>
          <div className="p-6">
            <div className="flex justify-between items-center">
              <Breadcrumbs
                crumbs={[
                  ['/starred', 'Home'],
                  [
                    router.asPath,
                    daoInfo.state === 'hasValue'
                      ? daoInfo.getValue().config.name
                      : 'DAO',
                  ],
                ]}
              />
              <div className="flex flex-row gap-4 items-center">
                {member.state === 'hasValue' && member.getValue().member && (
                  <div className="flex flex-row gap-2 items-center">
                    <MemberCheck fill="currentColor" width="16px" />
                    <p className="text-sm text-primary">You{"'"}re a member</p>
                  </div>
                )}
                <StarButton
                  onPin={() => {
                    if (pinned) {
                      setPinnedDaos((p) =>
                        p.filter((a) => a !== contractAddress)
                      )
                    } else {
                      setPinnedDaos((p) => p.concat([contractAddress]))
                      if (daoInfo.state === 'hasValue') {
                        addToken(daoInfo.getValue().gov_token)
                      }
                    }
                  }}
                  pinned={pinned}
                />
              </div>
            </div>

            <ContractHeader contractAddress={contractAddress} />

            <div className="mt-2">
              <DaoHorizontalInfoDisplay contractAddress={contractAddress} />
            </div>
            <div className="block mt-4 lg:hidden">
              <YourShares />
            </div>
            <div className="pt-[22px] pb-[28px] border-b border-inactive">
              <DaoContractInfo address={contractAddress} />
            </div>
          </div>
        </GradientHero>
        <div className="px-6">
          <ContractProposalsDisplay
            contractAddress={contractAddress}
            proposalCreateLink={`/dao/${contractAddress}/proposals/create`}
          />
        </div>
      </div>
      <div className="hidden col-span-2 p-6 h-full w-full min-h-screen lg:block">
        <YourShares />
      </div>
    </div>
  )
}

interface StaticProps {
  accentColor?: string
}

const DaoHomePage: NextPage<StaticProps> = ({ accentColor }) => {
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
    <ErrorBoundary title="DAO Not Found">
      <SuspenseLoader fallback={<Loader className="mt-6" size={72} />}>
        <div className="block md:hidden">
          <InnerMobileDaoHome />
        </div>
        <div className="hidden md:block">
          <InnerDaoHome />
        </div>
      </SuspenseLoader>
    </ErrorBoundary>
  )
}

export default DaoHomePage

// Fallback to loading screen if page has not yet been statically generated.
export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: true,
})

export const getStaticProps: GetStaticProps<StaticProps> = async ({
  params: { contractAddress } = { contractAddress: undefined },
}) => {
  if (typeof contractAddress !== 'string' || !contractAddress) {
    return { props: {} }
  }

  try {
    const client = await cosmWasmClientRouter.connect(CHAIN_RPC_ENDPOINT)
    const daoInfo = await client.queryContractSmart(contractAddress, {
      get_config: {},
    })
    if (!daoInfo || !daoInfo.config || !daoInfo.config.image_url) {
      return { props: {} }
    }

    const accentColor = await getFastAverageColor(daoInfo.config.image_url)
    return { props: { accentColor } }
  } catch (err) {
    console.error(err)
  }

  return { props: {} }
}
