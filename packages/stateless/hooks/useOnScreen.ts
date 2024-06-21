import { useEffect, useState } from 'react'

/**
 * A hook that returns whether or not the given element is currently on screen.
 *
 * Inspired by https://stackoverflow.com/a/67826055
 */
export const useOnScreen = (element: HTMLElement | null) => {
  const [isOnScreen, setIsOnScreen] = useState(false)
  const [observer] = useState(
    () =>
      new IntersectionObserver(([entry]) => setIsOnScreen(entry.isIntersecting))
  )

  useEffect(() => {
    if (!element) {
      return
    }

    observer.observe(element)
    return () => observer.disconnect()
  }, [observer, element])

  return isOnScreen
}
