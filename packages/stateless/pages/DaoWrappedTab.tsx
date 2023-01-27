import { DaoWrappedTabProps } from '@dao-dao/types'

import { PageLoader, useAppLayoutContext } from '../components'

export const DaoWrappedTab = ({
  tab,
  DiscordNotifierConfigureModal,
  rightSidebarContent,
  SuspenseLoader,
  showDiscordNotifierConfigureModal,
}: DaoWrappedTabProps) => {
  const { RightSidebarContent, PageHeader } = useAppLayoutContext()

  return (
    <>
      <RightSidebarContent>{rightSidebarContent}</RightSidebarContent>
      <PageHeader
        breadcrumbs={{
          home: true,
          current: tab.label,
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
        <SuspenseLoader fallback={<PageLoader />}>
          <tab.Component />
        </SuspenseLoader>
      </div>
    </>
  )
}
