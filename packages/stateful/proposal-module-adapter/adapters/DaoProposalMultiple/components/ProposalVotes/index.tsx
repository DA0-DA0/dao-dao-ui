import { useState } from 'react'

import { DaoProposalMultipleSelectors } from '@dao-dao/state'
import {
  PaginatedProposalVotes,
  ProposalVote,
  useCachedLoadingWithError,
} from '@dao-dao/stateless'

import { EntityDisplay } from '../../../../../components/EntityDisplay'
import { useProposalModuleAdapterOptions } from '../../../../react/context'
import { useLoadingProposal, useLoadingVoteOptions } from '../../hooks'
import { VoteDisplay } from './VoteDisplay'

const VOTES_PER_PAGE = 20

export const ProposalVotes = () => {
  const {
    chain: { chain_id: chainId },
    proposalModule: { address: proposalModuleAddress },
    proposalNumber,
  } = useProposalModuleAdapterOptions()

  const loadingProposal = useLoadingProposal()
  const voteOptions = useLoadingVoteOptions()

  const totalPower = loadingProposal.loading
    ? 0
    : Number(loadingProposal.data.total_power)

  const votes = useCachedLoadingWithError(
    // Don't load votes until proposal is ready so that the `totalPower`
    // calculation in the transformation function works correctly.
    loadingProposal.loading
      ? undefined
      : DaoProposalMultipleSelectors.listAllVotesSelector({
          chainId,
          contractAddress: proposalModuleAddress,
          proposalId: proposalNumber,
        }),
    (data) =>
      data
        .map(
          ({ vote, voter, power, rationale, votedAt }): ProposalVote => ({
            voterAddress: voter,
            vote,
            votingPowerPercent:
              totalPower === 0 ? 0 : (Number(power) / totalPower) * 100,
            rationale,
            votedAt: votedAt ? new Date(votedAt) : undefined,
          })
        )
        // Sort most recent first.
        .sort((a, b) =>
          a.votedAt && b.votedAt
            ? b.votedAt.getTime() - a.votedAt.getTime()
            : a.votedAt
            ? -1
            : b.votedAt
            ? 1
            : 0
        )
  )

  const [page, setPage] = useState(1)

  return (
    <PaginatedProposalVotes
      EntityDisplay={EntityDisplay}
      VoteDisplay={VoteDisplay}
      allVotes={votes}
      exportVoteTransformer={(vote) =>
        voteOptions.loading
          ? 'LOADING_ERROR'
          : voteOptions.data.find(
              (option) => option.value.option_id === vote.option_id
            )?.label || 'UNKNOWN_ERROR'
      }
      pagination={{
        page,
        setPage,
        pageSize: VOTES_PER_PAGE,
        total: votes.loading || votes.errored ? 0 : votes.data.length,
      }}
      votes={
        votes.loading || votes.errored
          ? votes
          : {
              loading: false,
              errored: false,
              updating: votes.updating,
              data: votes.data.slice(
                (page - 1) * VOTES_PER_PAGE,
                page * VOTES_PER_PAGE
              ),
            }
      }
      votingOpen={!loadingProposal.loading && loadingProposal.data.votingOpen}
    />
  )
}
