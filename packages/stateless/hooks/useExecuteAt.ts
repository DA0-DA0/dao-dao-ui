import { useEffect } from 'react'

import { useUpdatingRef } from './useUpdatingRef'

export type UseExecuteAtOptions = {
  /**
   * The function to execute.
   */
  fn: () => void
  /**
   * The date at which to execute the function. If undefined, the function will
   * not fire.
   */
  date: Date | undefined
}

/**
 * A hook to execute a function at a specific date in the future.
 */
export const useExecuteAt = ({ fn, date }: UseExecuteAtOptions) => {
  const fnRef = useUpdatingRef(fn)

  useEffect(() => {
    if (!date) {
      return
    }

    const msRemaining = date.getTime() - Date.now()
    if (msRemaining < 0) {
      return
    }

    const timeout = setTimeout(() => fnRef.current(), msRemaining)
    return () => clearTimeout(timeout)
  }, [date, fnRef])
}
