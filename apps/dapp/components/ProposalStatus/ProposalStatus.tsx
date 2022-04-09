import { StatusIcons } from '@components'

type ProposalStatusProps = { status: string }

export function ProposalStatus({ status }: ProposalStatusProps) {
  return (
    <div>
      {StatusIcons[status]}
      <span className="ml-1 capitalize align-middle">{status}</span>
    </div>
  )
}
