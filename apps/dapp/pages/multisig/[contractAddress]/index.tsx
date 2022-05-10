import {
  ScaleIcon,
  UserGroupIcon,
  VariableIcon,
} from '@heroicons/react/outline'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
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
} from '@dao-dao/ui'
import { CHAIN_RPC_ENDPOINT } from '@dao-dao/utils'

import { pinnedMultisigsAtom } from '@/atoms/pinned'
import { ContractProposalsDisplay } from '@/components/ContractView'
import ErrorBoundary from '@/components/ErrorBoundary'
import { VoteBalanceCard } from '@/components/multisig'
import { MultisigContractInfo } from '@/components/MultisigContractInfo'
import { SuspenseLoader } from '@/components/SuspenseLoader'
import { contractInstantiateTime } from '@/selectors/contracts'
import {
  sigSelector,
  totalWeight,
  memberWeight,
  listMembers,
} from '@/selectors/multisigs'
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

const InnerMultisigHome = () => {
  const router = useRouter()
  const contractAddress = router.query.contractAddress as string

  const sigInfo = useRecoilValue(sigSelector(contractAddress))
  const established = useRecoilValue(contractInstantiateTime(contractAddress))

  const weightTotal = useRecoilValue(totalWeight(contractAddress))
  const visitorWeight = useRecoilValue(memberWeight(contractAddress))
  const memberList = useRecoilValue(listMembers(contractAddress))

  const [pinnedSigs, setPinnedSigs] = useRecoilState(pinnedMultisigsAtom)
  const pinned = pinnedSigs.includes(contractAddress)

  return (
    <div className="grid grid-cols-6">
      <div className="col-span-4 min-h-screen">
        <GradientHero>
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

          <MultisigContractInfo address={contractAddress} />
        </GradientHero>
        <div className="px-6">
          <ContractProposalsDisplay
            contractAddress={contractAddress}
            multisig
            proposalCreateLink={`/multisig/${contractAddress}/proposals/create`}
          />
        </div>
      </div>
      <div className="col-span-2 col-start-5 p-6 h-full min-h-screen">
        {visitorWeight && (
          <>
            <h2 className="mt-1 mb-[23px] title-text">Your shares</h2>
            <ul className="mt-3 list-none">
              <li>
                <VoteBalanceCard
                  title="voting weight"
                  weight={visitorWeight}
                  weightTotal={weightTotal}
                />
              </li>
            </ul>
          </>
        )}
        {memberList.length != 0 && (
          <>
            <h2 className="mt-5 mb-[23px] title-text">Member shares</h2>
            <ul className="mt-3 list-none">
              {memberList.map((member) => (
                <li key={member.addr}>
                  <VoteBalanceCard
                    addrTitle
                    title={member.addr}
                    weight={member.weight}
                    weightTotal={weightTotal}
                  />
                </li>
              ))}
            </ul>
          </>
        )}
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
        <InnerMultisigHome />
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
