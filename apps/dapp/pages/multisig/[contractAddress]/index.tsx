import {
  ScaleIcon,
  UserGroupIcon,
  VariableIcon,
} from '@heroicons/react/outline'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { Threshold } from '@dao-dao/types/contracts/cw3-multisig'
import {
  useThemeContext,
  GradientHero,
  HorizontalInfo,
  HorizontalInfoSection,
  ContractHeader,
  StarButton,
  Breadcrumbs,
  LoadingScreen,
  MobileMenuTab,
} from '@dao-dao/ui'
import { CHAIN_RPC_ENDPOINT } from '@dao-dao/utils'

import { pinnedMultisigsAtom } from '@/atoms/pinned'
import { ContractProposalsDisplay } from '@/components/ContractView'
import { DaoTreasury } from '@/components/DaoTreasury'
import ErrorBoundary from '@/components/ErrorBoundary'
import { MobileHeader } from '@/components/MobileHeader'
import { MultisigContractInfo } from '@/components/MultisigContractInfo'
import { MultisigMemberList } from '@/components/MultisigMemberList'
import { SmallScreenNav } from '@/components/SmallScreenNav'
import { SuspenseLoader } from '@/components/SuspenseLoader'
import { contractInstantiateTime } from '@/selectors/contracts'
import { sigSelector, totalWeight, listMembers } from '@/selectors/multisigs'
import { cosmWasmClientRouter } from '@/util/chainClientRouter'
import { getFastAverageColor } from '@/util/colors'

const thresholdString = (t: Threshold) => {
  if ('absolute_count' in t) {
    const count = t.absolute_count.weight
    return `Passing threshold: ${count}`
  } else if ('absolute_percentage' in t) {
    const threshold = t.absolute_percentage.percentage
    return `Passing threshold: ${threshold}%`
  } else if ('threshold_quorum' in t) {
    const quorum = t.threshold_quorum.quorum
    const threshold = t.threshold_quorum.threshold
    return `Quorum: ${quorum}% ; Passing threshold: ${threshold}%`
  } else {
    return 'unknown threshold type'
  }
}

enum MobileMenuTabSelection {
  Proposal,
  Treasury,
  Members,
  Info,
}

const InnerMobileMultisigHome = () => {
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
          icon="👥"
          onClick={makeTabSetter(MobileMenuTabSelection.Members)}
          selected={tab === MobileMenuTabSelection.Members}
          text="Members"
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
        {tab === MobileMenuTabSelection.Proposal && (
          <ContractProposalsDisplay
            contractAddress={contractAddress}
            proposalCreateLink={`/multisig/${contractAddress}/proposals/create`}
          />
        )}
        {tab === MobileMenuTabSelection.Members && (
          <MultisigMemberList contractAddress={contractAddress} />
        )}
        {tab === MobileMenuTabSelection.Treasury && (
          <DaoTreasury address={contractAddress} multisig />
        )}
        {tab === MobileMenuTabSelection.Info && (
          <MultisigContractInfo address={contractAddress} hideTreasury />
        )}
      </div>
    </div>
  )
}

const InnerMultisigHome = () => {
  const router = useRouter()
  const contractAddress = router.query.contractAddress as string

  const sigInfo = useRecoilValue(sigSelector(contractAddress))
  const established = useRecoilValue(contractInstantiateTime(contractAddress))

  const weightTotal = useRecoilValue(totalWeight(contractAddress))
  const memberList = useRecoilValue(listMembers(contractAddress))

  const [pinnedSigs, setPinnedSigs] = useRecoilState(pinnedMultisigsAtom)
  const pinned = pinnedSigs.includes(contractAddress)

  return (
    <div className="flex flex-row lg:grid lg:grid-cols-6">
      <div className="col-span-4 w-full min-h-screen">
        <GradientHero>
          <div className="w-full border-b bg-accent-transparent border-inactive px-6 py-3 flex items-center justify-center">
            <p className="text-center">
              This is a beta Multisig.{' '}
              <a
                className="underline"
                href="https://docs.daodao.zone/docs/upgrading/multisig"
                rel="noreferrer"
                target="_blank"
              >
                Upgrade to V1
              </a>{' '}
              to continue receiving feature releases.
            </p>
          </div>
          <SmallScreenNav />
          <div className="p-6">
            <div className="flex justify-between items-center">
              <Breadcrumbs
                crumbs={[
                  ['/starred', 'Home'],
                  [router.asPath, sigInfo.config.name],
                ]}
              />
              <StarButton
                onPin={() => {
                  if (pinned) {
                    setPinnedSigs((p) => p.filter((a) => a !== contractAddress))
                  } else {
                    setPinnedSigs((p) => p.concat([contractAddress]))
                  }
                }}
                pinned={pinned}
              />
            </div>

            <ContractHeader
              description={sigInfo.config.description}
              established={established}
              imgUrl={sigInfo.config.image_url || undefined}
              name={sigInfo.config.name}
            />

            <div className="mt-2">
              <HorizontalInfo>
                <HorizontalInfoSection>
                  <ScaleIcon className="inline w-4" />
                  {thresholdString(sigInfo.config.threshold)}
                </HorizontalInfoSection>
                <HorizontalInfoSection>
                  <VariableIcon className="inline w-4" />
                  Total votes: {weightTotal}
                </HorizontalInfoSection>
                <HorizontalInfoSection>
                  <UserGroupIcon className="inline w-4" />
                  Total members: {memberList.length}
                </HorizontalInfoSection>
              </HorizontalInfo>
            </div>
            <div className="block mt-4 lg:hidden">
              <MultisigMemberList contractAddress={contractAddress} />
            </div>

            <div className="pt-[22px] pb-[28px] border-b border-inactive">
              <MultisigContractInfo address={contractAddress} />
            </div>
          </div>
        </GradientHero>
        <div className="px-6">
          <ContractProposalsDisplay
            contractAddress={contractAddress}
            multisig
            proposalCreateLink={`/multisig/${contractAddress}/proposals/create`}
          />
        </div>
      </div>
      <div className="hidden col-span-2 p-6 max-w-sm h-full min-h-screen lg:block">
        <MultisigMemberList contractAddress={contractAddress} />
      </div>
    </div>
  )
}

interface StaticProps {
  accentColor?: string
}

const MultisigHomePage: NextPage<StaticProps> = ({ accentColor }) => {
  const { isReady, isFallback } = useRouter()

  const { setAccentColor } = useThemeContext()
  useEffect(() => {
    if (!isReady || isFallback) return

    setAccentColor(accentColor)
  }, [accentColor, setAccentColor, isReady, isFallback])

  return (
    <ErrorBoundary title="Multisig Not Found">
      <SuspenseLoader fallback={<LoadingScreen />}>
        <div className="md:hidden">
          <InnerMobileMultisigHome />
        </div>
        <div className="hidden md:block">
          <InnerMultisigHome />
        </div>
      </SuspenseLoader>
    </ErrorBoundary>
  )
}

export default MultisigHomePage

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
    const sigInfo = await client.queryContractSmart(contractAddress, {
      get_config: {},
    })
    if (!sigInfo || !sigInfo.config || !sigInfo.config.image_url) {
      return { props: {} }
    }

    const accentColor = await getFastAverageColor(sigInfo.config.image_url)
    return { props: { accentColor } }
  } catch (err) {
    console.error(err)
  }

  return { props: {} }
}
