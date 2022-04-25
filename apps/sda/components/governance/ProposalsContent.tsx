import { useCallback, useMemo, useState } from 'react'

import { useRouter } from 'next/router'

import { useRecoilValue, constSelector } from 'recoil'

import { Status } from '@dao-dao/state/clients/cw-proposal-single'
import { governanceModulesSelector } from '@dao-dao/state/recoil/selectors/clients/cw-core'
import { listProposalsSelector } from '@dao-dao/state/recoil/selectors/clients/cw-proposal-single'
import { Button } from '@dao-dao/ui'
import { titlecase } from '@dao-dao/utils'
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/solid'

import { ProposalItem } from './ProposalItem'
import { DAO_ADDRESS } from '@/util'

const StatusValues = Object.values(Status)

export const ProposalsContent = () => {
  const router = useRouter()

  const [filter, setFilter] = useState<Status>()
  const cycleFilter = useCallback(
    () =>
      setFilter((filter) => {
        if (!filter) return StatusValues[0]

        const nextIndex =
          (StatusValues.indexOf(filter) + 1) % StatusValues.length
        if (nextIndex === 0) return undefined

        return StatusValues[nextIndex]
      }),
    [setFilter]
  )

  const governanceModuleAddress = useRecoilValue(
    governanceModulesSelector({ contractAddress: DAO_ADDRESS, params: [{}] })
  )?.[0]
  const proposalResponses = useRecoilValue(
    governanceModuleAddress
      ? listProposalsSelector({
          contractAddress: governanceModuleAddress,
          params: [{}],
        })
      : constSelector(undefined)
  )?.proposals

  const filteredProposalResponses = useMemo(() => {
    if (!proposalResponses) return []
    if (!filter) return proposalResponses
    return proposalResponses.filter(
      ({ proposal: { status } }) => status === filter
    )
  }, [filter, proposalResponses])

  return (
    <>
      <div className="flex justify-between items-center">
        <Button onClick={cycleFilter} type="button" variant="secondary">
          <ChevronDownIcon className="w-4 h-4" /> {titlecase(filter ?? 'All')}
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
        {filteredProposalResponses.map((response) => (
          <ProposalItem key={response.id} proposalResponse={response} />
        ))}
      </div>
    </>
  )
}
