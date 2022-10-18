import Fuse from 'fuse.js'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'

import { SearchBarProps } from '../components'

interface UseSearchFilterReturn<T> {
  searchBarProps: SearchBarProps
  filteredData: T[]
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
  useEffect(() => {
    fuse.setCollection(data)
  }, [data, fuse])

  const [filter, setFilter] = useState('')
  const filteredData = useMemo(
    () => (filter ? fuse.search(filter).map(({ item }) => item) : [...data]),
    [filter, fuse, data]
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
