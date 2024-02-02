import { DoneAll } from '@mui/icons-material'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { NotificationsProps } from '@dao-dao/types'

import { NoContent, PageLoader, useAppContext } from '../components'

/**
 * A component to render notifications in the inbox.
 */
export const Notifications = ({
  inbox: { checked, onCheck },
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
                checked={!!checked[item.id]}
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
