import { constSelector, useRecoilValue } from 'recoil'

import {
  CwProposalSingleSelectors,
  contractVersionSelector,
} from '@dao-dao/state'
import { ProposalLine as StatelessProposalLine } from '@dao-dao/ui'
import { ContractVersion } from '@dao-dao/utils'

import { useProposalModuleAdapterOptions } from '../../../react'
import { BaseProposalLineProps } from '../../../types'
import { useProposalExpirationString } from '../hooks'
import { ProposalStatus } from './ProposalStatus'
import { ProposalYourVote } from './ProposalYourVote'

export const ProposalLine = ({ walletAddress }: BaseProposalLineProps) => {
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

  const voteSelector =
    proposalModuleVersion === ContractVersion.V0_1_0
      ? CwProposalSingleSelectors.getVoteV1Selector
      : CwProposalSingleSelectors.getVoteV2Selector
  const walletVote =
    useRecoilValue(
      walletAddress
        ? voteSelector({
            contractAddress: proposalModuleAddress,
            params: [{ proposalId: proposalNumber, voter: walletAddress }],
          })
        : constSelector(undefined)
    )?.vote?.vote ?? undefined

  const expirationString = useProposalExpirationString()
  const lastUpdated = new Date(Number(proposal.last_updated) / 1000000)

  return (
    <StatelessProposalLine
      expiration={expirationString ?? ''}
      lastUpdated={lastUpdated}
      proposalModuleVersion={proposalModuleVersion}
      proposalNumber={proposalNumber}
      proposalPrefix={proposalPrefix}
      status={<ProposalStatus status={proposal.status} />}
      title={proposal.title}
      vote={walletVote && <ProposalYourVote vote={walletVote} />}
    />
  )
}
