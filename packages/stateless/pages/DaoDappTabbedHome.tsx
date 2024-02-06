import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'

import { DaoDappTabbedHomeProps } from '@dao-dao/types'
import {
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
  const selectedTab = tabs.find(({ id }) => id === selectedTabId)

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

      <TabBar
        className={clsx(
          // Stick to the top when the tab content scrolls down. Use higher z
          // index to make sure this stays above tab content.
          'sticky z-20 bg-background-base',
          UNDO_PAGE_PADDING_TOP_CLASSES_WITH_TOP
        )}
        onSelect={onSelectTabId}
        ref={tabBarRef}
        selectedTabId={selectedTabId}
        tabs={tabs.map(({ id, label, IconFilled }) => ({
          id,
          label,
          Icon: IconFilled,
        }))}
      />

      <div className="z-10 pt-5 pb-6" ref={tabContainerRef}>
        {/* Don't render a tab unless it is visible. */}
        {selectedTab && (
          <SuspenseLoader fallback={<PageLoader size={32} />}>
            <selectedTab.Component />
          </SuspenseLoader>
        )}
      </div>
    </div>
  )
}
