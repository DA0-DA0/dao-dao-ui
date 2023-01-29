import clsx from 'clsx'

import { DaoWrappedTabProps } from '@dao-dao/types'

import { PageLoader, useAppLayoutContext } from '../components'

export const DaoWrappedTab = ({
  allTabs,
  tabId,
  DiscordNotifierConfigureModal,
  rightSidebarContent,
  SuspenseLoader,
  showDiscordNotifierConfigureModal,
}: DaoWrappedTabProps) => {
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
        rightNode={
          showDiscordNotifierConfigureModal ? (
            <DiscordNotifierConfigureModal />
          ) : undefined
        }
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
