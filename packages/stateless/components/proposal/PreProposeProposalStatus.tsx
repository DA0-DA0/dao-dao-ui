import { Pending, ThumbDown, ThumbUp } from '@mui/icons-material'
import clsx from 'clsx'
import { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'

import { StatusDisplay } from '@dao-dao/stateless'
import {
  ProposalStatus,
  ProposalStatusKey,
} from '@dao-dao/types/contracts/DaoPreProposeApprovalSingle'

export type PreProposeProposalStatusProps = {
  status: ProposalStatus
  // Dim
  dimmed?: boolean
}

export const PreProposeProposalStatus = ({
  status,
  dimmed = false,
}: PreProposeProposalStatusProps) => {
  const { t } = useTranslation()
  const { labelI18nKey, Icon, iconClassName, textClassName } =
    ProposalStatusMap[Object.keys(status)[0] as ProposalStatusKey]

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

const ProposalStatusMap: Record<
  ProposalStatusKey,
  {
    labelI18nKey: string
    Icon: (props: { className: string }) => ReactElement
    iconClassName: string
    textClassName: string
  }
> = {
  pending: {
    labelI18nKey: 'title.pending',
    Icon: Pending,
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
