import { Status } from '@dao-dao/state/clients/cw-proposal-single'

import { StatusIcons } from '../StatusIcons'

type ProposalStatusProps = { status: `${Status}` }

export const ProposalStatus = ({ status }: ProposalStatusProps) => {
  const Icon = StatusIcons[status]
  return (
    <div className="flex flex-row gap-1 items-center">
      {Icon && <Icon style={{ display: 'inline' }} />}
      <span className="capitalize align-middle">{status}</span>
    </div>
  )
}
