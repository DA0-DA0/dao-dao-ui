import { RefCallback, useCallback, useEffect, useRef, useState } from 'react'

export type UseInfiniteScrollOptions = {
  /**
   * The callback to execute when moving to the next page.
   */
  loadMore: () => void
  /**
   * The infinite scroll factor is how close to the bottom the user has to be to
   * load more. 0 triggers loading when scrolled all the way to the bottom, and
   * 0.5 triggers loading when the user has half the screen remaining before the
   * bottom. 1 will ensure there is at least a screen's height worth of items
   * are loaded.
   *
   * Defaults to 1. Disabled if negative.
   */
  infiniteScrollFactor?: number
  /**
   * Disable infinite scroll.
   */
  disabled?: boolean
}

export type UseInfiniteScrollReturn = {
  /**
   * The ref to set on the container.
   */
  infiniteScrollRef: RefCallback<HTMLElement>
}

/**
 * A hook that triggers a callback when the user scrolls to the bottom of the
 * container, as determined by the bottom of the container reaching a certain
 * threshold below the bottom of the window.
 *
 * The returned `infiniteScrollRef` should be set on the container element.
 */
export const useInfiniteScroll = ({
  loadMore,
  infiniteScrollFactor = 1,
  disabled,
}: UseInfiniteScrollOptions): UseInfiniteScrollReturn => {
  const [element, setElement] = useState<HTMLElement | null>(null)
  const infiniteScrollRef = useCallback(
    (node: HTMLElement | null) => setElement(node),
    [setElement]
  )

  // Memoize loadMore in case it changes between renders.
  const loadMoreRef = useRef(loadMore)
  loadMoreRef.current = loadMore

  useEffect(() => {
    if (
      disabled ||
      !element ||
      infiniteScrollFactor < 0 ||
      typeof window === 'undefined'
    ) {
      return
    }

    let executedLoadingMore = false
    const onScroll = () => {
      if (executedLoadingMore) {
        return
      }

      // Check if container is near the bottom.
      const { bottom } = element.getBoundingClientRect()
      if (
        bottom - window.innerHeight * infiniteScrollFactor <=
        window.innerHeight
      ) {
        loadMoreRef.current()

        // Prevent spamming load more function.
        executedLoadingMore = true
        setTimeout(() => {
          executedLoadingMore = false
          onScroll()
        }, 250)
      }
    }

    onScroll()

    // Set third argument to `true` to capture all scroll events instead of
    // waiting for them to bubble up.
    window.addEventListener('scroll', onScroll, true)
    return () => window.removeEventListener('scroll', onScroll, true)
  }, [infiniteScrollFactor, disabled, element])

  return {
    infiniteScrollRef,
  }
}
