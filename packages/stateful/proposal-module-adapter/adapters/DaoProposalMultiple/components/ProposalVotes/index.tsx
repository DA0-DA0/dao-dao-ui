import {
  ProposalVote,
  ProposalVotes as StatelessProposalVotes,
  useCachedLoadable,
} from '@dao-dao/stateless'

import { EntityDisplay } from '../../../../../components/EntityDisplay'
import { useProposalModuleAdapterOptions } from '../../../../react/context'
import { listAllVotesSelector } from '../../contracts/DaoProposalMultiple.recoil'
import { useLoadingProposal } from '../../hooks'
import { VoteDisplay } from './VoteDisplay'

export const ProposalVotes = () => {
  const {
    proposalModule: { address: proposalModuleAddress },
    proposalNumber,
    chainId,
  } = useProposalModuleAdapterOptions()

  const loadingProposal = useLoadingProposal()

  const totalPower = loadingProposal.loading
    ? 0
    : Number(loadingProposal.data.total_power)
  const votesLoadable = useCachedLoadable(
    listAllVotesSelector({
      contractAddress: proposalModuleAddress,
      chainId,
      proposalId: proposalNumber,
    })
  )

  return (
    <StatelessProposalVotes
      EntityDisplay={EntityDisplay}
      VoteDisplay={VoteDisplay}
      votes={
        votesLoadable.state !== 'hasValue'
          ? { loading: true }
          : {
              loading: false,
              data: votesLoadable.contents.map(
                ({ vote, voter, power, rationale, votedAt }): ProposalVote => ({
                  voterAddress: voter,
                  vote,
                  votingPowerPercent:
                    totalPower === 0 ? 0 : (Number(power) / totalPower) * 100,
                  rationale,
                  votedAt: votedAt ? new Date(votedAt) : undefined,
                })
              ),
            }
      }
      votingOpen={!loadingProposal.loading && loadingProposal.data.votingOpen}
    />
  )
}
