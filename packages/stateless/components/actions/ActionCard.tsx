import { Close } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, ReactNode } from 'react'

import { ActionComponentProps } from '@dao-dao/types/actions'

import { IconButton } from '../icon_buttons'

interface ActionCardProps extends Pick<ActionComponentProps, 'onRemove'> {
  children: ReactNode | ReactNode[]
  Icon?: ComponentType
  title: string
  footer?: ReactNode
  childrenContainerClassName?: string
}

export const ActionCard = ({
  Icon,
  title,
  onRemove,
  children,
  footer,
  childrenContainerClassName,
}: ActionCardProps) => (
  <div className="flex flex-col overflow-x-auto rounded-lg bg-background-tertiary">
    <div className="primary-text flex flex-row items-start justify-between gap-4 border-b border-border-base p-4 text-text-body">
      <div className="flex flex-row items-center gap-3">
        {Icon && (
          <p className="text-xl">
            <Icon />
          </p>
        )}

        <p>{title}</p>
      </div>

      {onRemove && (
        <IconButton Icon={Close} onClick={onRemove} size="sm" variant="ghost" />
      )}
    </div>

    <div
      className={clsx(
        'flex flex-col gap-4 px-6 pt-4 pb-5',
        childrenContainerClassName
      )}
    >
      {children}
    </div>

    {footer && (
      <div className="flex flex-col gap-2 border-t border-border-secondary p-6 pt-5">
        {footer}
      </div>
    )}
  </div>
)
