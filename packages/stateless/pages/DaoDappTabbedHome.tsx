import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'

import { DaoDappTabbedHomeProps } from '@dao-dao/types'
import {
  PAGE_PADDING_HORIZONTAL_CLASSES,
  UNDO_PAGE_PADDING_HORIZONTAL_CLASSES,
  UNDO_PAGE_PADDING_TOP_CLASSES_WITH_TOP,
  getScrollableAncestor,
} from '@dao-dao/utils'

import { PageLoader, TabBar, useAppContext } from '../components'
import { DaoSplashHeader } from '../components/dao/DaoSplashHeader'
import { useDaoInfoContext } from '../hooks'

export const DaoDappTabbedHome = ({
  follow,
  SuspenseLoader,
  ButtonLink,
  LinkWrapper,
  tabs,
  selectedTabId,
  onSelectTabId,
  parentProposalRecognizeSubDaoHref,
}: DaoDappTabbedHomeProps) => {
  const { asPath } = useRouter()
  const daoInfo = useDaoInfoContext()
  const { pageHeaderRef } = useAppContext()

  const tabBarRef = useRef<HTMLDivElement>(null)
  const tabContainerRef = useRef<HTMLDivElement>(null)

  // On tab bar change, scroll to top of tabs the user has scrolled down past
  // them such that they are stuck at the top.
  useEffect(() => {
    if (
      !tabBarRef.current?.parentElement ||
      !tabContainerRef.current ||
      !pageHeaderRef.current
    ) {
      return
    }

    const scrollableParent = tabBarRef.current?.parentElement
      ? getScrollableAncestor(tabBarRef.current.parentElement)
      : undefined
    if (!scrollableParent) {
      return
    }

    const tabBarRect = tabBarRef.current.getBoundingClientRect()
    const pageHeaderRect = pageHeaderRef.current.getBoundingClientRect()

    // Tab bar sticks right below page header when the page is scrolled down. We
    // want to scroll to the top of the tab when a user is selected, only once
    // already scrolled such that the tabs are sticky.
    if (pageHeaderRect.bottom < tabBarRect.top) {
      return
    }

    const scrollableParentPaddingTop =
      Number(
        window.getComputedStyle(scrollableParent).paddingTop.replace('px', '')
      ) || 0

    scrollableParent.scrollTo({
      top:
        tabContainerRef.current.offsetTop +
        scrollableParentPaddingTop -
        tabBarRect.height,
      behavior: 'smooth',
    })

    // Only toggle on route change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath])

  return (
    <div className="relative z-[1] flex flex-col items-stretch">
      <div className="mb-4">
        <DaoSplashHeader
          ButtonLink={ButtonLink}
          LinkWrapper={LinkWrapper}
          daoInfo={daoInfo}
          follow={follow}
          parentProposalRecognizeSubDaoHref={parentProposalRecognizeSubDaoHref}
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

      <div className="z-10 pt-5 pb-6" ref={tabContainerRef}>
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
