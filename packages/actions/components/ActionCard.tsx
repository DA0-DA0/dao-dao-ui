import { XIcon } from '@heroicons/react/solid'
import { ComponentType, FC } from 'react'

import { LoaderProps } from '@dao-dao/ui'

import { ActionComponentProps } from '..'

interface ActionCardProps extends Pick<ActionComponentProps, 'onRemove'> {
  Icon: ComponentType
  title: string
}

export const ActionCard: FC<ActionCardProps> = ({
  Icon,
  title,
  onRemove,
  children,
}) => (
  <div className="flex flex-col gap-2 p-3 my-2 bg-primary rounded-lg">
    <div className="flex flex-row gap-2 justify-between items-start">
      <div className="flex flex-row gap-2 items-center">
        <h2 className="text-3xl">
          <Icon />
        </h2>
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

export interface ActionCardLoaderProps {
  Loader: ComponentType<LoaderProps>
}

export const ActionCardLoader = ({ Loader }: ActionCardLoaderProps) => (
  <div className="p-3 my-2 bg-primary rounded-lg">
    <Loader />
  </div>
)
