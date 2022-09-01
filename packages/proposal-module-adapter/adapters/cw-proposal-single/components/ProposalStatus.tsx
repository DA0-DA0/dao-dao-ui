import { StopIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { ComponentType, SVGProps } from 'react'

import { Approved, Executed, Open, Rejected } from '@dao-dao/icons'
import { Status } from '@dao-dao/state/clients/cw-proposal-single'
import { StatusDisplay } from '@dao-dao/ui'
import { convertToTitlecase } from '@dao-dao/utils'

export interface ProposalStatusProps {
  status: Status
}

export const ProposalStatus = ({ status }: ProposalStatusProps) => {
  const { Icon, iconClassName, textClassName } = ProposalStatusMap[status]

  return (
    <StatusDisplay
      icon={<Icon className={clsx(iconClassName, 'w-[19px] h-[19px]')} />}
      label={
        // Width of longest status label.
        <p className={clsx('w-[8ch]', textClassName)}>
          {convertToTitlecase(status)}
        </p>
      }
    />
  )
}

export const ProposalStatusMap: Record<
  Status,
  {
    Icon: ComponentType<SVGProps<SVGSVGElement>>
    iconClassName: string
    textClassName: string
  }
> = {
  [Status.Open]: {
    Icon: Open,
    iconClassName: 'text-icon-primary',
    textClassName: 'body-text',
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
    iconClassName: 'text-icon-primary',
    textClassName: 'body-text',
  },
  [Status.Closed]: {
    Icon: (props) => (
      <StopIcon
        {...props}
        // Weirdly is a bit brighter than the other icons, so dim it.
        className={clsx(props.className, 'opacity-80')}
      />
    ),
    iconClassName: 'text-icon-interactive-valid',
    textClassName: 'text-text-interactive-valid',
  },
}
