import { useEffect, useRef, useState } from 'react'

// Calls a callback with the milliseconds elapsed since the first frame. Returns
// a function to start and stop the animation.
export const useAnimationFrame = (callback: FrameRequestCallback) => {
  const [animating, setAnimating] = useState(false)

  const requestRef = useRef<number>()
  const startTimestampMsRef = useRef<number>()

  const animate: FrameRequestCallback = (timestampMs) => {
    if (startTimestampMsRef.current === undefined) {
      startTimestampMsRef.current = timestampMs
    }
    callback(timestampMs - startTimestampMsRef.current)

    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    if (!animating) {
      requestRef.current = undefined
      startTimestampMsRef.current = undefined
      return
    }

    requestRef.current = requestAnimationFrame(animate)
    // Cancel on cleanup.
    return () => {
      if (requestRef.current !== undefined) {
        cancelAnimationFrame(requestRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animating])

  return {
    animating,
    setAnimating,
  }
}
