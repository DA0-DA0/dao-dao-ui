import { DownloadIcon } from '@heroicons/react/outline'
import { FC, useEffect } from 'react'
import { useRecoilState, useRecoilValue, waitForAll } from 'recoil'

import { useProposalModule } from '@dao-dao/state'
import { ProposalResponse } from '@dao-dao/state/clients/cw-proposal-single'
import {
  listProposalsSelector,
  proposalSelector,
} from '@dao-dao/state/recoil/selectors/clients/cw-proposal-single'
import { ProposalLine, Button } from '@dao-dao/ui'

import {
  proposalListAtom,
  proposalsCreatedAtom,
  proposalsRequestStartAfterAtom,
  proposalsUpdated,
} from '@/atoms/proposals'

const PROP_LOAD_LIMIT = 10

const getOldestLoadedProposal = (props: ProposalResponse[]) => {
  if (!props.length) {
    return Infinity
  }
  return props[props.length - 1].id
}

const getNewestLoadedProposal = (props: ProposalResponse[]) => {
  if (!props.length) {
    return 0
  }
  return props[0].id
}

interface ProposalListProps {
  contractAddress: string
}

export const ProposalList: FC<ProposalListProps> = ({ contractAddress }) => {
  const { proposalModuleAddress, proposalCount } = useProposalModule(
    contractAddress,
    { fetchProposalCount: true }
  )

  if (!proposalModuleAddress) {
    throw new Error('No proposal module found.')
  }

  // Our position in the DAO's list of proposals.
  const [startAfter, setStartAfter] = useRecoilState(
    proposalsRequestStartAfterAtom
  )
  // The proposals that we have loaded.
  const [propList, setPropList] = useRecoilState(
    proposalListAtom(contractAddress)
  )
  // The number of proposals that have been created by the visitor and not added to the propList
  const [propsCreated, setPropsCreated] = useRecoilState(
    proposalsCreatedAtom(contractAddress)
  )

  // Update the proposal list with any proposals that were created
  // since we were last here.
  const newProps = useRecoilValue(
    listProposalsSelector({
      contractAddress: proposalModuleAddress,
      params: [
        {
          startAfter: getNewestLoadedProposal(propList) + propsCreated + 1,
          limit: propsCreated,
        },
      ],
    })
  )?.proposals

  useEffect(() => {
    setPropList((p) => {
      // Need to check this condition here instead of outside as
      // `setPropsCreated` will race against the next reflow of this
      // page which may cause a duplicate to be appended.
      if (
        getOldestLoadedProposal(newProps ?? []) > getNewestLoadedProposal(p)
      ) {
        return (newProps ?? []).concat(p)
      }
      return p
    })
    // We've now handled all the newly created proposals.
    setPropsCreated(0)
  }, [setPropList, setPropsCreated, newProps])

  // Update the proposal list with any proposals that have been
  // requested by a load more press or first load of this page.
  const existingProps = useRecoilValue(
    listProposalsSelector({
      contractAddress: proposalModuleAddress,
      params: [
        {
          startAfter,
          limit: PROP_LOAD_LIMIT,
        },
      ],
    })
  )?.proposals

  useEffect(() => {
    // We query proposals in reverse showing the most recent (highest
    // ID) ones first. If a new query starts with a proposal with an ID
    // that is smaller than the smallest one that we have seen we can
    // safely add the new proposals to our list without worrying about
    // duplicates.
    if (existingProps?.length) {
      setPropList((p) => {
        // Can't check this condition in the enclosing if statement
        // becasue setState operations don't happen
        // syncronously. Doing in above if can result in a race
        // condition where a reflow occurs before setting completes.
        if (existingProps[0].id < getOldestLoadedProposal(p)) {
          return p.concat(existingProps)
        }
        return p
      })
    }
  }, [existingProps, setPropList])

  // Update the proposals in our list that need updating
  const [needUpdating, setNeedsUpdating] = useRecoilState(
    proposalsUpdated(contractAddress)
  )
  const updatedProposals = useRecoilValue(
    waitForAll(
      needUpdating.map((proposalId) =>
        proposalSelector({
          contractAddress: proposalModuleAddress,
          params: [{ proposalId }],
        })
      )
    )
  )

  if (updatedProposals.length) {
    updatedProposals.sort((l, r) => l?.id ?? 0 - (r?.id ?? 0)).reverse()

    setPropList((p) =>
      p.map((item) => {
        if (item?.id == updatedProposals[0]?.id) {
          return updatedProposals[0]
        }
        return item
      })
    )
  }

  useEffect(() => setNeedsUpdating([]), [setNeedsUpdating])

  if (!propList.length || !proposalCount) {
    return <p className="body-text">No proposals found.</p>
  }

  const showLoadMore = propList.length < proposalCount

  return (
    <div>
      <ul>
        {propList.map((proposal) => (
          <ProposalLine
            key={`prop_${proposal.id}`}
            proposalResponse={proposal}
            proposalViewUrl={`/org/${contractAddress}/proposals/${proposal.id}`}
          />
        ))}
      </ul>
      {showLoadMore && (
        <Button
          className="mt-3 font-mono border border-inactive"
          onClick={() => {
            const proposal = propList && propList[propList.length - 1]
            if (proposal) {
              setStartAfter(proposal.id)
            }
          }}
          size="sm"
          variant="secondary"
        >
          Load more <DownloadIcon className="inline ml-1 w-5 h-5" />
        </Button>
      )}
    </div>
  )
}
