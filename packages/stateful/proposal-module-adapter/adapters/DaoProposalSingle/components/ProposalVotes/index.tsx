import { useCallback } from 'react'
import { useSetRecoilState } from 'recoil'

import { refreshProposalVotesAtom, useProposalVotesQuery } from '@dao-dao/state'
import {
  ProposalVote,
  ProposalVotes as StatelessProposalVotes,
  useCachedLoadable,
} from '@dao-dao/stateless'
import { Status } from '@dao-dao/types/contracts/DaoProposalSingle.common'

import { ProfileDisplay } from '../../../../../components/ProfileDisplay'
import { useProposalModuleAdapterOptions } from '../../../../react/context'
import { listAllVotesSelector } from '../../contracts/DaoProposalSingle.common.recoil'
import { useProposal } from '../../hooks'
import { VoteDisplay } from './VoteDisplay'

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
  const votesLoadable = useCachedLoadable(
    listAllVotesSelector({
      contractAddress: proposalModuleAddress,
      proposalId: proposalNumber,
    })
  )
  const refreshProposalVotes = useSetRecoilState(
    refreshProposalVotesAtom({
      address: proposalModuleAddress,
      proposalId: proposalNumber,
    })
  )
  const onRefresh = useCallback(
    () => refreshProposalVotes((id) => id + 1),
    [refreshProposalVotes]
  )

  return (
    <StatelessProposalVotes
      ProfileDisplay={ProfileDisplay}
      VoteDisplay={VoteDisplay}
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
      onRefresh={onRefresh}
      refreshing={votesLoadable.state !== 'hasValue' || votesLoadable.updating}
      votes={
        votesLoadable.state !== 'hasValue'
          ? { loading: true }
          : {
              loading: false,
              data: votesLoadable.contents.map(
                ({ vote, voter, power }): ProposalVote => ({
                  voterAddress: voter,
                  vote,
                  votingPowerPercent: (Number(power) / totalPower) * 100,
                })
              ),
            }
      }
      votingOpen={proposal.status === Status.Open}
    />
  )
}
