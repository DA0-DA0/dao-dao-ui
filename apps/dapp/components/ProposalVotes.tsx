import { FC, useState } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'

import { ProposalVotes as StatelessProposalVotes } from '@dao-dao/ui'

import { proposalVotesSelector, proposalSelector } from '@/selectors/proposals'

export interface ProposalVotesProps {
  contractAddress: string
  proposalId: number
}

export const ProposalVotes: FC<ProposalVotesProps> = ({
  contractAddress,
  proposalId,
}) => {
  const proposal = useRecoilValue(
    proposalSelector({ contractAddress, proposalId })
  )!

  // All the threshold variants have a total_weight key so we just index into
  // whatever this is and get that.
  const totalPower = Number(
    (
      (proposal.threshold as any)[
        Object.keys(proposal.threshold)[0] as string
      ] as any
    ).total_weight
  )

  const initalVotes = useRecoilValue(
    proposalVotesSelector({ contractAddress, proposalId })
  ).map(({ vote, voter, weight }) => ({
    vote,
    voter,
    weight: (Number(weight) / totalPower) * 100,
  }))

  const [votes, setVotes] = useState(initalVotes)
  const [votesLoading, setVotesLoading] = useState(false)
  // We ask for 30 votes when we query. If we get that many back it
  // suggests we can attempt anoher load.
  const [canLoadMore, setCanLoadMore] = useState(votes.length === 30)

  const loadMoreVotes = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        setVotesLoading(true)
        const startAfter = votes[votes.length - 1].voter
        const newVotes = (
          await snapshot.getPromise(
            proposalVotesSelector({ contractAddress, proposalId, startAfter })
          )
        ).map(({ vote, voter, weight }) => ({
          vote,
          voter,
          weight: (Number(weight) / totalPower) * 100,
        }))
        setCanLoadMore(newVotes.length === 30)
        setVotes((votes) => [...votes, ...newVotes])
        setVotesLoading(false)
      },
    [votes, setVotes, proposalId, contractAddress, setVotesLoading]
  )

  return (
    <div className="mx-6 mt-11">
      <StatelessProposalVotes
        canLoadMore={canLoadMore}
        loadingMore={votesLoading}
        onLoadMore={() => loadMoreVotes()}
        votes={votes}
      />
    </div>
  )
}
