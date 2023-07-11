import {
  ArrowOutwardRounded,
  HourglassTopRounded,
  RotateRightOutlined,
  TimelapseRounded,
  TimerRounded,
} from '@mui/icons-material'
import { ProposalStatus } from 'cosmjs-types/cosmos/gov/v1beta1/gov'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'
import TimeAgo from 'react-timeago'

import {
  Coin,
  GovProposalWithDecodedContent,
  GovernanceProposalType,
  StatefulPayEntityDisplayProps,
  StatefulTokenAmountDisplayProps,
} from '@dao-dao/types'
import {
  CHAIN_GOV_PROPOSAL_URL_TEMPLATE,
  formatDateTimeTz,
} from '@dao-dao/utils'

import { useTranslatedTimeDeltaFormatter } from '../../hooks'
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
  content: GovProposalWithDecodedContent['decodedContent']
  deposit: Coin[]
  startDate?: Date
  // End of deposit period or voting period, depending on status.
  endDate?: Date

  TokenAmountDisplay: ComponentType<StatefulTokenAmountDisplayProps>
  // Needed to display CommunityPoolSpendProposal types.
  PayEntityDisplay?: ComponentType<StatefulPayEntityDisplayProps>
}

export const GovernanceProposal = ({
  id,
  status,
  content,
  deposit,
  startDate,
  endDate,
  TokenAmountDisplay,
  PayEntityDisplay,
}: GovernanceProposalProps) => {
  const { t } = useTranslation()
  const timeAgoFormatter = useTranslatedTimeDeltaFormatter({ words: false })

  const title =
    'title' in content.value && typeof content.value.title === 'string'
      ? content.value.title
      : t('title.noTitle')
  const description =
    'description' in content.value &&
    typeof content.value.description === 'string'
      ? content.value.description
      : undefined

  const info = [
    ...(status
      ? ([
          {
            Icon: RotateRightOutlined,
            label: t('title.status'),
            Value: (props) => (
              <p {...props}>{t(PROPOSAL_STATUS_I18N_KEY_MAP[status])}</p>
            ),
          },
        ] as ProposalStatusAndInfoProps['info'])
      : []),
    ...(startDate
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
    ...(endDate
      ? status === ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD ||
        status === ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD
        ? ([
            {
              Icon: HourglassTopRounded,
              label: t('title.timeLeft'),
              Value: (props) => (
                <Tooltip title={endDate}>
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
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <p className="header-text">
          {id ? `${id} ` : ''}
          {title}
        </p>

        {id && (
          <IconButtonLink
            Icon={ArrowOutwardRounded}
            href={CHAIN_GOV_PROPOSAL_URL_TEMPLATE.replace('ID', id)}
            variant="ghost"
          />
        )}
      </div>

      {info.length > 0 && (
        <ProposalStatusAndInfo className="max-w-max" info={info} inline />
      )}

      {!!description && (
        <MarkdownRenderer
          className="styled-scrollbar -mr-4 max-h-[40vh] overflow-y-auto pr-4"
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

      {PayEntityDisplay &&
        !!content &&
        content.typeUrl ===
          GovernanceProposalType.CommunityPoolSpendProposal && (
          <div className="space-y-3">
            <p className="text-text-tertiary">
              {t('govProposalType.CommunityPoolSpendProposal')}
            </p>

            <PayEntityDisplay
              coins={content.value.amount}
              recipient={content.value.recipient}
            />
          </div>
        )}
    </div>
  )
}

const PROPOSAL_STATUS_I18N_KEY_MAP: Record<ProposalStatus | 'pending', string> =
  {
    [ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED]:
      'govProposalStatus.unspecified',
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
