import {
  CheckCircle,
  Error,
  PaidOutlined,
  RemoveCircle,
  Timelapse,
} from '@mui/icons-material'
import clsx from 'clsx'
import { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'

import { ProposalStatus } from '@dao-dao/protobuf/codegen/cosmos/gov/v1beta1/gov'
import { StatusDisplay } from '@dao-dao/stateless'

export interface GovProposalStatusProps {
  status: ProposalStatus
  // Dim
  dimmed?: boolean
}

export const GovProposalStatus = ({
  status,
  dimmed = false,
}: GovProposalStatusProps) => {
  const { t } = useTranslation()
  const { Icon, i18nKey, iconClassName, textClassName } =
    GovProposalStatusMap[status]

  return (
    <StatusDisplay
      icon={
        <Icon
          className={clsx(
            '!h-5 !w-5 shrink-0',
            dimmed ? 'text-icon-tertiary' : iconClassName
          )}
        />
      }
      label={
        <p
          className={clsx(
            'shrink-0 truncate leading-5',
            dimmed ? 'text-text-tertiary' : textClassName
          )}
        >
          {t(`govProposalStatusTitleShort.${i18nKey}`)}
        </p>
      }
    />
  )
}

export const GovProposalStatusMap: Record<
  ProposalStatus,
  {
    Icon: (props: { className: string }) => ReactElement
    i18nKey: string
    iconClassName: string
    textClassName: string
  }
> = {
  [ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD]: {
    Icon: PaidOutlined,
    i18nKey: 'deposit',
    iconClassName: 'text-icon-primary',
    textClassName: 'text-text-body',
  },
  [ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD]: {
    Icon: Timelapse,
    i18nKey: 'voting',
    iconClassName: 'text-icon-primary',
    textClassName: 'text-text-body',
  },
  [ProposalStatus.PROPOSAL_STATUS_REJECTED]: {
    Icon: RemoveCircle,
    i18nKey: 'rejected',
    iconClassName: 'text-icon-interactive-error',
    textClassName: 'text-text-interactive-error',
  },
  [ProposalStatus.PROPOSAL_STATUS_PASSED]: {
    Icon: CheckCircle,
    i18nKey: 'passed',
    iconClassName: 'text-icon-interactive-valid',
    textClassName: 'text-text-interactive-valid',
  },
  [ProposalStatus.PROPOSAL_STATUS_FAILED]: {
    Icon: Error,
    i18nKey: 'failed',
    iconClassName: 'text-icon-interactive-error',
    textClassName: 'text-text-interactive-error',
  },
  [ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED]: {
    Icon: Error,
    i18nKey: 'unspecified',
    iconClassName: 'text-icon-interactive-error',
    textClassName: 'text-text-interactive-error',
  },
  [ProposalStatus.UNRECOGNIZED]: {
    Icon: Error,
    i18nKey: 'unrecognized',
    iconClassName: 'text-icon-interactive-error',
    textClassName: 'text-text-interactive-error',
  },
}
