import { RefObject, useEffect, useRef } from 'react'

import { getScrollableAncestor } from '@dao-dao/utils'

import { useAppContextIfAvailable } from '../components'

export type UseTabBarScrollResetOptions = {
  /**
   * The selected tab.
   */
  selectedTabId: string
  /**
   * Optionally offset the scroll.
   */
  scrollOffset?: number
}

export type UseTabBarScrollResetReturn = {
  /**
   * A ref to attach to the TabBar component itself.
   */
  tabBarRef: RefObject<HTMLDivElement>
  /**
   * A ref to attach to the div wrapper around the rendered tab content.
   */
  tabContainerRef: RefObject<HTMLDivElement>
}

/**
 * A hook that handles scrolling to the top of a tab content when a tab in a
 * TabBar changes.
 *
 * To use it, attach the `tabBarRef` to the TabBar itself, and `tabContainerRef`
 * to the div wrapper around the rendered tab content.
 */
export const useTabBarScrollReset = ({
  selectedTabId,
  scrollOffset = 0,
}: UseTabBarScrollResetOptions): UseTabBarScrollResetReturn => {
  const pageHeaderRef = useAppContextIfAvailable()?.pageHeaderRef

  const tabBarRef = useRef<HTMLDivElement>(null)
  const tabContainerRef = useRef<HTMLDivElement>(null)

  // On tab bar change, scroll to top of tabs the user has scrolled down past
  // them such that they are stuck at the top.
  useEffect(() => {
    if (
      !tabBarRef.current?.parentElement ||
      !tabContainerRef.current ||
      !pageHeaderRef?.current
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
        tabBarRect.height +
        scrollOffset,
      behavior: 'smooth',
    })

    // Only scroll when tab changes (i.e. changes in scrollOffset should only
    // take effect after a tab change).
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTabId])

  return {
    tabBarRef,
    tabContainerRef,
  }
}
