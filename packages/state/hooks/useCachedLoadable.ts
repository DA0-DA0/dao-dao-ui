import { useEffect, useState } from 'react'
import { RecoilValue, constSelector, useRecoilValueLoadable } from 'recoil'

import { CachedLoadable } from '@dao-dao/tstypes'

// Keep cache of previously loaded data until next data is ready. Essentially,
// memoize a loadable to prevent UI flickering. If recoilValue is undefined,
// pretend like we are loading until we get a selector to load. This may happen
// if a query depends on data not available right away, such as a wallet
// address.
export const useCachedLoadable = <T extends unknown>(
  recoilValue: RecoilValue<T> | undefined
): CachedLoadable<T> => {
  const loadable = useRecoilValueLoadable(
    recoilValue ?? constSelector(undefined)
  )
  const loadableLoading = loadable.state === 'loading' || !recoilValue

  const [contents, setContents] = useState<T | undefined>(
    loadable.state === 'hasValue' ? loadable.contents : undefined
  )
  const [initialLoading, setInitialLoading] = useState(loadableLoading)
  const [updating, setUpdating] = useState(loadable.state === 'loading')

  useEffect(() => {
    if (loadableLoading) {
      setUpdating(true)
    } else if (loadable.state === 'hasValue') {
      setInitialLoading(false)
      setUpdating(false)
      setContents(loadable.contents)
    } else if (loadable.state === 'hasError') {
      setInitialLoading(false)
      setUpdating(false)
    }
  }, [loadable, loadableLoading, recoilValue])

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
