import { Close } from '@mui/icons-material'
import clsx from 'clsx'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Action } from '@dao-dao/types'

import { IconButton } from '../icon_buttons'

export type ActionCardProps = {
  action: Action
  actionCount: number
  onRemove?: () => void
  childrenContainerClassName?: string
  children: ReactNode | ReactNode[]
}

export const ActionCard = ({
  action,
  actionCount,
  onRemove,
  childrenContainerClassName,
  children,
}: ActionCardProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col overflow-x-auto rounded-lg bg-background-tertiary">
      <div className="primary-text flex flex-row items-center justify-between gap-8 border-b border-border-base p-4 text-text-body">
        <div className="flex flex-row items-center gap-2 pr-4">
          <p className="text-xl">
            <action.Icon />
          </p>

          <div className="flex flex-row items-end gap-2">
            <p className="title-text">{action.label}</p>

            {actionCount > 1 && (
              <p className="caption-text">
                ({t('info.actions', { count: actionCount })})
              </p>
            )}
          </div>
        </div>

        {
          // Don't allow removing programmatic actions.
          onRemove && !action?.programmaticOnly && (
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
        className={clsx('flex flex-col gap-4 p-6', childrenContainerClassName)}
      >
        {children}
      </div>
    </div>
  )
}

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
