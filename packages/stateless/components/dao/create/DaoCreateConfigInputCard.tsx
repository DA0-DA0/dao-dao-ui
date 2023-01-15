import { ComponentType, ReactNode } from 'react'
import { FieldError } from 'react-hook-form'

import { SuspenseLoaderProps } from '@dao-dao/types'

import { InputErrorMessage } from '../../inputs'
import { Loader } from '../../logo/Loader'
import { MarkdownRenderer } from '../../MarkdownRenderer'
import { TooltipInfoIcon } from '../../tooltip/TooltipInfoIcon'

export interface DaoCreateConfigInputCardProps {
  Icon: ComponentType
  name: string
  description: string
  tooltip?: string
  input: ReactNode
  SuspenseLoader: ComponentType<SuspenseLoaderProps>
  error?: FieldError
}

export const DaoCreateConfigInputCard = ({
  Icon,
  name,
  description,
  tooltip,
  input,
  SuspenseLoader,
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

        <MarkdownRenderer
          className="body-text text-text-secondary"
          markdown={description}
        />
      </div>

      <div className="flex flex-col">
        <SuspenseLoader fallback={<Loader />}>{input}</SuspenseLoader>
        <InputErrorMessage error={error} />
      </div>
    </div>
  </div>
)
