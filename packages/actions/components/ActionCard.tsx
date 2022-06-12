import { XIcon } from '@heroicons/react/solid'
import { FC, ReactNode } from 'react'

import { Loader } from '@dao-dao/ui/components/Loader'

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
  <div className="flex flex-col gap-2 p-3 my-2 bg-primary rounded-lg">
    <div className="flex flex-row gap-2 justify-between items-start">
      <div className="flex flex-row gap-2 items-center">
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
  <div className="p-3 my-2 bg-primary rounded-lg">
    <Loader />
  </div>
)
