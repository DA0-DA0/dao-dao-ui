import { useCallback, useEffect, useRef, useState } from 'react'

// Pass `null` to left, right, or width to skip setting that property.
export type UseTrackDropdownOptions = {
  // Default: rect.bottom
  top?: (rect: DOMRect) => number
  // Default: rect.left
  left?: null | ((rect: DOMRect) => number)
  // Default: null
  right?: null | ((rect: DOMRect) => number)
  // Default: rect.width
  width?: null | ((rect: DOMRect) => number)
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
  right = null,
  width,
}: UseTrackDropdownOptions = {}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)

  const updateRect = () => {
    if (!dropdownRef.current) {
      return
    }

    // On iOS Safari, when the keyboard is open, the entire body is offset,
    // which makes the dropdown positioned incorrectly since it is fixed above
    // everything. The body is offset by the height of the keyboard, so we can
    // use it to fix the position. On desktop browsers, this should be 0.
    const topOffset = document.body.getBoundingClientRect().top ?? 0

    const rect = trackRef.current?.getBoundingClientRect()
    if (rect) {
      dropdownRef.current.style.top = `${
        (top?.(rect) ?? rect.bottom) - topOffset
      }px`
      if (left !== null) {
        dropdownRef.current.style.left = `${left?.(rect) ?? rect.left}px`
      }
      if (right !== null) {
        dropdownRef.current.style.right = `${right?.(rect) ?? rect.width}px`
      }
      if (width !== null) {
        dropdownRef.current.style.width = `${width?.(rect) ?? rect.width}px`
      }
    }
  }

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

    // Update on a timer to catch other changes.
    const timer = setInterval(updateRectRef.current, 250)

    return () => {
      observer.disconnect()
      clearInterval(timer)
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
