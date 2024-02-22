import clsx from 'clsx'

import { DaoSdaWrappedTabProps } from '@dao-dao/types'
import { UNDO_PAGE_PADDING_TOP_CLASSES } from '@dao-dao/utils'

import { PageLoader } from '../components'

export const DaoSdaWrappedTab = ({
  allTabs,
  tabId,
  SuspenseLoader,
}: DaoSdaWrappedTabProps) => {
  const activeTab = allTabs.find(({ id }) => id === tabId) || allTabs[0]

  return (
    <div
      className={clsx(
        'relative z-[1] flex min-h-full flex-col items-stretch pt-6',
        UNDO_PAGE_PADDING_TOP_CLASSES
      )}
    >
      {/* Render all tabs, and only show one of them. This ensures that tab data loads in the background while other tabs are being viewed. */}
      {allTabs.map(({ id, Component }) => (
        <div
          key={id}
          className={clsx(
            'flex grow flex-col',
            id !== activeTab.id && 'hidden'
          )}
        >
          <SuspenseLoader fallback={<PageLoader />}>
            <Component />
          </SuspenseLoader>
        </div>
      ))}
    </div>
  )
}
