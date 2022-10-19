import { StopIcon } from '@heroicons/react/outline'
import { Block } from '@mui/icons-material'
import clsx from 'clsx'
import { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'

import { Approved, Executed, Open, Rejected } from '@dao-dao/icons'
import { Status } from '@dao-dao/tstypes/contracts/CwdProposalSingle.common'
import { StatusDisplay } from '@dao-dao/ui'

export interface ProposalStatusProps {
  status: Status
  // Dim
  dimmed?: boolean
}

export const ProposalStatus = ({
  status,
  dimmed = false,
}: ProposalStatusProps) => {
  const { t } = useTranslation()
  const { Icon, iconClassName, textClassName } = ProposalStatusMap[status]

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
            'leading-5 truncate shrink-0',
            dimmed ? 'text-text-tertiary' : textClassName
          )}
        >
          {t(`proposalStatusTitle.${status}`)}
        </p>
      }
    />
  )
}

export const ProposalStatusMap: Record<
  Status,
  {
    Icon: (props: { className: string }) => ReactElement
    iconClassName: string
    textClassName: string
  }
> = {
  [Status.Open]: {
    Icon: Open,
    iconClassName: 'text-icon-primary',
    textClassName: 'text-text-body',
  },
  [Status.Rejected]: {
    Icon: Rejected,
    iconClassName: 'text-icon-interactive-error',
    textClassName: 'text-text-interactive-error',
  },
  [Status.Passed]: {
    Icon: Approved,
    iconClassName: 'text-icon-interactive-valid',
    textClassName: 'text-text-interactive-valid',
  },
  [Status.Executed]: {
    Icon: Executed,
    iconClassName: 'text-icon-secondary',
    textClassName: 'text-text-secondary',
  },
  [Status.ExecutionFailed]: {
    Icon: Block,
    iconClassName: '!text-icon-interactive-error',
    textClassName: '!text-text-interactive-error',
  },
  [Status.Closed]: {
    Icon: StopIcon,
    iconClassName: 'text-icon-tertiary',
    textClassName: 'text-text-tertiary',
  },
}
