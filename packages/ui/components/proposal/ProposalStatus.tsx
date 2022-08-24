import clsx from 'clsx'
import { ComponentType, SVGProps } from 'react'

import { Approved, Open, Rejected } from '@dao-dao/icons'

export enum EProposalStatus {
  Open = 'open',
  Rejected = 'rejected',
  Approved = 'approved',
}

export interface ProposalStatusProps {
  status: `${EProposalStatus}`
}

export const ProposalStatus = ({ status }: ProposalStatusProps) => {
  const { Icon, iconClassName, textClassName } = ProposalStatusMap[status]

  return (
    <div className="flex flex-row gap-2 items-center link-text">
      <Icon className={clsx('w-[19px] h-[19px]', iconClassName)} />
      <p className={textClassName}>
        {status[0].toUpperCase() + status.slice(1)}
      </p>
    </div>
  )
}

const ProposalStatusMap: Record<
  `${EProposalStatus}`,
  {
    Icon: ComponentType<SVGProps<SVGSVGElement>>
    iconClassName: string
    textClassName: string
  }
> = {
  [EProposalStatus.Open]: {
    Icon: Open,
    iconClassName: 'text-icon-primary',
    textClassName: 'body-text',
  },
  [EProposalStatus.Rejected]: {
    Icon: Rejected,
    iconClassName: 'text-icon-interactive-error',
    textClassName: 'text-text-interactive-error',
  },
  [EProposalStatus.Approved]: {
    Icon: Approved,
    iconClassName: 'text-icon-interactive-valid',
    textClassName: 'text-text-interactive-valid',
  },
}
