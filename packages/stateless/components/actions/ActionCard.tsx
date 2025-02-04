import {
  Add,
  ArrowDownward,
  ArrowUpward,
  Close,
  CopyAll,
} from '@mui/icons-material'
import clsx from 'clsx'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Action } from '@dao-dao/types'

import { IconButton } from '../icon_buttons'
import { Tooltip } from '../tooltip'

export type ActionCardProps = {
  action: Action<any>
  onMoveUp?: () => void
  onMoveDown?: () => void
  onAddNew?: () => void
  onDuplicate?: () => void
  onRemove?: () => void
  childrenContainerClassName?: string
  children: ReactNode | ReactNode[]
}

export const ActionCard = ({
  action,
  onMoveUp,
  onMoveDown,
  onAddNew,
  onDuplicate,
  onRemove,
  childrenContainerClassName,
  children,
}: ActionCardProps) => {
  const { t } = useTranslation()

  const showRemove = !action?.metadata.programmaticOnly && !!onRemove
  const showActions =
    !action?.metadata.programmaticOnly &&
    (onMoveUp || onMoveDown || onDuplicate || onAddNew)

  return (
    <div className="flex flex-col overflow-x-auto rounded-lg bg-background-tertiary">
      <div className="primary-text flex flex-row items-center justify-between gap-8 p-3 xs:p-4 text-text-body">
        <div className="flex flex-row items-center gap-2 pr-3 xs:pr-4">
          <p className="text-xl">
            <action.metadata.Icon />
          </p>

          <p className="title-text">{action.metadata.label}</p>
        </div>

        {showRemove && (
          <div className="flex flex-row items-center gap-2">
            <Tooltip title={t('button.remove')}>
              <IconButton
                Icon={Close}
                onClick={onRemove}
                size="sm"
                variant="ghost"
              />
            </Tooltip>
          </div>
        )}
      </div>

      <div
        className={clsx(
          'flex flex-col gap-4 p-3 xs:p-4 sm:p-6 border-y border-border-base',
          childrenContainerClassName
        )}
      >
        {children}
      </div>

      {showActions && (
        <div className="flex flex-row items-center justify-end gap-2 p-3">
          {onMoveUp && (
            <Tooltip title={t('button.moveUp')}>
              <IconButton
                Icon={ArrowUpward}
                onClick={onMoveUp}
                size="sm"
                variant="ghost"
              />
            </Tooltip>
          )}

          {onMoveDown && (
            <Tooltip title={t('button.moveDown')}>
              <IconButton
                Icon={ArrowDownward}
                onClick={onMoveDown}
                size="sm"
                variant="ghost"
              />
            </Tooltip>
          )}

          {onAddNew && (
            <Tooltip
              title={t('button.addNewAction', {
                action: action.metadata.label,
              })}
            >
              <IconButton
                Icon={Add}
                onClick={onAddNew}
                size="sm"
                variant="ghost"
              />
            </Tooltip>
          )}

          {onDuplicate && (
            <Tooltip title={t('button.duplicate')}>
              <IconButton
                Icon={CopyAll}
                onClick={onDuplicate}
                size="sm"
                variant="ghost"
              />
            </Tooltip>
          )}
        </div>
      )}
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
