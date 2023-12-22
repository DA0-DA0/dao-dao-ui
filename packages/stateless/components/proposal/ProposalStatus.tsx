import {
  AvTimer,
  Block,
  CheckCircle,
  CheckCircleOutline,
  RemoveCircle,
  StopCircleOutlined,
  ThumbDownOutlined,
  Timelapse,
} from '@mui/icons-material'
import clsx from 'clsx'
import { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'

import { StatusDisplay } from '@dao-dao/stateless'
import {
  ProposalStatusEnum,
  ProposalStatusKey,
  ProposalStatus as Status,
} from '@dao-dao/types'
import { getProposalStatusKey } from '@dao-dao/utils'

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

  const key = getProposalStatusKey(status)
  const { Icon, iconClassName, textClassName } = ProposalStatusMap[key]

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
          {t(`proposalStatusTitleShort.${key}`)}
        </p>
      }
    />
  )
}

export const ProposalStatusMap: Record<
  ProposalStatusKey,
  {
    Icon: (props: { className: string }) => ReactElement
    iconClassName: string
    textClassName: string
  }
> = {
  [ProposalStatusEnum.Open]: {
    Icon: Timelapse,
    iconClassName: 'text-icon-primary',
    textClassName: 'text-text-body',
  },
  [ProposalStatusEnum.Rejected]: {
    Icon: RemoveCircle,
    iconClassName: 'text-icon-interactive-error',
    textClassName: 'text-text-interactive-error',
  },
  [ProposalStatusEnum.Passed]: {
    Icon: CheckCircle,
    iconClassName: 'text-icon-interactive-valid',
    textClassName: 'text-text-interactive-valid',
  },
  [ProposalStatusEnum.Executed]: {
    Icon: CheckCircleOutline,
    iconClassName: 'text-icon-secondary',
    textClassName: 'text-text-secondary',
  },
  [ProposalStatusEnum.ExecutionFailed]: {
    Icon: Block,
    iconClassName: '!text-icon-interactive-error',
    textClassName: '!text-text-interactive-error',
  },
  [ProposalStatusEnum.Closed]: {
    Icon: StopCircleOutlined,
    iconClassName: 'text-icon-tertiary',
    textClassName: 'text-text-tertiary',
  },
  [ProposalStatusEnum.Vetoed]: {
    Icon: ThumbDownOutlined,
    iconClassName: '!text-icon-interactive-error',
    textClassName: '!text-text-interactive-error',
  },
  veto_timelock: {
    Icon: AvTimer,
    iconClassName: 'text-icon-primary',
    textClassName: 'text-text-body',
  },
}
