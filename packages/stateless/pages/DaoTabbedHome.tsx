import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { DaoTabbedHomeProps } from '@dao-dao/types'

import { Loader, SegmentedControls, useAppLayoutContext } from '../components'
import { DaoSplashHeader } from '../components/dao/DaoSplashHeader'

export const DaoTabbedHome = ({
  daoInfo,
  follow,
  DiscordNotifierConfigureModal,
  DaoInfoBar,
  rightSidebarContent,
  SuspenseLoader,
  LinkWrapper,
  tabs,
}: DaoTabbedHomeProps) => {
  const { RightSidebarContent, PageHeader } = useAppLayoutContext()

  const [selectedTab, setSelectedTab] = useState(() => {
    // Default to tab from URL hash if present and valid.
    const windowHash =
      typeof window === 'undefined'
        ? undefined
        : window.location.hash.replace('#', '')

    return windowHash && tabs.some(({ id }) => id === windowHash)
      ? windowHash
      : tabs[0].id
  })

  // Store selected tab in URL hash.
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    if (window.location.hash.replace('#', '') !== selectedTab) {
      window.location.hash = selectedTab
    }
  }, [selectedTab])

  return (
    <>
      <RightSidebarContent>{rightSidebarContent}</RightSidebarContent>
      <PageHeader
        breadcrumbs={{
          home: true,
          current: daoInfo.name,
        }}
        className="mx-auto max-w-5xl"
        gradient
        rightNode={<DiscordNotifierConfigureModal />}
      />

      <div className="relative z-[1] mx-auto flex max-w-5xl flex-col items-stretch">
        <DaoSplashHeader
          DaoInfoBar={DaoInfoBar}
          LinkWrapper={LinkWrapper}
          daoInfo={daoInfo}
          follow={follow}
        />

        <div className="flex flex-col items-center border-y border-t-border-base border-b-border-secondary py-6">
          <SegmentedControls
            className="w-full max-w-2xl shrink"
            onSelect={setSelectedTab}
            selected={selectedTab}
            tabs={tabs.map(({ id, label }) => ({ label, value: id }))}
          />
        </div>

        <div className="py-6">
          {tabs.map(({ id, Component }) => (
            <div key={id} className={clsx(selectedTab !== id && 'hidden')}>
              <SuspenseLoader fallback={<Loader />}>
                <Component />
              </SuspenseLoader>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
