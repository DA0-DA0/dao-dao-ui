import clsx from 'clsx'

import { DaoDappTabbedHomeProps } from '@dao-dao/types'
import {
  PAGE_PADDING_HORIZONTAL_CLASSES,
  UNDO_PAGE_PADDING_HORIZONTAL_CLASSES,
  UNDO_PAGE_PADDING_TOP_CLASSES_WITH_TOP,
} from '@dao-dao/utils'

import { PageLoader, TabBar } from '../components'
import { DaoSplashHeader } from '../components/dao/DaoSplashHeader'
import { useDao } from '../contexts'
import { useTabBarScrollReset } from '../hooks'

export const DaoDappTabbedHome = ({
  SuspenseLoader,
  ButtonLink,
  LinkWrapper,
  tabs,
  selectedTabId,
  onSelectTabId,
  ...headerProps
}: DaoDappTabbedHomeProps) => {
  const dao = useDao()

  // Auto scroll to top of tab on change.
  const { tabBarRef, tabContainerRef } = useTabBarScrollReset({
    selectedTabId,
  })

  return (
    <div className="relative z-[1] flex flex-col items-stretch">
      <div className="mb-4">
        <DaoSplashHeader
          ButtonLink={ButtonLink}
          LinkWrapper={LinkWrapper}
          dao={dao}
          {...headerProps}
        />
      </div>

      <div
        className={clsx(
          // Stick to the top when the tab content scrolls down. Use higher z
          // index to make sure this stays above tab content.
          'sticky z-20 flex flex-col items-stretch bg-background-base',
          UNDO_PAGE_PADDING_TOP_CLASSES_WITH_TOP,
          UNDO_PAGE_PADDING_HORIZONTAL_CLASSES,
          PAGE_PADDING_HORIZONTAL_CLASSES
        )}
      >
        <TabBar
          onSelect={onSelectTabId}
          ref={tabBarRef}
          selectedTabId={selectedTabId}
          tabs={tabs.map(({ id, label, IconFilled }) => ({
            id,
            label,
            Icon: IconFilled,
          }))}
        />
      </div>

      <div className="z-10 pt-5 pb-4" ref={tabContainerRef}>
        {tabs.map(({ id, Component, lazy }) => (
          <div key={id} className={clsx(selectedTabId !== id && 'hidden')}>
            {/* Render tab if it shouldn't lazy load or if it's selected. */}
            {(!lazy || selectedTabId === id) && (
              <SuspenseLoader fallback={<PageLoader size={32} />}>
                <Component />
              </SuspenseLoader>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
