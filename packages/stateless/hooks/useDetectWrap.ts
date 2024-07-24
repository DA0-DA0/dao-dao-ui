import { RefCallback, useCallback, useEffect, useRef, useState } from 'react'

export type UseDetectWrapReturn = {
  containerRef: RefCallback<HTMLElement | null>
  childRef: RefCallback<HTMLElement | null>
  wrapped: boolean
}

/*
 * This hook detects when the child falls below the top of the container. It is
 * not wrapped when the top of the child is the same as the top of the
 * container. This may be used, for example, to detect when a flex item wraps to
 * the next line in a flex row container. See the `Spend` action component for
 * example usage.
 *
 * To use it, add the refs to the `ref` property of the corresponding components
 * in the caller. The `wrapped` value will be updated when the child wraps
 * beneath the top of the container.
 */
export const useDetectWrap = (): UseDetectWrapReturn => {
  const [wrapped, setWrapped] = useState(false)

  // Detect when the recipient wraps to the next page to change arrow.
  const [refSet, setRefSet] = useState(0)
  const _containerRef = useRef<HTMLElement | null>(null)
  const containerRef: RefCallback<HTMLElement> = useCallback((node) => {
    _containerRef.current = node
    setRefSet((refSet) => refSet + 1)
  }, [])
  const _childRef = useRef<HTMLElement | null>(null)
  const childRef: RefCallback<HTMLElement> = useCallback((node) => {
    _childRef.current = node
    setRefSet((refSet) => refSet + 1)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const updateWrap = () => {
      if (!_containerRef.current || !_childRef.current) {
        return
      }

      const containerTop = _containerRef.current.offsetTop
      const childTop = _childRef.current.offsetTop

      setWrapped(childTop > containerTop)
    }

    // Trigger initial set.
    updateWrap()

    // Observe changes to the container and child elements.
    const observer = new ResizeObserver(updateWrap)
    if (_containerRef.current) {
      observer.observe(_containerRef.current)
    }
    if (_childRef.current) {
      observer.observe(_childRef.current)
    }

    // Trigger re-render when window is resized.
    window.addEventListener('resize', updateWrap)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateWrap)
    }

    // Trigger re-render when refs are set.
  }, [refSet])

  return {
    containerRef,
    childRef,
    wrapped,
  }
}
