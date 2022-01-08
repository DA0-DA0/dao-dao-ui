import { STATUS_COLORS } from 'util/constants'
import StatusIcons from './StatusIcons'

type ProposalStatusProps = { status: string }

function ProposalStatus({ status }: ProposalStatusProps) {
  return (
    <div style={{ color: STATUS_COLORS[status] }}>{StatusIcons[status]}</div>
  )
}

export default ProposalStatus
