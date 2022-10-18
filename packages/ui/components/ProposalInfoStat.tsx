import { ComponentType } from 'react'

export interface ProposalInfoStatProps {
  Icon: ComponentType<{ className: string }>
  title: string
  value?: string
}

export const ProposalInfoStat = ({
  Icon,
  value,
  title,
}: ProposalInfoStatProps) => (
  <div className="flex items-center gap-3">
    <Icon className="secondary-text h-3" />
    <div className="flex items-center gap-2">
      <span className="secondary-text">{title}</span>
      <span className="link-text">{value ?? '...'}</span>
    </div>
  </div>
)
