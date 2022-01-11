import { STATUS_COLORS } from 'util/constants'
import StatusIcons from './StatusIcons'

type ProposalStatusProps = { status: string }

function ProposalStatus({ status }: ProposalStatusProps) {
  return (
    <div style={{ color: STATUS_COLORS[status] }}>
      {StatusIcons[status]}
      <span className="ml-1 capitalize align-middle">{status}</span>
    </div>
  )
}

export default ProposalStatus
