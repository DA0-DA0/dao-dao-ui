import { ComponentType, ReactNode } from 'react'
import { FieldError } from 'react-hook-form'

import { SuspenseLoaderProps } from '@dao-dao/types'

import { InputErrorMessage } from '../../inputs'
import { Loader as DefaultLoader, LoaderProps } from '../../Loader'
import { TooltipInfoIcon } from '../../TooltipInfoIcon'

export interface DaoCreateConfigInputCardProps {
  Icon: ComponentType
  name: string
  description: string
  tooltip?: string
  input: ReactNode
  SuspenseLoader: ComponentType<SuspenseLoaderProps>
  Loader?: ComponentType<LoaderProps>
  error?: FieldError
}

export const DaoCreateConfigInputCard = ({
  Icon,
  name,
  description,
  tooltip,
  input,
  SuspenseLoader,
  Loader = DefaultLoader,
  error,
}: DaoCreateConfigInputCardProps) => (
  <div className="relative flex flex-col rounded-lg bg-background-tertiary">
    {tooltip && (
      <TooltipInfoIcon className="absolute top-3 right-3" title={tooltip} />
    )}

    <div className="flex h-32 items-center justify-center border-b border-border-secondary text-6xl">
      <Icon />
    </div>

    <div className="flex grow flex-col justify-between gap-12 p-6">
      <div className="space-y-3">
        <p className="primary-text text-text-body">{name}</p>
        <p className="body-text text-text-secondary">{description}</p>
      </div>

      <div className="flex flex-col">
        <SuspenseLoader fallback={<Loader />}>{input}</SuspenseLoader>
        <InputErrorMessage error={error} />
      </div>
    </div>
  </div>
)
