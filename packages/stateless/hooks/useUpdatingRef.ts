import { useRef } from 'react'

import { ImmutableRef } from '@dao-dao/types'

/**
 * Create ref that is updated on every render. This effectively memoizes the
 * value so it can be used in effects without causing constant re-renders.
 */
export const useUpdatingRef = <T extends unknown>(
  value: T
): ImmutableRef<T> => {
  const ref = useRef(value)
  ref.current = value
  return ref
}
