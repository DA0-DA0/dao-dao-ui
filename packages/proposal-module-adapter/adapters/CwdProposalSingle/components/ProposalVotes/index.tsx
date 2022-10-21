import { useEffect, useState } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'

import { ProfileDisplay } from '@dao-dao/common'
import { refreshProposalIdAtom, useProposalVotesQuery } from '@dao-dao/state'
import {
  ProposalVote,
  ProposalVotes as StatelessProposalVotes,
} from '@dao-dao/stateless'

import { useProposalModuleAdapterOptions } from '../../../../react/context'
import { listVotesSelector } from '../../contracts/CwdProposalSingle.common.recoil'
import { useProposal } from '../../hooks'
import { VoteDisplay } from './VoteDisplay'

const VOTE_LIMIT = 30

export const ProposalVotes = () => {
  const {
    proposalModule: { address: proposalModuleAddress },
    proposalNumber,
  } = useProposalModuleAdapterOptions()

  const proposal = useProposal()

  // Get proposal vote timestamps from subquery.
  const proposalVotesSubquery = useProposalVotesQuery(
    proposalModuleAddress,
    proposalNumber
  )

  const totalPower = Number(proposal.total_power)

  const [votes, setVotes] = useState<ProposalVote[]>([])
  const [loading, setLoading] = useState(false)
  const [canLoadMore, setCanLoadMore] = useState(true)
  const loadMore = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        setLoading(true)
        try {
          const newVotes = (
            await snapshot.getPromise(
              listVotesSelector({
                contractAddress: proposalModuleAddress,
                params: [
                  {
                    proposalId: proposalNumber,
                    startAfter: votes[votes.length - 1]?.voterAddress,
                    limit: VOTE_LIMIT,
                  },
                ],
              })
            )
          )?.votes

          // If we loaded the max we asked for, there may be more in another
          // query.
          setCanLoadMore(newVotes.length === 30)

          setVotes((votes) => [
            ...votes,
            ...newVotes.map(
              ({ vote, voter, power }): ProposalVote => ({
                voterAddress: voter,
                vote,
                votingPowerPercent: (Number(power) / totalPower) * 100,
              })
            ),
          ])
        } finally {
          setLoading(false)
        }
      },
    [
      votes,
      setVotes,
      proposalModuleAddress,
      proposalNumber,
      setLoading,
      totalPower,
    ]
  )

  // When proposal updates, reset loaded votes back to initial.
  const refreshProposalId = useRecoilValue(
    refreshProposalIdAtom({
      address: proposalModuleAddress,
      proposalId: proposalNumber,
    })
  )

  // Load more on mount and when refresh ID changes.
  useEffect(() => {
    setVotes([])
    loadMore()
    // Only execute when refresh ID changes, not instance of loadMore function.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshProposalId])

  return (
    <StatelessProposalVotes
      ProfileDisplay={ProfileDisplay}
      VoteDisplay={VoteDisplay}
      canLoadMore={canLoadMore}
      getDateVoted={
        proposalVotesSubquery.loading || !proposalVotesSubquery.data?.proposal
          ? undefined
          : (voterAddress) => {
              const votedAt =
                proposalVotesSubquery.data?.proposal?.votes.nodes.find(
                  ({ walletId }) => walletId === voterAddress
                )?.votedAt
              return votedAt
                ? // Interpret as UTC.
                  new Date(votedAt + 'Z')
                : undefined
            }
      }
      // Only return dates once subquery data has loaded.
      loadMore={loadMore}
      loadingMore={loading}
      votes={votes}
    />
  )
}
