import { useRecoilValue } from 'recoil'

import { CwProposalSingleSelectors } from '@dao-dao/state'
import { Status } from '@dao-dao/state/clients/cw-proposal-single'
import { convertMicroDenomToDenomWithDecimals } from '@dao-dao/utils'

import { useProposalModuleAdapterOptions } from '../../../react/context'
import { BaseProposalVoteTallyProps } from '../../../types'
import { useProposalProcessedTQ } from '../hooks'
import { ProposalVoteTally as StatelessProposalVoteTally } from './ui/ProposalVoteTally'

export const ProposalVoteTally = ({
  voteConversionDecimals,
}: BaseProposalVoteTallyProps) => {
  const {
    proposalModule: { address: proposalModuleAddress },
    proposalNumber,
  } = useProposalModuleAdapterOptions()

  const { proposal } = useRecoilValue(
    CwProposalSingleSelectors.proposalSelector({
      contractAddress: proposalModuleAddress,
      params: [
        {
          proposalId: proposalNumber,
        },
      ],
    })
  )

  const yesVotes = Number(
    convertMicroDenomToDenomWithDecimals(
      proposal.votes.yes,
      voteConversionDecimals
    )
  )
  const noVotes = Number(
    convertMicroDenomToDenomWithDecimals(
      proposal.votes.no,
      voteConversionDecimals
    )
  )
  const abstainVotes = Number(
    convertMicroDenomToDenomWithDecimals(
      proposal.votes.abstain,
      voteConversionDecimals
    )
  )

  const totalVotingPower = Number(
    convertMicroDenomToDenomWithDecimals(
      proposal.total_power,
      voteConversionDecimals
    )
  )

  const { threshold, quorum } = useProposalProcessedTQ()

  return (
    <StatelessProposalVoteTally
      abstainVotes={abstainVotes}
      noVotes={noVotes}
      open={proposal.status === Status.Open}
      quorum={quorum}
      threshold={threshold}
      totalVotingPower={totalVotingPower}
      yesVotes={yesVotes}
    />
  )
}
