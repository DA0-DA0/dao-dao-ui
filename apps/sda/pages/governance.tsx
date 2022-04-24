/* eslint-disable @next/next/no-img-element */

import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { constSelector, useRecoilValue } from 'recoil'

import { governanceModulesSelector } from '@dao-dao/state/recoil/selectors/clients/cw-governance'
import { listProposalsSelector } from '@dao-dao/state/recoil/selectors/clients/cw-proposal-single'
import { Button } from '@dao-dao/ui'
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/solid'

import {
  Excerpt,
  Hero,
  makeGetServerSideProps,
  PageWrapper,
  PageWrapperProps,
  ProposalItem,
} from '@/components'
import { DAO_ADDRESS } from '@/util'

const InnerGovernance = () => {
  const router = useRouter()

  const governanceModuleAddress = useRecoilValue(
    governanceModulesSelector({ contractAddress: DAO_ADDRESS, params: [{}] })
  )?.[0]
  const proposalResponses =
    useRecoilValue(
      governanceModuleAddress
        ? listProposalsSelector({
            contractAddress: governanceModuleAddress,
            params: [{}],
          })
        : constSelector(undefined)
    )?.proposals ?? []

  return (
    <section className="p-8 mx-auto space-y-8 max-w-screen-xl">
      <Hero>
        <Hero.Overlay imageUrl="/daotoken.jpg" />
        <Hero.Header
          description="Token governance for JunoSwap"
          imageUrl="/daotoken.jpg"
          title="Raw DAO"
        />
        <Hero.Stats
          data={{
            denom: 'RAW',
            totalSupply: 10000000,
            stakedPercent: 94,
            aprPercent: 103,
            unstakingDays: 14,
            proposalDeposit: 50,
            depositRefund: true,
            passingThreshold: 50,
          }}
        />
      </Hero>

      <Excerpt>
        <Excerpt.Placeholder />
      </Excerpt>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Raw DAO’s Proposals</h3>
        <div className="flex justify-between items-center">
          <Button type="button" variant="secondary">
            <ChevronDownIcon className="w-4 h-4" /> Open - 9 items
          </Button>
          <Button
            onClick={() => router.push('/propose')}
            type="button"
            variant="secondary"
          >
            <PlusIcon className="w-4 h-4" /> New Proposal
          </Button>
        </div>

        <div className="space-y-1">
          {proposalResponses.map((response) => (
            <ProposalItem key={response.id} proposalResponse={response} />
          ))}
        </div>
      </div>
    </section>
  )
}

const GovernancePage: NextPage<PageWrapperProps> = ({
  children: _,
  ...props
}) => (
  <PageWrapper {...props}>
    <InnerGovernance />
  </PageWrapper>
)

export default GovernancePage

export const getServerSideProps = makeGetServerSideProps()
