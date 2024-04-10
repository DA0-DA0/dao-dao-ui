import { useRef } from 'react'

/**
 * Create ref that is updated on every render. This effectively memoizes the
 * value so it can be used in effects without causing constant re-renders.
 */
export const useUpdatingRef = <T extends unknown>(value: T) => {
  const ref = useRef(value)
  ref.current = value
  return ref
}
