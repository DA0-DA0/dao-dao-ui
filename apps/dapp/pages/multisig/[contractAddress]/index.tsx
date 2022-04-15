import { useEffect } from 'react'

import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'

import { useRecoilState, useRecoilValue } from 'recoil'

import { Threshold } from '@dao-dao/types/contracts/cw3-multisig'
import { useThemeContext } from '@dao-dao/ui'
import { CopyToClipboard } from '@dao-dao/ui'
import {
  ScaleIcon,
  UserGroupIcon,
  VariableIcon,
} from '@heroicons/react/outline'
import { useThemeContext } from '@dao-dao/ui'

import { MultisigContractInfo } from '@components/MultisigContractInfo'
import { pinnedMultisigsAtom } from 'atoms/pinned'
import { Breadcrumbs } from 'components/Breadcrumbs'
import {
  ContractProposalsDispaly,
  GradientHero,
  HeroContractHorizontalInfo,
  HeroContractHeader,
  StarButton,
  BalanceIcon,
  HeroContractHorizontalInfoSection,
} from 'components/ContractView'
import ErrorBoundary from 'components/ErrorBoundary'
import { CHAIN_RPC_ENDPOINT } from 'selectors/cosm'
import {
  listMembers,
  memberWeight,
  sigSelector,
  totalWeight,
} from 'selectors/multisigs'
import { cosmWasmClientRouter } from 'util/chainClientRouter'
import { getFastAverageColor } from 'util/colors'

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

function VoteBalanceCard({
  weight,
  title,
  weightTotal,
  addrTitle,
}: {
  weight: number
  title: string
  weightTotal: number
  addrTitle?: boolean
}) {
  return (
    <div className="py-4 px-6 mt-2 w-full rounded-lg border border-default">
      {addrTitle ? (
        <CopyToClipboard value={title} />
      ) : (
        <h2 className="font-mono caption-text">{title}</h2>
      )}
      <div className="flex flex-row flex-wrap gap-2 items-center mt-2 mt-5 mb-[22px] title-text">
        <BalanceIcon />
        {weight}
        <span className="inline secondary-text">
          {((weight / weightTotal) * 100).toLocaleString(undefined, {
            maximumSignificantDigits: 3,
          })}
          %
        </span>
      </div>
    </div>
  )
}

function MultisigHome() {
  const router = useRouter()
  const contractAddress = router.query.contractAddress as string

  const sigInfo = useRecoilValue(sigSelector(contractAddress))

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

          <HeroContractHeader
            address={contractAddress}
            description={sigInfo.config.description}
            imgUrl={sigInfo.config.image_url}
            name={sigInfo.config.name}
          />

          <div className="mt-2">
            <HeroContractHorizontalInfo>
              <HeroContractHorizontalInfoSection>
                <ScaleIcon className="inline w-4" />
                {thresholdString(sigInfo.config.threshold)}
              </HeroContractHorizontalInfoSection>
              <HeroContractHorizontalInfoSection>
                <VariableIcon className="inline w-4" />
                Total votes: {weightTotal}
              </HeroContractHorizontalInfoSection>
              <HeroContractHorizontalInfoSection>
                <UserGroupIcon className="inline w-4" />
                Total members: {memberList.length}
              </HeroContractHorizontalInfoSection>
            </HeroContractHorizontalInfo>
          </div>

          <MultisigContractInfo address={contractAddress} />
        </GradientHero>
        <div className="px-6">
          <ContractProposalsDispaly
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

  // Trigger Suspense.
  if (!isReady || isFallback) throw new Promise((_) => {})

  return (
    <ErrorBoundary title="Multisig Not Found">
      <MultisigHome />
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
