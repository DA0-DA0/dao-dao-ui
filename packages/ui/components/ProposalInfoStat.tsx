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
  <div className="flex gap-3 items-center">
    <Icon className="h-3 secondary-text" />
    <div className="flex gap-2 items-center">
      <span className="secondary-text">{title}</span>
      <span className="link-text">{value ?? '...'}</span>
    </div>
  </div>
)
