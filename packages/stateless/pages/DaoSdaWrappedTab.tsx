import clsx from 'clsx'

import { DaoSdaWrappedTabProps } from '@dao-dao/types'

import { PageLoader } from '../components'

export const DaoSdaWrappedTab = ({
  allTabs,
  tabId,
  SuspenseLoader,
}: DaoSdaWrappedTabProps) => {
  const activeTab = allTabs.find(({ id }) => id === tabId) || allTabs[0]

  return (
    <div className="relative z-[1] mx-auto flex min-h-full max-w-5xl flex-col items-stretch">
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
