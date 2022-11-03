import { RefObject, useEffect, useState } from 'react'

export const useIsVisible = (ref: RefObject<Element>) => {
  const [isVisible, setState] = useState(false)

  useEffect(() => {
    // Copy element into useEffect so that we're sure to unobserve the same one we started with.
    const element = ref

    const observer = new IntersectionObserver(
      ([entry]) => {
        setState(entry.isIntersecting)
      },
      { rootMargin: '0px' }
    )

    element.current && observer.observe(element.current)

    return () => {
      if (element.current) observer.unobserve(element.current)
    }
  }, [ref])

  return isVisible
}
