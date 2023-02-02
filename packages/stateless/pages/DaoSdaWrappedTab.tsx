import clsx from 'clsx'

import { DaoSdaWrappedTabProps } from '@dao-dao/types'

import { PageLoader, useAppLayoutContext } from '../components'

export const DaoSdaWrappedTab = ({
  allTabs,
  tabId,
  rightSidebarContent,
  SuspenseLoader,
}: DaoSdaWrappedTabProps) => {
  const { RightSidebarContent, PageHeader } = useAppLayoutContext()

  const activeTab = allTabs.find(({ id }) => id === tabId) || allTabs[0]

  return (
    <>
      <RightSidebarContent>{rightSidebarContent}</RightSidebarContent>
      <PageHeader
        breadcrumbs={{
          home: true,
          current: activeTab.label,
        }}
        className="mx-auto max-w-5xl"
        gradient
      />

      <div className="relative z-[1] mx-auto flex max-w-5xl flex-col items-stretch">
        {/* Render all tabs, and only show one of them. This ensures that tab data loads in the background while other tabs are being viewed. */}
        {allTabs.map(({ id, Component }) => (
          <div key={id} className={clsx(id !== activeTab.id && 'hidden')}>
            <SuspenseLoader fallback={<PageLoader />}>
              <Component />
            </SuspenseLoader>
          </div>
        ))}
      </div>
    </>
  )
}
