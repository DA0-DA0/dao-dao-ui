import { Close } from '@mui/icons-material'
import { ComponentType, ReactNode } from 'react'

import { ActionComponentProps } from '@dao-dao/types/actions'

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
  <div className="my-2 flex flex-col gap-2 rounded-lg bg-background-primary p-3">
    <div className="flex flex-row items-start justify-between gap-2">
      <div className="flex flex-row items-center gap-2">
        <h2 className="text-3xl">
          <Icon />
        </h2>
        <h2>{title}</h2>
      </div>

      {onRemove && (
        <button onClick={onRemove} type="button">
          <Close className="!h-4 !w-4" />
        </button>
      )}
    </div>

    {children}
  </div>
)
