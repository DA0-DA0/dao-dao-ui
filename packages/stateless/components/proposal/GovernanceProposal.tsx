import {
  ArrowOutwardRounded,
  HourglassTopRounded,
  RotateRightOutlined,
  TimelapseRounded,
  TimerRounded,
} from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'
import TimeAgo from 'react-timeago'

import {
  Coin,
  GovProposalActionDisplayProps,
  GovProposalDecodedContent,
  GovProposalWithDecodedContent,
  StatefulTokenAmountDisplayProps,
} from '@dao-dao/types'
import { formatDateTimeTz, govProposalToDecodedContent } from '@dao-dao/utils'
import { ProposalStatus } from '@dao-dao/utils/protobuf/codegen/cosmos/gov/v1beta1/gov'

import { useChainContext, useTranslatedTimeDeltaFormatter } from '../../hooks'
import { IconButtonLink } from '../icon_buttons'
import { MarkdownRenderer } from '../MarkdownRenderer'
import { Tooltip } from '../tooltip'
import {
  ProposalStatusAndInfo,
  ProposalStatusAndInfoProps,
} from './ProposalStatusAndInfo'

export type GovernanceProposalProps = {
  // Defined if created. Adds external link to proposal and displays ID.
  id?: string
  status?: ProposalStatus | 'pending'
  content: GovProposalDecodedContent
  deposit: Coin[]
  startDate?: Date
  // End of deposit period or voting period, depending on status.
  endDate?: Date
  className?: string

  TokenAmountDisplay: ComponentType<StatefulTokenAmountDisplayProps>
  GovProposalActionDisplay: ComponentType<GovProposalActionDisplayProps>
}

export const GovernanceProposal = ({
  id,
  status,
  content,
  deposit,
  startDate,
  endDate,
  className,
  TokenAmountDisplay,
  GovProposalActionDisplay,
}: GovernanceProposalProps) => {
  const { t } = useTranslation()
  const timeAgoFormatter = useTranslatedTimeDeltaFormatter({ words: false })
  const { config } = useChainContext()

  const title = content.title || t('title.noTitle')
  const description = content.description || undefined

  const info = [
    ...(status
      ? ([
          {
            Icon: RotateRightOutlined,
            label: t('title.status'),
            Value: (props) => (
              <p {...props}>{t(GOV_PROPOSAL_STATUS_I18N_KEY_MAP[status])}</p>
            ),
          },
        ] as ProposalStatusAndInfoProps['info'])
      : []),
    ...(startDate && status !== ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD
      ? ([
          {
            Icon: TimelapseRounded,
            label: t('title.votingOpened'),
            Value: (props) => (
              <p {...props}>
                {typeof startDate === 'string'
                  ? startDate
                  : formatDateTimeTz(startDate)}
              </p>
            ),
          },
        ] as ProposalStatusAndInfoProps['info'])
      : []),
    // If open for voting, show relative time until end.
    ...(endDate && status !== ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD
      ? status === ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD
        ? ([
            {
              Icon: HourglassTopRounded,
              label: t('title.timeLeft'),
              Value: (props) => (
                <Tooltip title={formatDateTimeTz(endDate)}>
                  <p {...props}>
                    <TimeAgo date={endDate} formatter={timeAgoFormatter} />
                  </p>
                </Tooltip>
              ),
            },
          ] as ProposalStatusAndInfoProps['info'])
        : // If closed, show end date.
          ([
            {
              Icon: TimerRounded,
              label: t('title.votingClosed'),
              Value: (props) => <p {...props}>{formatDateTimeTz(endDate)}</p>,
            },
          ] as ProposalStatusAndInfoProps['info'])
      : []),
  ]

  return (
    <div className={clsx('flex flex-col gap-6', className)}>
      <div className="flex flex-row items-center gap-4">
        <p className="header-text">
          {id ? `${id} ` : ''}
          {title}
        </p>

        {id && config && (
          <IconButtonLink
            Icon={ArrowOutwardRounded}
            href={config.explorerUrlTemplates.govProp.replace('REPLACE', id)}
            variant="ghost"
          />
        )}
      </div>

      {info.length > 0 && (
        <ProposalStatusAndInfo className="max-w-max" info={info} inline />
      )}

      {!!description && (
        <MarkdownRenderer
          className="styled-scrollbar -mr-4 max-h-[40dvh] overflow-y-auto pr-4"
          markdown={description.replace(/\\n/g, '\n')}
        />
      )}

      {!!deposit.length && (
        <div className="space-y-3">
          <p className="text-text-tertiary">{t('title.deposit')}</p>

          <div className="space-y-2">
            {deposit.map((coin) => (
              <TokenAmountDisplay key={coin.denom} coin={coin} />
            ))}
          </div>
        </div>
      )}

      <GovProposalActionDisplay content={content} hideCopyLink />
    </div>
  )
}

export const GOV_PROPOSAL_STATUS_I18N_KEY_MAP: Record<
  ProposalStatus | 'pending',
  string
> = {
  [ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED]: 'govProposalStatus.unspecified',
  [ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD]:
    'govProposalStatus.depositPeriod',
  [ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD]:
    'govProposalStatus.votingPeriod',
  [ProposalStatus.PROPOSAL_STATUS_PASSED]: 'govProposalStatus.passed',
  [ProposalStatus.PROPOSAL_STATUS_REJECTED]: 'govProposalStatus.rejected',
  [ProposalStatus.PROPOSAL_STATUS_FAILED]: 'govProposalStatus.failed',
  [ProposalStatus.UNRECOGNIZED]: 'govProposalStatus.unrecognized',
  pending: 'govProposalStatus.pendingSubmission',
}

export type GovernanceProposalFromProposalProps = Pick<
  GovernanceProposalProps,
  'GovProposalActionDisplay' | 'TokenAmountDisplay' | 'className'
> & {
  proposal: GovProposalWithDecodedContent
}

export const GovernanceProposalFromProposal = ({
  proposal,
  ...props
}: GovernanceProposalFromProposalProps) => (
  <GovernanceProposal
    content={govProposalToDecodedContent(proposal)}
    deposit={proposal.proposal.totalDeposit}
    endDate={proposal.proposal.votingEndTime}
    id={proposal.id.toString()}
    startDate={proposal.proposal.votingStartTime}
    status={proposal.proposal.status}
    {...props}
  />
)
