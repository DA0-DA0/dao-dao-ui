import { useEffect, useState } from 'react'

import { useRecoilValue, useRecoilValueLoadable } from 'recoil'

import { CopyToClipboard } from '@components/CopyToClipboard'
import { VoteInfo } from '@dao-dao/types/contracts/cw3-dao'
import { DownloadIcon } from '@heroicons/react/outline'
import {
  proposalTallySelector,
  proposalVotesSelector,
} from 'selectors/proposals'

export function PaginatedProposalVotes({
  contractAddress,
  proposalId,
}: {
  contractAddress: string
  proposalId: number
}) {
  const [firstLoadedVoter, setFirstLoadedVoter] = useState<undefined | string>(
    undefined
  )
  const [votes, setVotes] = useState<VoteInfo[]>([])

  const newVotes = useRecoilValueLoadable(
    proposalVotesSelector({
      contractAddress,
      proposalId,
      startAfter: firstLoadedVoter,
    })
  )
  const voteTally = useRecoilValue(
    proposalTallySelector({ contractAddress, proposalId })
  )
  const totalVotes = voteTally.total_votes
  const showLoadMore =
    votes.reduce((sum, vote) => sum + Number(vote.weight), 0) <
    Number(totalVotes)

  useEffect(() => {
    const value = newVotes.valueMaybe()
    if (value && !votes.some((v) => v.voter === value[0].voter)) {
      setVotes((v) => v.concat(value))
    }
  }, [newVotes, votes])

  return (
    <>
      <h3 className="font-medium text-xl my-5">Votes</h3>
      <div className="overflow-x-auto">
        <div className="grid grid-cols-3 text-sm text-secondary mb-2">
          <p>Voter</p>
          <p>Weight</p>
          <p>Vote</p>
        </div>
        <ul className="list-none">
          {votes.map((vote, idx) => {
            return (
              <li className="grid grid-cols-3 items-center" key={idx}>
                <CopyToClipboard value={vote.voter} />
                <span className="font-mono text-sm">{vote.weight}</span>
                <span>{vote.vote}</span>
              </li>
            )
          })}
        </ul>
        {showLoadMore && (
          <button
            className="btn btn-sm btn-outline border-base-300 normal-case text-left text-sm font-mono mt-5 text-sm"
            onClick={() => {
              setFirstLoadedVoter(votes[votes.length - 1]?.voter)
            }}
          >
            Load more <DownloadIcon className="inline w-5 h-5 ml-1" />
          </button>
        )}
      </div>
    </>
  )
}
