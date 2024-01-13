import { PendingOutlined, ThumbDown, ThumbUp } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { StatusDisplay } from '@dao-dao/stateless'
import {
  ProposalStatus,
  ProposalStatusKey,
} from '@dao-dao/types/contracts/DaoPreProposeApprovalSingle'
import { keyFromPreProposeStatus } from '@dao-dao/utils'

export type PreProposeApprovalProposalStatusProps = {
  status: ProposalStatus
  // Dim
  dimmed?: boolean
}

export const PreProposeApprovalProposalStatus = ({
  status,
  dimmed = false,
}: PreProposeApprovalProposalStatusProps) => {
  const { t } = useTranslation()
  const { labelI18nKey, Icon, iconClassName, textClassName } =
    PreProposeApprovalProposalStatusMap[keyFromPreProposeStatus(status)]

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
          {t(labelI18nKey)}
        </p>
      }
    />
  )
}

export const PreProposeApprovalProposalStatusMap: Record<
  ProposalStatusKey,
  {
    labelI18nKey: string
    Icon: ComponentType<{ className: string }>
    iconClassName: string
    textClassName: string
  }
> = {
  pending: {
    labelI18nKey: 'title.pending',
    Icon: PendingOutlined,
    iconClassName: 'text-icon-primary',
    textClassName: 'text-text-body',
  },
  approved: {
    labelI18nKey: 'title.accepted',
    Icon: ThumbUp,
    iconClassName: 'text-icon-interactive-valid',
    textClassName: 'text-text-interactive-valid',
  },
  rejected: {
    labelI18nKey: 'title.denied',
    Icon: ThumbDown,
    iconClassName: 'text-icon-interactive-error',
    textClassName: 'text-text-interactive-error',
  },
}
