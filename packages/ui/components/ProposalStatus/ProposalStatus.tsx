import { Status } from '@dao-dao/state/clients/cw-proposal-single'
import { titlecase } from '@dao-dao/utils'

import { StatusIcons } from '../StatusIcons'

export const ProposalStatus = ({ status }: { status: `${Status}` }) => {
  const Icon = StatusIcons[status]
  return (
    <div className="flex flex-row gap-1 items-center">
      {Icon && <Icon style={{ display: 'inline' }} />}
      <span className="capitalize align-middle">{titlecase(status)}</span>
    </div>
  )
}
