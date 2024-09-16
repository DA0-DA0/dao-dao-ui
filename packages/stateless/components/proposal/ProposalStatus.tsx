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
import { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'

import {
  ProposalStatusEnum,
  ProposalStatusKey,
  ProposalStatus as Status,
} from '@dao-dao/types'
import { getProposalStatusKey } from '@dao-dao/utils'

import { StatusDisplay, StatusDisplayProps } from '../StatusDisplay'

export type ProposalStatusProps = {
  status: Status
} & Omit<
  StatusDisplayProps,
  'Icon' | 'iconClassName' | 'label' | 'labelClassName'
>

export const ProposalStatus = ({ status, ...props }: ProposalStatusProps) => {
  const { t } = useTranslation()

  const key = getProposalStatusKey(status)
  const { Icon, iconClassName, textClassName } = ProposalStatusMap[key]

  return (
    <StatusDisplay
      {...props}
      Icon={Icon}
      iconClassName={iconClassName}
      label={t(`proposalStatusTitleShort.${key}`)}
      labelClassName={textClassName}
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
  // Same as Vetoed.
  [ProposalStatusEnum.NeutronOverruled]: {
    Icon: ThumbDownOutlined,
    iconClassName: '!text-icon-interactive-error',
    textClassName: '!text-text-interactive-error',
  },
  // Same as veto_timelock.
  [ProposalStatusEnum.NeutronTimelocked]: {
    Icon: AvTimer,
    iconClassName: 'text-icon-primary',
    textClassName: 'text-text-body',
  },
}
