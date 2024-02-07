import { PendingOutlined, ThumbDown, ThumbUp } from '@mui/icons-material'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { StatusDisplay, StatusDisplayProps } from '@dao-dao/stateless'
import {
  ProposalStatus,
  ProposalStatusKey,
} from '@dao-dao/types/contracts/DaoPreProposeApprovalSingle'
import { keyFromPreProposeStatus } from '@dao-dao/utils'

export type PreProposeApprovalProposalStatusProps = {
  status: ProposalStatus
} & Omit<
  StatusDisplayProps,
  'Icon' | 'iconClassName' | 'label' | 'labelClassName'
>

export const PreProposeApprovalProposalStatus = ({
  status,
  ...props
}: PreProposeApprovalProposalStatusProps) => {
  const { t } = useTranslation()
  const { labelI18nKey, Icon, iconClassName, textClassName } =
    PreProposeApprovalProposalStatusMap[keyFromPreProposeStatus(status)]

  return (
    <StatusDisplay
      {...props}
      Icon={Icon}
      iconClassName={iconClassName}
      label={t(labelI18nKey)}
      labelClassName={textClassName}
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
