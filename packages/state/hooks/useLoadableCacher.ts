import { useEffect, useState } from 'react'
import { RecoilValue, useRecoilValueLoadable } from 'recoil'

export type LoadableCacherReturn<T> =
  | {
      state: 'loading'
      contents: undefined
    }
  | {
      state: 'hasValue'
      contents: T
      updating: boolean
    }
  | {
      state: 'hasError'
      contents: any
    }

// Keep cache of previously loaded data until next data is ready. Essentially,
// memoize a loadable to prevent UI flickering.
export const useLoadableCacher = <T extends unknown>(
  recoilValue: RecoilValue<T>
): LoadableCacherReturn<T> => {
  const loadable = useRecoilValueLoadable(recoilValue)

  const [contents, setContents] = useState<T | undefined>(
    loadable.state === 'hasValue' ? loadable.contents : undefined
  )
  const [initialLoading, setInitialLoading] = useState(
    loadable.state === 'loading'
  )
  const [updating, setUpdating] = useState(loadable.state === 'loading')

  useEffect(() => {
    if (loadable.state === 'loading') {
      setUpdating(true)
    } else if (loadable.state === 'hasValue') {
      setInitialLoading(false)
      setUpdating(false)
      setContents(loadable.contents)
    } else if (loadable.state === 'hasError') {
      setInitialLoading(false)
      setUpdating(false)
    }
  }, [loadable])

  return initialLoading
    ? {
        state: 'loading',
        contents: undefined,
      }
    : loadable.state === 'hasError'
    ? {
        state: 'hasError',
        contents: loadable.contents,
      }
    : {
        state: 'hasValue',
        contents: contents as T,
        updating,
      }
}
