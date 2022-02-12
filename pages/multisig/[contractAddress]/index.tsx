import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useRecoilState, useRecoilValue } from 'recoil'

import { Threshold } from '@dao-dao/types/contracts/cw3-multisig'
import {
  ScaleIcon,
  UserGroupIcon,
  VariableIcon,
} from '@heroicons/react/outline'

import { pinnedMultisigsAtom } from 'atoms/pinned'
import { Breadcrumbs } from 'components/Breadcrumbs'
import {
  ContractBalances,
  ContractProposalsDispaly,
  GradientHero,
  HeroContractFooter,
  HeroContractHeader,
  StarButton,
} from 'components/ContractView'
import ErrorBoundary from 'components/ErrorBoundary'
import { isMemberSelector } from 'selectors/daos'
import {
  listMembers,
  memberWeight,
  sigSelector,
  totalWeight,
} from 'selectors/multisigs'
import { cw20Balances, nativeBalance, walletAddress } from 'selectors/treasury'

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
}: {
  weight: number
  title: string
  weightTotal: number
}) {
  return (
    <div className="shadow p-6 rounded-lg w-full border border-base-300 h-28 mt-2">
      <h2 className="text-sm font-mono text-secondary overflow-auto">
        {title}
      </h2>
      <div className="flex items-baseline gap-2">
        <p className="mt-2 font-bold">{weight}</p>
        <p className="text-sm text-secondary">
          (
          {((weight / weightTotal) * 100).toLocaleString(undefined, {
            maximumSignificantDigits: 3,
          })}
          %)
        </p>
      </div>
    </div>
  )
}

function MultisigHome() {
  const router = useRouter()
  const contractAddress = router.query.contractAddress as string

  const sigInfo = useRecoilValue(sigSelector(contractAddress))
  const nativeBalances = useRecoilValue(nativeBalance(contractAddress))
  const cw20s = useRecoilValue(cw20Balances(contractAddress))
  const memberInfo = useRecoilValue(isMemberSelector(contractAddress))

  const weightTotal = useRecoilValue(totalWeight(contractAddress))
  const visitorWeight = useRecoilValue(memberWeight(contractAddress))
  const visitorAddress = useRecoilValue(walletAddress)
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
              pinned={pinned}
              onPin={() => {
                if (pinned) {
                  setPinnedSigs((p) => p.filter((a) => a !== contractAddress))
                } else {
                  setPinnedSigs((p) => p.concat([contractAddress]))
                }
              }}
            />
          </div>

          <HeroContractHeader
            name={sigInfo.config.name}
            member={memberInfo.member}
            address={contractAddress}
            imgUrl={sigInfo.config.image_url}
          />

          <ContractBalances
            description={sigInfo.config.description}
            gov_token={''}
            staking_contract={''}
            native={nativeBalances}
            cw20={cw20s}
          />

          <HeroContractFooter>
            <div>
              <ScaleIcon className="w-5 h-5 mb-1 mr-1 inline" />
              {thresholdString(sigInfo.config.threshold)}
            </div>
            <div>
              <VariableIcon className="w-5 mb-1 mr-1 inline" />
              Total votes: {weightTotal}
            </div>
            <div>
              <UserGroupIcon className="w-5 mb-1 mr-1 inline" />
              Total members: {memberList.length}
            </div>
          </HeroContractFooter>
        </GradientHero>
        <div className="px-6">
          <ContractProposalsDispaly
            contractAddress={contractAddress}
            proposalCreateLink={`/multisig/${contractAddress}/proposals/create`}
            multisig
          />
        </div>
      </div>
      <div className="col-start-5 col-span-2 p-6 min-h-screen h-full">
        <hr className="mt-8 mb-6" />
        {visitorWeight && (
          <>
            <h2 className="font-medium text-md">Your shares</h2>
            <ul className="list-none mt-3">
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
        <h2 className="font-medium text-md mt-3">Member shares</h2>
        <ul className="list-none mt-3">
          {memberList
            .filter((m) => m.addr != visitorAddress)
            .map((member) => (
              <li key={member.addr}>
                <VoteBalanceCard
                  title={member.addr}
                  weight={member.weight}
                  weightTotal={weightTotal}
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

const MultisigHomePage: NextPage = () => (
  <ErrorBoundary title="Multisig Not Found">
    <MultisigHome />
  </ErrorBoundary>
)

export default MultisigHomePage
