import TimeAgo from 'react-timeago'
import { useRecoilValue } from 'recoil'

import { blockHeightSelector, blocksPerYearSelector } from '@dao-dao/state'
import {
  ProposalLine as StatelessProposalLine,
  useCachedLoadable,
} from '@dao-dao/stateless'
import { useTranslatedTimeDeltaFormatter } from '@dao-dao/stateless/hooks'
import { Status } from '@dao-dao/types/contracts/CwdProposalSingle.common'
import { convertExpirationToDate, formatDate } from '@dao-dao/utils'

import { useProposalModuleAdapterOptions } from '../../../../react'
import { BaseProposalLineProps } from '../../../../types'
import { useProposal, useWalletVoteInfo } from '../../hooks'
import { ProposalWalletVote } from '../ProposalWalletVote'
import { ProposalStatus } from './ProposalStatus'

export const ProposalLine = ({ href }: BaseProposalLineProps) => {
  const {
    proposalModule: { prefix: proposalPrefix },
    proposalNumber,
  } = useProposalModuleAdapterOptions()

  const proposal = useProposal()

  const { canVote, vote } = useWalletVoteInfo()

  const blocksPerYear = useRecoilValue(blocksPerYearSelector({}))
  const blockHeightLoadable = useCachedLoadable(blockHeightSelector({}))
  const expirationDate = convertExpirationToDate(
    blocksPerYear,
    proposal.expiration,
    blockHeightLoadable.state === 'hasValue' ? blockHeightLoadable.contents : 0
  )

  const timeAgoFormatter = useTranslatedTimeDeltaFormatter({ suffix: true })

  return (
    <StatelessProposalLine
      Status={({ dimmed }) => (
        <ProposalStatus dimmed={dimmed} status={proposal.status} />
      )}
      expiration={
        (proposal.status === Status.Open
          ? expirationDate && (
              <TimeAgo date={expirationDate} formatter={timeAgoFormatter} />
            )
          : expirationDate && formatDate(expirationDate)) || ''
      }
      href={href}
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
