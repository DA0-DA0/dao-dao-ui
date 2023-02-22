import { useCallback, useEffect, useRef, useState } from 'react'

// This hook tracks the rect of an element on the page. This can be used to
// position elements around other elements on the page dynamically, such as
// adding a popup that should render above other elements but still appear to be
// attached to a specific element. Set the ref on the element you want to track
// and use the rect to position the element you want to render. A manual update
// function is also provided to update the rect if any other events occur.
export const useTrackElement = () => {
  const ref = useRef<HTMLDivElement | null>(null)

  const [rect, setRect] = useState<DOMRect>()
  const updateRect = useCallback(
    () => setRect(ref.current?.getBoundingClientRect()),
    []
  )

  // Update the rect of the element on window scroll and resize.
  useEffect(() => {
    updateRect()

    window.addEventListener('scroll', updateRect)
    window.addEventListener('resize', updateRect)

    return () => {
      window.removeEventListener('scroll', updateRect)
      window.removeEventListener('resize', updateRect)
    }
  }, [updateRect])

  // Trigger state change when element is set so the effect below runs.
  const [elementReady, setElementReady] = useState(false)
  // Use a ResizeObserver to update the rect when the element changes size.
  useEffect(() => {
    if (!ref.current) {
      return
    }

    const observer = new ResizeObserver(updateRect)
    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [elementReady, updateRect])

  // Use a callback ref so we can trigger a state change to activate the
  // ResizeObserver when the ref is ready.
  const elementRef = useCallback(
    (element: HTMLDivElement | null) => {
      ref.current = element
      setElementReady(!!element)
    },
    [ref]
  )

  return {
    elementRef,
    rect,
    updateRect,
  }
}
