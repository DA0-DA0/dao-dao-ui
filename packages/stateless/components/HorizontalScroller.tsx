import clsx from 'clsx'
import {
  ComponentType,
  UIEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useInView } from 'react-intersection-observer'

import { LoadingData } from '@dao-dao/types'

import { Loader } from './logo'

export interface HorizontalScrollerProps<P extends {}> {
  Component: ComponentType<P>
  items: LoadingData<P[]>
  itemClassName?: string
  containerClassName?: string
  shadowClassName?: string
}

export const HorizontalScroller = <P extends {}>({
  Component,
  items,
  itemClassName,
  containerClassName,
  shadowClassName,
}: HorizontalScrollerProps<P>) => {
  const [clonesWidth, setClonesWidth] = useState(0)
  const [autoscroll, setAutoscroll] = useState(true)

  const scrollRef = useRef<HTMLDivElement | null>(null)
  // Prevent autoscroll if user scrolled within past 150ms. Replicate a scroll
  // end event by clearing and resetting a timer on scroll.
  const userScrolling = useRef(false)
  const userScrollingTimer = useRef<ReturnType<typeof setTimeout>>()

  // Don't scroll this element if it isn't visible as the scrolling is a
  // reasonably heavy operation.
  const { ref: viewRef, inView: componentIsVisible } = useInView()

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
    },
    [clonesWidth]
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
    <div className={clsx('relative', containerClassName)}>
      {/* Left shadow */}
      <div
        className={clsx('absolute top-0 bottom-0 left-0 z-10', shadowClassName)}
        style={{
          background:
            'linear-gradient(to left, rgba(var(--color-background-base), 0), rgba(var(--color-background-base), 1) 100%)',
        }}
      ></div>

      {items.loading ? (
        <Loader />
      ) : (
        <div
          className="no-scrollbar w-full overflow-scroll"
          onMouseEnter={() => setAutoscroll(false)}
          onMouseLeave={() => setAutoscroll(true)}
          onScroll={handleScroll}
          onTouchStart={() => {
            userScrolling.current = true
          }}
          ref={(r) => {
            scrollRef.current = r
            viewRef(r)
          }}
        >
          <div className="flex w-max flex-row gap-4 py-1">
            {items.data.map((item, index) => (
              <div key={index} className={itemClassName}>
                <Component {...item} />
              </div>
            ))}
            {items.data.map((item, index) => (
              <div key={index} className={clsx('is-clone', itemClassName)}>
                <Component {...item} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Right shadow */}
      <div
        className={clsx(
          'absolute top-0 right-0 bottom-0 z-10',
          shadowClassName
        )}
        style={{
          background:
            'linear-gradient(to right, rgba(var(--color-background-base), 0), rgba(var(--color-background-base), 1) 100%)',
        }}
      ></div>
    </div>
  )
}
