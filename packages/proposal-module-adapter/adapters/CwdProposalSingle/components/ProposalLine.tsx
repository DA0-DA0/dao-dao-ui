import { useRecoilValue } from 'recoil'

import {
  blockHeightSelector,
  blocksPerYearSelector,
  contractVersionSelector,
  useCachedLoadable,
} from '@dao-dao/state'
import { Status } from '@dao-dao/tstypes/contracts/CwdProposalSingle.common'
import { ProposalLine as StatelessProposalLine } from '@dao-dao/ui'
import {
  convertExpirationToDate,
  dateToWdhms,
  formatDate,
} from '@dao-dao/utils'

import { useProposalModuleAdapterOptions } from '../../../react'
import { BaseProposalLineProps } from '../../../types'
import { useProposal, useWalletVoteInfo } from '../hooks'
import { ProposalStatus } from './ProposalStatus'
import { ProposalWalletVote } from './ProposalWalletVote'

export const ProposalLine = ({ href }: BaseProposalLineProps) => {
  const {
    proposalModule: { address: proposalModuleAddress, prefix: proposalPrefix },
    proposalNumber,
  } = useProposalModuleAdapterOptions()

  const proposalModuleVersion = useRecoilValue(
    contractVersionSelector({ contractAddress: proposalModuleAddress })
  )
  const proposal = useProposal()

  const { canVote, vote } = useWalletVoteInfo()

  const blocksPerYear = useRecoilValue(blocksPerYearSelector({}))
  const blockHeightLoadable = useCachedLoadable(blockHeightSelector({}))
  const expirationDate = convertExpirationToDate(
    blocksPerYear,
    proposal.expiration,
    blockHeightLoadable.state === 'hasValue' ? blockHeightLoadable.contents : 0
  )
  const lastUpdated = new Date(Number(proposal.last_updated) / 1000000)

  return (
    <StatelessProposalLine
      Status={({ dimmed }) => (
        <ProposalStatus dimmed={dimmed} status={proposal.status} />
      )}
      expiration={
        (proposal.status === Status.Open
          ? expirationDate && dateToWdhms(expirationDate)
          : expirationDate && formatDate(expirationDate)) || ''
      }
      href={href}
      lastUpdated={lastUpdated}
      proposalModuleVersion={proposalModuleVersion}
      proposalNumber={proposalNumber}
      proposalPrefix={proposalPrefix}
      title={proposal.title}
      // Even if no vote, display pending if can vote. If can't vote and didn't
      // vote, show nothing.
      vote={
        (vote || canVote) && (
          <ProposalWalletVote fallback="pending" vote={vote} />
        )
      }
      votingOpen={proposal.status === Status.Open}
    />
  )
}
