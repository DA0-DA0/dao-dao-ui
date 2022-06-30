import { XIcon } from '@heroicons/react/solid'
import { FC, ReactNode } from 'react'

import { Loader } from '@dao-dao/ui'

import { ActionComponentProps } from '..'

interface ActionCardProps extends Pick<ActionComponentProps, 'onRemove'> {
  emoji: ReactNode
  title: string
}

export const ActionCard: FC<ActionCardProps> = ({
  emoji,
  title,
  onRemove,
  children,
}) => (
  <div className="my-2 flex flex-col gap-2 rounded-lg bg-primary p-3">
    <div className="flex flex-row items-start justify-between gap-2">
      <div className="flex flex-row items-center gap-2">
        <h2 className="text-3xl">{emoji}</h2>
        <h2>{title}</h2>
      </div>

      {onRemove && (
        <button onClick={onRemove} type="button">
          <XIcon className="h-4" />
        </button>
      )}
    </div>

    {children}
  </div>
)

export const ActionCardLoader = () => (
  <div className="my-2 rounded-lg bg-primary p-3">
    <Loader />
  </div>
)
