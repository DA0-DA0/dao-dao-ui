import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

export type UseQuerySyncedStateOptions<T extends unknown> = {
  param: string
  defaultValue: T
}

export type UseQuerySyncedStateReturn<T extends unknown> = [
  T,
  Dispatch<SetStateAction<T>>
]

/**
 * Creates a piece of state that automatically syncs with a query parameter in
 * the URL. This may be used to store a page in the URL, for example. It is
 * important to ensure that the parameter is unique if this is used multiple
 * times on the same page. Otherwise an infinite loop will occur as the hooks
 * will bounce back and forth.
 *
 * @param {UseQuerySyncedStateOptions<T>} options - The options for the
 * function.
 * @param {T} options.param - The query parameter.
 * @param {T} options.defaultValue - The state's default value.
 * @return {UseQuerySyncedStateReturn<T>} - The value and its setter function,
 * in the same format as `useState`: `[value, setValue]`.
 */
export const useQuerySyncedState = <T = string | number>({
  param,
  defaultValue,
}: UseQuerySyncedStateOptions<T>): UseQuerySyncedStateReturn<T> => {
  const router = useRouter()
  const [value, setValue] = useState(defaultValue)

  // On site load, set initial value from query parameter.
  const pageInitialized = useRef(false)
  useEffect(() => {
    if (pageInitialized.current) {
      return
    }
    pageInitialized.current = true

    const initialValue = router.query[param]
    if (typeof initialValue === 'string') {
      setValue(
        (typeof value === 'string'
          ? initialValue
          : typeof value === 'number'
          ? Number(initialValue)
          : initialValue) as any
      )
    }
  }, [param, router.query, value])

  // On value change, store in query parameter. If default, remove.
  useEffect(() => {
    if (value === defaultValue) {
      delete router.query[param]
    } else {
      router.query[param] =
        typeof value === 'number' ? BigInt(value).toString() : `${value}`
    }
    router.push(router, undefined, { shallow: true })
  }, [value, router, param, defaultValue])

  return [value, setValue]
}
