import { DownloadIcon } from '@heroicons/react/outline'
import { FC, useEffect } from 'react'
import { useRecoilState, useRecoilValue, waitForAll } from 'recoil'

import { ProposalResponse } from '@dao-dao/types/contracts/cw3-dao'
import { ProposalLine, Button } from '@dao-dao/ui'

import {
  proposalListAtom,
  proposalsCreatedAtom,
  proposalsRequestStartBeforeAtom,
  proposalsUpdated,
} from 'atoms/proposals'
import { proposalCount } from 'selectors/daos'
import { proposalsSelector, proposalSelector } from 'selectors/proposals'

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
  multisig?: boolean
}

export const ProposalList: FC<ProposalListProps> = ({
  contractAddress,
  multisig,
}) => {
  // Our position in the DAO's list of proposals.
  const [startBefore, setStartBefore] = useRecoilState(
    proposalsRequestStartBeforeAtom
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
    proposalsSelector({
      contractAddress,
      startBefore: getNewestLoadedProposal(propList) + propsCreated + 1,
      limit: propsCreated,
    })
  )

  useEffect(() => {
    setPropList((p) => {
      // Need to check this condition here instead of outside as
      // `setPropsCreated` will race against the next reflow of this
      // page which may cause a duplicate to be appended.
      if (getOldestLoadedProposal(newProps) > getNewestLoadedProposal(p)) {
        return newProps.concat(p)
      }
      return p
    })
    // We've now handled all the newly created proposals.
    setPropsCreated(0)
  }, [setPropList, setPropsCreated, newProps])

  // Update the proposal list with any proposals that have been
  // requested by a load more press or first load of this page.
  const existingProps = useRecoilValue(
    proposalsSelector({
      contractAddress,
      startBefore,
      limit: PROP_LOAD_LIMIT,
    })
  )

  useEffect(() => {
    // We query proposals in reverse showing the most recent (highest
    // ID) ones first. If a new query starts with a proposal with an ID
    // that is smaller than the smallest one that we have seen we can
    // safely add the new proposals to our list without worrying about
    // duplicates.
    if (existingProps.length) {
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
        proposalSelector({ contractAddress, proposalId })
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

  const proposalsTotal = useRecoilValue(proposalCount(contractAddress))
  const showLoadMore = propList.length < proposalsTotal

  if (!propList.length) {
    return <p className="body-text">no proposals</p>
  }

  return (
    <div>
      <ul>
        {propList.map((proposal) => {
          const key = `prop_${proposal.id}`
          return (
            <ProposalLine
              key={key}
              proposal={proposal}
              proposalViewUrl={`/${
                multisig ? 'multisig' : 'dao'
              }/${contractAddress}/proposals/${proposal.id}`}
            />
          )
        })}
      </ul>
      {showLoadMore && (
        <Button
          className="mt-3 font-mono border border-inactive"
          onClick={() => {
            const proposal = propList && propList[propList.length - 1]
            if (proposal) {
              setStartBefore(proposal.id)
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
