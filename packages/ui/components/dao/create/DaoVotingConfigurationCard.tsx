import { ComponentType, ReactNode } from 'react'

import { TooltipInfoIcon } from '../../TooltipInfoIcon'

export interface DaoVotingConfigurationCardProps {
  Icon: ComponentType
  name: string
  description: string
  tooltip?: string
  input: ReactNode
}

export const DaoVotingConfigurationCard = ({
  Icon,
  name,
  description,
  tooltip,
  input,
}: DaoVotingConfigurationCardProps) => (
  <div className="relative bg-background-tertiary rounded-lg">
    {tooltip && (
      <TooltipInfoIcon className="absolute top-3 right-3" title={tooltip} />
    )}

    <div className="flex justify-center items-center h-32 text-6xl border-b border-border-secondary">
      <Icon />
    </div>

    <div className="flex flex-col gap-12 justify-between p-6">
      <div className="space-y-3">
        <p className="text-text-body primary-text">{name}</p>
        <p className="text-text-secondary body-text">{description}</p>
      </div>

      {input}
    </div>
  </div>
)
