import { useCallback, useEffect, useRef, useState } from 'react'

export type UseTrackDropdownOptions = {
  // Default: rect.bottom
  top?: (rect: DOMRect) => number
  // Default: rect.left
  left?: (rect: DOMRect) => number
  // Default: rect.width
  width?: (rect: DOMRect) => number
}

// This hook tracks the rect of an element on the page and positions a dropdown
// relative to it. Pass the dropdown ref to the hook, and get a ref returned
// that should be set on the element you want to track. The hook will update the
// dropdown when things resize and scroll. The dropdown will be positioned below
// the tracked element by default, but the options let you customize the final
// position.
export const useTrackDropdown = ({
  top,
  left,
  width,
}: UseTrackDropdownOptions = {}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)

  const updateRect = useCallback(() => {
    if (!dropdownRef.current) {
      return
    }

    const rect = trackRef.current?.getBoundingClientRect()
    if (rect) {
      dropdownRef.current.style.top = `${top?.(rect) ?? rect.bottom}px`
      dropdownRef.current.style.left = `${left?.(rect) ?? rect.left}px`
      dropdownRef.current.style.width = `${width?.(rect) ?? rect.width}px`
    }
  }, [dropdownRef, top, left, width])

  // Memoize ref to prevent listener from resetting on every render.
  const updateRectRef = useRef(updateRect)
  updateRectRef.current = updateRect

  // Update the rect of the element on window scroll and resize.
  useEffect(() => {
    // The third argument set to `true` makes the event fire when any scroll
    // event happens, not just when the window is scrolled. The actual
    // scrollable container is some parent element.
    window.addEventListener('scroll', updateRectRef.current, true)
    window.addEventListener('resize', updateRectRef.current, true)

    return () => {
      window.removeEventListener('scroll', updateRectRef.current)
      window.removeEventListener('resize', updateRectRef.current)
    }
  }, [])

  // Trigger state change when element is set so the effect below runs.
  const [dropdownReady, setDropdownReady] = useState(false)
  const [trackReady, setElementReady] = useState(false)

  // Update the rect when both elements are ready.
  useEffect(() => {
    if (dropdownReady && trackReady) {
      updateRectRef.current()
    }
  }, [dropdownReady, trackReady])

  // Use a ResizeObserver to update the rect when the element changes size.
  useEffect(() => {
    if (!trackRef.current) {
      return
    }

    const observer = new ResizeObserver(updateRectRef.current)
    observer.observe(trackRef.current)

    return () => {
      observer.disconnect()
    }
  }, [trackReady])

  // Use a callback ref so we can trigger a state change to update.
  const onDropdownRef = useCallback((element: HTMLDivElement | null) => {
    dropdownRef.current = element
    setDropdownReady(!!element)
  }, [])

  // Use a callback ref so we can trigger a state change to activate the
  // ResizeObserver when the ref is ready.
  const onTrackRef = useCallback((element: HTMLDivElement | null) => {
    trackRef.current = element
    setElementReady(!!element)
  }, [])

  return {
    onDropdownRef,
    onTrackRef,
  }
}
