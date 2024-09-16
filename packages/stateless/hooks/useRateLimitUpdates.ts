import { DependencyList, useEffect, useRef, useState } from 'react'

import { useUpdatingRef } from './useUpdatingRef'

export type UseRateLimitUpdatesOptions<T> = {
  /**
   * Value to rate limit updates for.
   */
  value: T
  /**
   * Delay in milliseconds.
   */
  delay: number
  /**
   * Optionally override the dependencies, replacing the value. The delay is
   * always included.
   */
  deps?: DependencyList
}

export type UseRateLimitUpdatesReturn<T> = {
  /**
   * The rate limited value.
   */
  value: T
  /**
   * Which iteration of the rate limit this is.
   */
  iteration: number
}

/**
 * A hook that rate limits updates to a value. It will update the value once per
 * delay, when the value changes. This is like a debounce, except it will update
 * at least once per delay instead of once it stops changing.
 */
export const useRateLimitUpdates = <T>({
  value,
  delay,
  deps,
}: UseRateLimitUpdatesOptions<T>): UseRateLimitUpdatesReturn<T> => {
  const [rateLimited, setRateLimited] = useState(value)
  const [iteration, setIteration] = useState(0)

  const latestValueRef = useUpdatingRef(value)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (timeoutRef.current) {
      return
    }

    timeoutRef.current = setTimeout(() => {
      setRateLimited(latestValueRef.current)
      setIteration((i) => i + 1)
      timeoutRef.current = null
    }, delay)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, latestValueRef, ...(deps || [value])])

  return {
    value: rateLimited,
    iteration,
  }
}
