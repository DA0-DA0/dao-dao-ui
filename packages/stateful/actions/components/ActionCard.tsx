import { Close } from '@mui/icons-material'
import { ComponentType, ReactNode } from 'react'

import { IconButton } from '@dao-dao/stateless'
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
  <div className="flex flex-col rounded-lg bg-background-tertiary">
    <div className="primary-text flex flex-row items-start justify-between gap-4 border-b border-border-base p-4 text-text-body">
      <div className="flex flex-row items-center gap-3">
        <p className="text-xl">
          <Icon />
        </p>

        <p>{title}</p>
      </div>

      {onRemove && (
        <IconButton Icon={Close} onClick={onRemove} size="sm" variant="ghost" />
      )}
    </div>

    <div className="flex flex-col gap-2 p-6 pt-4">{children}</div>
  </div>
)
