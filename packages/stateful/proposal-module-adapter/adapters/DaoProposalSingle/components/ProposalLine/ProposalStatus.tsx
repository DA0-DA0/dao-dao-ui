import {
  Block,
  CheckCircle,
  CheckCircleOutline,
  RemoveCircle,
  StopCircleOutlined,
  Timelapse,
} from '@mui/icons-material'
import clsx from 'clsx'
import { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'

import { StatusDisplay } from '@dao-dao/stateless'
import { Status } from '@dao-dao/types/contracts/DaoProposalSingle.common'

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
            'shrink-0 truncate leading-5',
            dimmed ? 'text-text-tertiary' : textClassName
          )}
        >
          {t(`proposalStatusTitleShort.${status}`)}
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
    Icon: Timelapse,
    iconClassName: 'text-icon-primary',
    textClassName: 'text-text-body',
  },
  [Status.Rejected]: {
    Icon: RemoveCircle,
    iconClassName: 'text-icon-interactive-error',
    textClassName: 'text-text-interactive-error',
  },
  [Status.Passed]: {
    Icon: CheckCircle,
    iconClassName: 'text-icon-interactive-valid',
    textClassName: 'text-text-interactive-valid',
  },
  [Status.Executed]: {
    Icon: CheckCircleOutline,
    iconClassName: 'text-icon-secondary',
    textClassName: 'text-text-secondary',
  },
  [Status.ExecutionFailed]: {
    Icon: Block,
    iconClassName: '!text-icon-interactive-error',
    textClassName: '!text-text-interactive-error',
  },
  [Status.Closed]: {
    Icon: StopCircleOutlined,
    iconClassName: 'text-icon-tertiary',
    textClassName: 'text-text-tertiary',
  },
}
