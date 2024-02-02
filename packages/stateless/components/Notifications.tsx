import { DoneAll } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { InboxMainItemRendererProps } from '@dao-dao/types'

import { NoContent, PageLoader, useAppContext } from '../components'

export type NotificationsProps = {
  /**
   * Map of item ID to whether or not it is checked for removal.
   */
  checked?: Record<string, boolean>
  /**
   * Function to toggle whether or not an item is checked for removal. If
   * undefined, check button hidden.
   */
  onCheck?: (id: string) => void
  /**
   * The stateful inbox item renderer component.
   */
  InboxMainItemRenderer: ComponentType<InboxMainItemRendererProps>
  /**
   * Optionally style things a bit more compact. Used in the popup.
   */
  compact?: boolean
  /**
   * An optional class name to apply to the container.
   */
  className?: string
}

/**
 * A component to render notifications in the inbox.
 */
export const Notifications = ({
  checked,
  onCheck,
  InboxMainItemRenderer,
  compact,
  className,
}: NotificationsProps) => {
  const { t } = useTranslation()

  const { inbox } = useAppContext()
  // Type-check, should always be loaded for dapp.
  if (!inbox) {
    throw new Error(t('error.loadingData'))
  }

  const { loading, items } = inbox

  return (
    <div
      className={clsx('relative flex flex-col items-stretch gap-4', className)}
    >
      {loading ? (
        <PageLoader className="mt-10" />
      ) : items.length === 0 ? (
        <NoContent
          Icon={DoneAll}
          body={t('info.emptyInboxCaughtUp')}
          noBorder
        />
      ) : (
        <div className="flex grow flex-col">
          {items.map((item) => (
            <div
              key={item.id}
              className="animate-fade-in border-b border-border-secondary"
            >
              <InboxMainItemRenderer
                key={item.id}
                checked={!!checked?.[item.id]}
                compact={compact}
                item={item}
                onCheck={onCheck}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
