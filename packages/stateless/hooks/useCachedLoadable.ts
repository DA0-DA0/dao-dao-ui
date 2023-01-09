import { useEffect, useState } from 'react'
import { RecoilValue, constSelector, useRecoilValueLoadable } from 'recoil'

import { CachedLoadable } from '@dao-dao/types'

// Keep cache of previously loaded data until next data is ready. Essentially,
// memoize a loadable to prevent UI flickering. If recoilValue is undefined,
// pretend like we are loading until we get a selector to load. This may happen
// if a query depends on data not available right away, such as a wallet
// address.
export const useCachedLoadable = <T extends unknown>(
  recoilValue: RecoilValue<T> | undefined
): CachedLoadable<T> => {
  const loadable = useRecoilValueLoadable(
    // If not on a browser, or recoilValue is undefined, return undefined as we
    // cannot load yet.
    typeof window === 'undefined' || !recoilValue
      ? constSelector(undefined)
      : recoilValue
  )
  const loadableLoadingOrNotReady =
    loadable.state === 'loading' ||
    typeof window === 'undefined' ||
    !recoilValue

  // Since `contents` is set in a `useEffect`, it will take 1 extra render once
  // the loadable has data ready before the cached `contents` state will contain
  // the loaded value. This flag ensures that loading continues to display until
  // `contents` has been updated with its first `loadable.contents` value. If we
  // didn't do this, there would be a moment where `state === "hasValue"` with
  // `contents` still undefined.
  const [contentsHasValue, setContentsHasValue] = useState(
    // If the loadable is ready on first render, just set it right away.
    loadable.state === 'hasValue'
  )
  const [contents, setContents] = useState<T | undefined>(
    // If the loadable is ready on first render, just set it right away.
    loadable.state === 'hasValue' ? loadable.contents : undefined
  )
  const [initialLoading, setInitialLoading] = useState(
    loadableLoadingOrNotReady
  )
  const [updating, setUpdating] = useState(loadableLoadingOrNotReady)

  useEffect(() => {
    if (loadableLoadingOrNotReady) {
      setUpdating(true)
      // Reset state if recoilValue becomes undefined. This may happen if a
      // query depends on form input state, like an address, that may toggle
      // between valid and invalid. This ensures that old data is not shown
      // for a moment while waiting for a new query.
      if (!recoilValue) {
        setInitialLoading(true)
        setContents(undefined)
        setContentsHasValue(false)
      }
    } else if (loadable.state === 'hasValue') {
      setInitialLoading(false)
      setUpdating(false)
      setContents(loadable.contents)
      setContentsHasValue(true)
    } else if (loadable.state === 'hasError') {
      setInitialLoading(false)
      setUpdating(false)
    }
  }, [loadable, loadableLoadingOrNotReady, recoilValue])

  return initialLoading ||
    !recoilValue ||
    // Keep loading until contents has first value set. However if an error is
    // present, override and return the error.
    (loadable.state !== 'hasError' && !contentsHasValue)
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
