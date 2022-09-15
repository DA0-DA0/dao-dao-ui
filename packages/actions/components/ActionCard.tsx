import { XIcon } from '@heroicons/react/solid'
import { ComponentType, ReactNode } from 'react'

import { ActionComponentProps } from '@dao-dao/tstypes/actions'

interface ActionCardProps extends Pick<ActionComponentProps, 'onRemove'> {
  children: ReactNode | ReactNode[]
  Icon: ComponentType
  title: string
}

export const ActionCard = ({
  Icon,
  title,
  onRemove,
  children,
}: ActionCardProps) => (
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
