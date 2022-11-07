import {
  ComponentType,
  UIEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { DaoCardInfo, LoadingData } from '@dao-dao/types'
import { useIsVisible } from '@dao-dao/utils'

import { Loader } from '../logo/Loader'

export interface FeaturedDaosProps {
  DaoCard: ComponentType<DaoCardInfo>
  featuredDaos: LoadingData<DaoCardInfo[]>
}

export const FeaturedDaos = ({ DaoCard, featuredDaos }: FeaturedDaosProps) => {
  const [clonesWidth, setClonesWidth] = useState(0)
  const [autoscroll, setAutoscroll] = useState(true)

  const scrollRef = useRef<HTMLDivElement | null>(null)
  const mirrorRef = useRef<HTMLDivElement | null>(null)
  // Prevent autoscroll if user scrolled within past 150ms. Replicate a scroll
  // end event by clearing and resetting a timer on scroll.
  const userScrolling = useRef(false)
  const userScrollingTimer = useRef<ReturnType<typeof setTimeout>>()

  // Don't scroll this element if it isn't visible as the scrolling is a
  // reasonably heavy operation.
  const scrollVisible = useIsVisible(scrollRef)
  const mirrorVisible = useIsVisible(mirrorRef)
  const componentIsVisible = scrollVisible || mirrorVisible

  const handleScroll: UIEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      // Clear timeout if exists so we can reset it.
      if (userScrollingTimer.current) {
        clearTimeout(userScrollingTimer.current)
      }
      // Reset timer to unset user scrolling in 150ms.
      userScrollingTimer.current = setTimeout(() => {
        userScrolling.current = false
        userScrollingTimer.current = undefined
      }, 150)

      const container = e.currentTarget
      const scrollPos = container.scrollLeft
      const scrollWidth = container.scrollWidth
      const divWidth = container.clientWidth

      if (scrollPos >= scrollWidth - divWidth) {
        // Scroll to the end of the non-clones. This will put us in a
        // position where we have the last element followed by the
        // clones. Subtracting div-width has the effect of placing the
        // end of the scroll view at the end of the clones.
        container.scrollLeft = clonesWidth - divWidth
      } else if (scrollPos <= 0) {
        // Scroll to the beginning of the clones. This will put us in
        // a position where we have the first element with the
        // non-clones behind us.
        container.scrollLeft = scrollWidth - clonesWidth
      }

      // Invert the scroll position of the mirror.
      if (mirrorRef && mirrorRef.current) {
        mirrorRef.current.scrollLeft =
          scrollWidth - divWidth - container.scrollLeft
      }
    },
    [clonesWidth, mirrorRef]
  )

  // Set the width of the clones once this component mounts.
  useEffect(() => {
    const clones = document.getElementsByClassName('is-clone')
    const clonesArray = Array.from(clones)
    const width = clonesArray.reduce(
      (accum, { clientWidth }) => accum + clientWidth,
      0
    )
    // We use 16 pixels of padding between each element so we need to
    // add that information when considering the width.
    setClonesWidth(width + 16 * clonesArray.length)
  }, [])

  useEffect(() => {
    if (!autoscroll || !componentIsVisible) {
      return
    }

    const interval = setInterval(() => {
      if (scrollRef.current && !userScrolling.current) {
        scrollRef.current.scrollBy(1, 0)
      }
    }, 50)
    return () => clearInterval(interval)
  }, [autoscroll, componentIsVisible])

  return (
    <div
      className="no-scrollbar w-full overflow-scroll"
      onMouseEnter={() => setAutoscroll(false)}
      onMouseLeave={() => setAutoscroll(true)}
      onScroll={handleScroll}
      onTouchStart={() => {
        userScrolling.current = true
      }}
      ref={scrollRef}
    >
      {featuredDaos.loading ? (
        <Loader />
      ) : (
        <div className="flex w-max flex-row gap-4 py-1">
          {featuredDaos.data.map((props) => (
            <DaoCard
              key={props.coreAddress}
              className="!w-[260px]"
              showIsMember={false}
              {...props}
            />
          ))}
          {featuredDaos.data.map((props) => (
            <DaoCard
              key={props.coreAddress}
              className="is-clone !w-[260px]"
              showIsMember={false}
              {...props}
            />
          ))}
        </div>
      )}
    </div>
  )
}
