import { useRecoilValue } from 'recoil'

import {
  CwProposalSingleSelectors,
  contractVersionSelector,
} from '@dao-dao/state'
import { Status } from '@dao-dao/state/clients/cw-proposal-single'
import { ProposalLine as StatelessProposalLine } from '@dao-dao/ui'
import { convertExpirationToDate, dateToWdhms } from '@dao-dao/utils'

import { useProposalModuleAdapterOptions } from '../../../react'
import { BaseProposalLineProps } from '../../../types'
import { useWalletVoteInfo } from '../hooks'
import { ProposalStatus } from './ProposalStatus'
import { ProposalWalletVote } from './ProposalWalletVote'

export const ProposalLine = ({ href }: BaseProposalLineProps) => {
  const {
    proposalModule: { address: proposalModuleAddress, prefix: proposalPrefix },
    proposalNumber,
  } = useProposalModuleAdapterOptions()

  const proposalModuleVersion = useRecoilValue(
    contractVersionSelector(proposalModuleAddress)
  )
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

  const { canVote, vote } = useWalletVoteInfo()

  const expirationDate = convertExpirationToDate(proposal.expiration)
  const lastUpdated = new Date(Number(proposal.last_updated) / 1000000)

  return (
    <StatelessProposalLine
      expiration={
        proposal.status === Status.Open && expirationDate
          ? dateToWdhms(expirationDate)
          : ''
      }
      href={href}
      lastUpdated={lastUpdated}
      proposalModuleVersion={proposalModuleVersion}
      proposalNumber={proposalNumber}
      proposalPrefix={proposalPrefix}
      status={<ProposalStatus status={proposal.status} />}
      title={proposal.title}
      // Even if no vote, display pending if can vote. If can't vote and didn't
      // vote, show nothing.
      vote={
        (vote || canVote) && (
          <ProposalWalletVote fallback="pending" vote={vote} />
        )
      }
    />
  )
}
