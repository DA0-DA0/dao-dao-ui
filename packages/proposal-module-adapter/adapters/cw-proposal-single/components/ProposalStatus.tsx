import { StopIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { SVGProps } from 'react'

import { Executed, Open, Passed, Rejected } from '@dao-dao/icons'
import { Status } from '@dao-dao/state/clients/cw-proposal-single'
import { convertToTitlecase } from '@dao-dao/utils'

export interface ProposalStatusProps {
  status: Status
}

export const ProposalStatus = ({ status }: ProposalStatusProps) => {
  const Icon = ProposalStatusIcons[status]

  return (
    <div className="flex flex-row gap-1 items-center">
      {Icon && <Icon style={{ display: 'inline' }} />}
      <span className="capitalize align-middle">{convertToTitlecase(status)}</span>
    </div>
  )
}

export const ProposalStatusIcons: Record<
  Status,
  ((props: SVGProps<SVGSVGElement>) => JSX.Element) | null
> = {
  [Status.Open]: Open,
  [Status.Executed]: Executed,
  [Status.Passed]: Passed,
  [Status.Rejected]: Rejected,
  [Status.Closed]: (props) => (
    <StopIcon
      {...props}
      // Weirdly is a bit brighter than the other icons, so dim it.
      className={clsx(props.className, 'opacity-80')}
      height="1em"
      width="1em"
    />
  ),
}
