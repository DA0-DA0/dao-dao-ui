import { RefCallback, useCallback, useEffect, useRef, useState } from 'react'

export type UseDetectWrapReturn = {
  containerRef: RefCallback<HTMLDivElement | null>
  childRef: RefCallback<HTMLDivElement | null>
  wrapped: boolean
}

// This hook detects when the child wraps beneath the container. It is not
// wrapped when the top of the child is the same as the top of the container.
// This may be used, for example, to detect when a flex item wraps to the next
// line in a flex row container. See the `Spend` action component for example
// usage.
//
// To use it, simply call this hook, and then assign the `containerRef` and
// `childRef` to the appropriate elements. The `wrapped` value will be updated
// when the child wraps beneath the container.
export const useDetectWrap = (): UseDetectWrapReturn => {
  const [wrapped, setWrapped] = useState(false)

  // Detect when the recipient wraps to the next page to change arrow.
  const [refSet, setRefSet] = useState(0)
  const _containerRef = useRef<HTMLDivElement | null>(null)
  const containerRef: RefCallback<HTMLDivElement> = useCallback((node) => {
    _containerRef.current = node
    setRefSet((refSet) => refSet + 1)
  }, [])
  const _childRef = useRef<HTMLDivElement | null>(null)
  const childRef: RefCallback<HTMLDivElement> = useCallback((node) => {
    _childRef.current = node
    setRefSet((refSet) => refSet + 1)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const onResize = () => {
      if (!_containerRef.current || !_childRef.current) {
        return
      }

      const containerWidth = _containerRef.current.offsetTop
      const childWidth = _childRef.current.offsetTop

      setWrapped(childWidth > containerWidth)
    }

    // Trigger initial set.
    onResize()

    // Observe changes to the container and child elements.
    const observer = new ResizeObserver(onResize)
    if (_containerRef.current) {
      observer.observe(_containerRef.current)
    }
    if (_childRef.current) {
      observer.observe(_childRef.current)
    }

    // Trigger re-render when window is resized.
    window.addEventListener('resize', onResize)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', onResize)
    }

    // Trigger re-render when refs are set.
  }, [refSet])

  return {
    containerRef,
    childRef,
    wrapped,
  }
}
