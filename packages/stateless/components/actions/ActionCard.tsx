import { ArrowBackIosRounded, Close } from '@mui/icons-material'
import clsx from 'clsx'
import { ReactNode } from 'react'

import { Action, ActionCategoryWithLabel } from '@dao-dao/types'

import { Button } from '../buttons'
import { IconButton } from '../icon_buttons'

export type ActionCardProps = {
  category: ActionCategoryWithLabel
  // If defined, makes the category button clickable with a back arrow.
  goBackToCategory?: () => void
  action?: Action
  onRemove?: () => void
  childrenContainerClassName?: string
  children: ReactNode | ReactNode[]
}

export const ActionCard = ({
  category,
  goBackToCategory,
  action,
  onRemove,
  childrenContainerClassName,
  children,
}: ActionCardProps) => (
  <div className="flex flex-col overflow-x-auto rounded-lg bg-background-tertiary">
    <div className="primary-text flex flex-row items-center justify-between gap-4 border-b border-border-base p-4 text-text-body">
      <div className="flex flex-row items-center gap-4">
        {action ? (
          <>
            <Button
              className={clsx(
                !goBackToCategory &&
                  'pointer-events-none !bg-background-secondary'
              )}
              onClick={goBackToCategory}
              size="lg"
              variant="secondary"
            >
              {!!goBackToCategory && (
                <ArrowBackIosRounded className="!h-5 !w-5" />
              )}
              {category.label}
            </Button>

            <div className="flex flex-row items-center gap-2">
              <p className="text-xl">
                <action.Icon />
              </p>

              <p>{action.label}</p>
            </div>
          </>
        ) : (
          <p>{category.label}</p>
        )}
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
  </div>
)