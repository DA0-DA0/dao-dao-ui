import { Status } from '@dao-dao/state/clients/cw-proposal-single'

import { StatusIcons } from '../StatusIcons'

type ProposalStatusProps = { status: `${Status}` }

export const ProposalStatus = ({ status }: ProposalStatusProps) => {
  const Icon = StatusIcons[status]
  return (
    <div>
      {Icon && <Icon style={{ display: 'inline' }} />}
      <span className="ml-1 capitalize align-middle">{status}</span>
    </div>
  )
}
