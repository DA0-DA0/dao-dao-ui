import Fuse from 'fuse.js'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'

import { SearchBarProps } from '../components'

interface UseSearchFilterReturn<T> {
  searchBarProps: SearchBarProps
  filteredData: { item: T; originalIndex: number }[]
  setFilter: Dispatch<SetStateAction<string>>
}

// Pass an array of data and filterable keys, and get `searchBarProps` (for
// passing to `SearchBar`) and memoized `filteredData`.
export const useSearchFilter = <T extends unknown>(
  data: T[],
  filterableKeys: Fuse.FuseOptionKey<T>[],
  options?: Fuse.IFuseOptions<T>
): UseSearchFilterReturn<T> => {
  const [fuse, setFuse] = useState<Fuse<T>>(() =>
    makeFuse(data, filterableKeys, options)
  )
  // Make new fuse when keys or options change. Update existing fuse when data
  // changes.
  useEffect(() => {
    setFuse(makeFuse(data, filterableKeys, options))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterableKeys, options])

  // Trigger re-filter when collection is updated. Use deep compare to prevent
  // unnecessary re-renders when the collection is updated with the same data,
  // since data will often be passed in un-memoized. We want to prevent
  // re-renders due to reference changes, but not due to deep changes.
  const [collectionId, setCollectionId] = useState(0)
  useDeepCompareEffect(() => {
    fuse.setCollection(data)
    setCollectionId((id) => id + 1)
  }, [fuse, data])

  const [filter, setFilter] = useState('')
  const filteredData = useMemo(
    () =>
      filter
        ? fuse.search(filter).map(({ item, refIndex }) => ({
            item,
            originalIndex: refIndex,
          }))
        : data.map((item, originalIndex) => ({
            item,
            originalIndex,
          })),
    // Data is deep-compared above, and collectionId is manually updated when
    // the data deeply changes, so we can safely not depend on data here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filter, fuse, collectionId]
  )

  return {
    searchBarProps: {
      onChange: (event) => setFilter(event.target.value),
      value: filter,
    },
    filteredData,
    setFilter,
  }
}

const makeFuse = <T extends unknown>(
  data: T[],
  keys: Fuse.FuseOptionKey<T>[],
  options?: Fuse.IFuseOptions<T>
) => new Fuse(data, { keys, ...options })
