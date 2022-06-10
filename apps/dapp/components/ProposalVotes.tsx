import { FC, useState } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'

import { useProposalInfo } from '@dao-dao/state'
import { listVotesSelector } from '@dao-dao/state/recoil/selectors/clients/cw-proposal-single'
import { ProposalVotes as StatelessProposalVotes } from '@dao-dao/ui'

export interface ProposalVotesProps {
  coreAddress: string
  proposalId: number
}

const VOTE_LIMIT = 30

export const ProposalVotes: FC<ProposalVotesProps> = ({
  coreAddress,
  proposalId,
}) => {
  const { proposalResponse: { proposal } = {}, proposalModuleAddress } =
    useProposalInfo(coreAddress, proposalId)

  if (!proposal || !proposalModuleAddress) {
    throw new Error('Failed to load data.')
  }

  const totalPower = Number(proposal.total_power)

  const initalVotes = useRecoilValue(
    listVotesSelector({
      contractAddress: proposalModuleAddress,
      params: [
        {
          proposalId,
          limit: VOTE_LIMIT,
        },
      ],
    })
  )?.votes.map(({ vote, voter, power }) => ({
    vote,
    voter,
    weight: (Number(power) / totalPower) * 100,
  }))

  const [votes, setVotes] = useState(initalVotes ?? [])
  const [votesLoading, setVotesLoading] = useState(false)
  // We ask for 30 votes when we query. If we get that many back it
  // suggests we can attempt anoher load.
  const [canLoadMore, setCanLoadMore] = useState(votes.length === 30)

  const loadMoreVotes = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        setVotesLoading(true)
        try {
          const startAfter = votes[votes.length - 1].voter
          const newVotes =
            (
              await snapshot.getPromise(
                listVotesSelector({
                  contractAddress: proposalModuleAddress,
                  params: [
                    {
                      proposalId,
                      startAfter,
                      limit: VOTE_LIMIT,
                    },
                  ],
                })
              )
            )?.votes.map(({ vote, voter, power }) => ({
              vote,
              voter,
              weight: (Number(power) / totalPower) * 100,
            })) ?? []

          setCanLoadMore(newVotes.length === 30)
          setVotes((votes) => [...votes, ...newVotes])
        } finally {
          setVotesLoading(false)
        }
      },
    [votes, setVotes, proposalId, coreAddress, setVotesLoading]
  )

  return (
    <StatelessProposalVotes
      canLoadMore={canLoadMore}
      loadingMore={votesLoading}
      onLoadMore={() => loadMoreVotes()}
      votes={votes}
    />
  )
}
