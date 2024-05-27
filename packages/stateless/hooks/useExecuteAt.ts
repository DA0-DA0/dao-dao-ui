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
    const dateTime = date?.getTime()
    // Check if date defined and valid.
    if (!dateTime || isNaN(dateTime)) {
      return
    }

    const msRemaining = dateTime - Date.now()
    if (msRemaining < 0) {
      return
    }

    const timeout = setTimeout(() => fnRef.current(), msRemaining)
    return () => clearTimeout(timeout)
  }, [date, fnRef])
}
