import { useEffect, useRef, useState } from 'react'

// This hook tracks the rect of an element on the page. This can be used to
// position elements around other elements on the page dynamically, such as
// adding a popup that should render above other elements but still appear to be
// attached to a specific element. Set the ref on the element you want to track
// and use the rect to position the element you want to render.
export const useTrackElement = () => {
  const [rect, setRect] = useState<DOMRect>()
  const elementRef = useRef<HTMLDivElement | null>(null)
  // Get the rect of the element and update on window scroll and resize.
  useEffect(() => {
    const updateRect = () => {
      setRect(elementRef.current?.getBoundingClientRect())
    }
    updateRect()

    window.addEventListener('scroll', updateRect)
    window.addEventListener('resize', updateRect)

    return () => {
      window.removeEventListener('scroll', updateRect)
      window.removeEventListener('resize', updateRect)
    }
  }, [])

  return {
    elementRef,
    rect,
  }
}
