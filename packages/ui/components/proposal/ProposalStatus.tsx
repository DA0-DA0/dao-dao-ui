import clsx from 'clsx'
import { ComponentType, SVGProps } from 'react'

import { Approved, Open, Rejected } from '@dao-dao/icons'
import { convertToTitlecase } from '@dao-dao/utils'

export enum ProposalStatusEnum {
  Open = 'open',
  Rejected = 'rejected',
  Approved = 'approved',
}

export interface ProposalStatusProps {
  status: ProposalStatusEnum
}

export const ProposalStatus = ({ status }: ProposalStatusProps) => {
  const { Icon, iconClassName, textClassName } = ProposalStatusMap[status]

  return (
    <div className="flex flex-row gap-2 items-center link-text">
      <Icon className={clsx('w-[19px] h-[19px]', iconClassName)} />
      <p className={textClassName}>{convertToTitlecase(status)}</p>
    </div>
  )
}

const ProposalStatusMap: Record<
  ProposalStatusEnum,
  {
    Icon: ComponentType<SVGProps<SVGSVGElement>>
    iconClassName: string
    textClassName: string
  }
> = {
  [ProposalStatusEnum.Open]: {
    Icon: Open,
    iconClassName: 'text-icon-primary',
    textClassName: 'body-text',
  },
  [ProposalStatusEnum.Rejected]: {
    Icon: Rejected,
    iconClassName: 'text-icon-interactive-error',
    textClassName: 'text-text-interactive-error',
  },
  [ProposalStatusEnum.Approved]: {
    Icon: Approved,
    iconClassName: 'text-icon-interactive-valid',
    textClassName: 'text-text-interactive-valid',
  },
}
