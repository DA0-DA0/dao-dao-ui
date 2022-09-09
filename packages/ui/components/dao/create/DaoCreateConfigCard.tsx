import { ComponentType, ReactNode } from 'react'

import { SuspenseLoader } from '@dao-dao/common'

import { Loader as DefaultLoader, LoaderProps } from '../../Loader'
import { TooltipInfoIcon } from '../../TooltipInfoIcon'

export interface DaoCreateConfigCardProps {
  Icon: ComponentType
  name: string
  description: string
  tooltip?: string
  input: ReactNode
  Loader?: ComponentType<LoaderProps>
}

export const DaoCreateConfigCard = ({
  Icon,
  name,
  description,
  tooltip,
  input,
  Loader = DefaultLoader,
}: DaoCreateConfigCardProps) => (
  <div className="flex relative flex-col bg-background-tertiary rounded-lg">
    {tooltip && (
      <TooltipInfoIcon className="absolute top-3 right-3" title={tooltip} />
    )}

    <div className="flex justify-center items-center h-32 text-6xl border-b border-border-secondary">
      <Icon />
    </div>

    <div className="flex flex-col grow gap-12 justify-between p-6">
      <div className="space-y-3">
        <p className="text-text-body primary-text">{name}</p>
        <p className="text-text-secondary body-text">{description}</p>
      </div>

      <SuspenseLoader fallback={<Loader />}>{input}</SuspenseLoader>
    </div>
  </div>
)
