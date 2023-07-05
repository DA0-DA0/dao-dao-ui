import { RefCallback, useCallback, useEffect, useRef, useState } from 'react'

export type UseDetectTruncateReturn = {
  textRef: RefCallback<HTMLParagraphElement | null>
  truncated: boolean
}

// This hook detects when text is truncated.
//
// To use it, simply call this hook, and then assign the `textRef` to the
// appropriate element. The `truncated` value will be updated when the text is
// truncated.
export const useDetectTruncate = (): UseDetectTruncateReturn => {
  const [truncated, setTruncated] = useState(false)

  // Detect when the recipient wraps to the next page to change arrow.
  const [refSet, setRefSet] = useState(0)
  const _textRef = useRef<HTMLParagraphElement | null>(null)
  const textRef: RefCallback<HTMLParagraphElement> = useCallback((node) => {
    _textRef.current = node
    setRefSet((refSet) => refSet + 1)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const onResize = () => {
      if (!_textRef.current) {
        return
      }

      const { offsetWidth, scrollWidth } = _textRef.current

      setTruncated(scrollWidth > offsetWidth)
    }

    // Trigger initial set.
    onResize()

    // Observe changes to the container and child elements.
    const observer = new ResizeObserver(onResize)
    if (_textRef.current) {
      observer.observe(_textRef.current)
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
    textRef,
    truncated,
  }
}
