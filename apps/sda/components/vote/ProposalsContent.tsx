import { ChevronDownIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import { useMemo } from 'react'
import { constSelector, useRecoilValue } from 'recoil'

import { CwProposalSingleSelectors, useProposalModule } from '@dao-dao/state'
import { Status } from '@dao-dao/state/clients/cw-proposal-single'

import { ProposalItem } from './ProposalItem'
import { DAO_ADDRESS, OLD_PROPOSALS_ADDRESS } from '@/util'

export const ProposalsContent = () => {
  const { proposalResponses: allProposalResponses } = useProposalModule(
    DAO_ADDRESS,
    {
      fetchProposalResponses: true,
    }
  )

  const oldModuleResponses = useRecoilValue(
    OLD_PROPOSALS_ADDRESS
      ? CwProposalSingleSelectors.listProposalsSelector({
          contractAddress: OLD_PROPOSALS_ADDRESS,
          params: [{}],
        })
      : constSelector(undefined)
  )?.proposals

  const openProposalResponses = useMemo(() => {
    if (!allProposalResponses) return []
    return allProposalResponses.filter(
      ({ proposal: { status } }) => status === Status.Open
    )
  }, [allProposalResponses])

  const historyProposalResponses = useMemo(() => {
    if (!allProposalResponses) return []
    return allProposalResponses
      .filter(({ proposal: { status } }) => status !== Status.Open)
      .reverse()
  }, [allProposalResponses])

  return (
    <div>
      {/* Only display open/none open if there are proposals. If there are
       * no proposals, the user will still see the 'No history' messsage at
       * the bottom of the page.
       */}
      {!!allProposalResponses?.length && (
        <>
          <h2 className="flex gap-2 items-center mb-4 caption-text">
            <ChevronDownIcon
              className={clsx('w-4 h-4', {
                '-rotate-90': openProposalResponses.length === 0,
              })}
            />{' '}
            {openProposalResponses.length === 0 ? 'None open' : 'Open'}
          </h2>

          {openProposalResponses.length > 0 && (
            <div className="mb-8 space-y-1">
              {openProposalResponses.map((response) => (
                <ProposalItem key={response.id} proposalResponse={response} />
              ))}
            </div>
          )}
        </>
      )}

      <h2 className="flex gap-2 items-center caption-text">
        <ChevronDownIcon
          className={clsx('w-4 h-4', {
            '-rotate-90': historyProposalResponses.length === 0,
          })}
        />{' '}
        {historyProposalResponses.length === 0 ? 'No history' : 'History'}
      </h2>

      {historyProposalResponses.length > 0 && (
        <div className="mt-4 space-y-1">
          {historyProposalResponses.map((response) => (
            <ProposalItem key={response.id} proposalResponse={response} />
          ))}
        </div>
      )}

      {oldModuleResponses && (
        <>
          <h2 className="flex gap-2 items-center mt-8 caption-text">
            <ChevronDownIcon className="w-4 h-4" /> Previous proposal module
          </h2>
          <div className="mt-4 space-y-1">
            {oldModuleResponses.map((response) => (
              <ProposalItem key={response.id} old proposalResponse={response} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
