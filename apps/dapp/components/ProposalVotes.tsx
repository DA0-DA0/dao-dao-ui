import { FC, useEffect, useState } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'

import {
  CwProposalSingleSelectors,
  refreshProposalIdAtom,
  useProposalInfo,
} from '@dao-dao/state'
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
    CwProposalSingleSelectors.listVotesSelector({
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

  // When proposal updates, reset loaded votes back to initial.
  const refreshProposalId = useRecoilValue(
    refreshProposalIdAtom({
      address: proposalModuleAddress ?? '',
      proposalId,
    })
  )
  useEffect(() => {
    setVotes(initalVotes ?? [])
    // Don't update every time initialVotes changes. Only refresh ID.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshProposalId])

  const loadMoreVotes = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        setVotesLoading(true)
        try {
          const startAfter = votes[votes.length - 1].voter
          const newVotes =
            (
              await snapshot.getPromise(
                CwProposalSingleSelectors.listVotesSelector({
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
