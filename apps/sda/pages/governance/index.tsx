/* eslint-disable @next/next/no-img-element */

import { NextPage } from 'next'

import { Button } from '@dao-dao/ui'
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/solid'

import { Excerpt } from '@/components/governance/Excerpt'
import { Hero } from '@/components/governance/Hero'
import { ProposalList } from '@/components/governance/ProposalList'

export interface GovernancePageProps {
  //
}

const GovernancePage: NextPage<GovernancePageProps> = () => {
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
          <Button type="button" variant="secondary">
            <PlusIcon className="w-4 h-4" /> New Proposal
          </Button>
        </div>
        <ProposalList data={ProposalList.PLACEHOLDER_DATA} />
      </div>
    </section>
  )
}

export default GovernancePage
