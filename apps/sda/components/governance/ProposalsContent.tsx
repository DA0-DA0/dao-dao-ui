import { useRouter } from 'next/router'

import { useRecoilValue, constSelector } from 'recoil'

import { governanceModulesSelector } from '@dao-dao/state/recoil/selectors/clients/cw-core'
import { listProposalsSelector } from '@dao-dao/state/recoil/selectors/clients/cw-proposal-single'
import { Button } from '@dao-dao/ui'
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/solid'

import { ProposalItem } from './ProposalItem'
import { DAO_ADDRESS } from '@/util'

export const ProposalsContent = () => {
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
    <>
      <div className="flex justify-between items-center">
        <Button type="button" variant="secondary">
          <ChevronDownIcon className="w-4 h-4" /> Open
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
    </>
  )
}
