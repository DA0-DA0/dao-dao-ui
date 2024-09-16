import { Close } from '@mui/icons-material'
import clsx from 'clsx'
import { ReactNode } from 'react'

import { Action } from '@dao-dao/types'

import { IconButton } from '../icon_buttons'

export type ActionCardProps = {
  action: Action<any>
  onRemove?: () => void
  childrenContainerClassName?: string
  children: ReactNode | ReactNode[]
}

export const ActionCard = ({
  action,
  onRemove,
  childrenContainerClassName,
  children,
}: ActionCardProps) => (
  <div className="flex flex-col overflow-x-auto rounded-lg bg-background-tertiary">
    <div className="primary-text flex flex-row items-center justify-between gap-8 border-b border-border-base p-3 xs:p-4 text-text-body">
      <div className="flex flex-row items-center gap-2 pr-3 xs:pr-4">
        <p className="text-xl">
          <action.metadata.Icon />
        </p>

        <p className="title-text">{action.metadata.label}</p>
      </div>

      {
        // Don't allow removing programmatic actions.
        onRemove && !action?.metadata.programmaticOnly && (
          <IconButton
            Icon={Close}
            onClick={onRemove}
            size="sm"
            variant="ghost"
          />
        )
      }
    </div>

    <div
      className={clsx(
        'flex flex-col gap-4 p-3 xs:p-4 sm:p-6',
        childrenContainerClassName
      )}
    >
      {children}
    </div>
  </div>
)

export const ActionCardLoader = () => (
  <div className="flex animate-pulse flex-col rounded-lg bg-background-tertiary">
    <div className="primary-text flex flex-row items-center justify-between gap-8 border-b border-border-base p-4 text-text-body">
      <div className="flex flex-row items-center gap-2 pr-4">
        {/* eslint-disable-next-line i18next/no-literal-string */}
        <p className="invisible text-xl">Icon</p>
        {/* eslint-disable-next-line i18next/no-literal-string */}
        <p className="title-text invisible">Label</p>
      </div>
    </div>

    <div className="h-40"></div>
  </div>
)
