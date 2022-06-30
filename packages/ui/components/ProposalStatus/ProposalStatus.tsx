import { Status } from '@dao-dao/state/clients/cw-proposal-single'
import { titlecase } from '@dao-dao/utils'

import { StatusIcons } from '../StatusIcons'

export const ProposalStatus = ({ status }: { status: `${Status}` }) => {
  const Icon = StatusIcons[status]
  return (
    <div className="flex flex-row items-center gap-1">
      {Icon && <Icon style={{ display: 'inline' }} />}
      <span className="align-middle capitalize">{titlecase(status)}</span>
    </div>
  )
}
