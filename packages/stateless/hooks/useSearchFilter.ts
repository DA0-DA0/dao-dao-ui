import Fuse from 'fuse.js'
import {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { SearchBarProps } from '@dao-dao/types'

import { useQuerySyncedState } from './useQuerySyncedState'
import { useUpdatingRef } from './useUpdatingRef'

export type UseSearchFilterOptions<T> = {
  /**
   * Data to filter.
   */
  data: T[]
  /**
   * The filterable keys for the dataset.
   */
  filterableKeys: Fuse.FuseOptionKey<T>[]
  /**
   * Optional Fuse options.
   */
  options?: Fuse.IFuseOptions<T>
  /**
   * Optionally store the search param in the URL query string.
   */
  querySyncedParam?: string
  /**
   * Optionally add a filter change callback listener.
   */
  onFilterChange?: (filter: string) => void
}

export type UseSearchFilterReturn<T> = {
  /**
   * Props to pass through to the `SearchBar` component.
   */
  searchBarProps: SearchBarProps
  /**
   * The filtered data.
   */
  filteredData: { item: T; originalIndex: number }[]
  /**
   * The filter string.
   */
  filter: string
  /**
   * A function that lets setting the search filter.
   */
  setFilter: Dispatch<SetStateAction<string>>
}

// Pass an array of data and filterable keys, and get `searchBarProps` (for
// passing to `SearchBar`) and memoized `filteredData`.
//
// NOTE: `data` is often un-memoized, so it is very important not to update any
// state when `data` changes. Doing so could lead to an infinite loop, in the
// event that the state update causes `data` to change again, which is not
// uncommon. This is due to the variety of input data sources. Ideally, all data
// comes from a state selector that is memoized, but often data must be updated
// on-the-fly based on various display conditions; memoizing all the inputs to
// this hook would require a bunch of extra `useMemo` hooks that would probably
// reduce performance beyond what would be worth it, and it would require all
// contributors to have an in-depth understanding of the nuances of React hooks,
// references, Fuse.js, etc. The solution here is to simply update the Fuse.js
// collection before filtering, which should be a relatively cheap (linear time)
// operation because most lists being filtered are short. We are not filtering
// thousands of items from an arbitrary database—typically we are just filtering
// a handful of actions or NFTs. Previously, this hook was trying to be clever
// and only update the Fuse.js collection when the data deeply changed, but that
// required extra state updates and logic that often led to infinite loops. If
// this becomes a performance issue, we can revisit this.
export const useSearchFilter = <T extends unknown>({
  data,
  filterableKeys,
  options,
  querySyncedParam,
  onFilterChange,
}: UseSearchFilterOptions<T>): UseSearchFilterReturn<T> => {
  // Store latest data in a ref so we can compare it to the current data.
  const dataRef = useRef(data)

  const [fuse, setFuse] = useState<Fuse<T>>(() =>
    makeFuse(data, filterableKeys, options)
  )
  // Make new fuse when keys or options change. Update existing fuse when data
  // changes.
  useEffect(() => {
    setFuse(makeFuse(data, filterableKeys, options))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterableKeys, options])

  const [filter, setFilter] = useQuerySyncedState({
    // When param is undefined, this is just like a normal `useState` hook.
    param: querySyncedParam,
    defaultValue: '',
  })

  // When collection or filter is updated, re-filter.
  const filteredData: UseSearchFilterReturn<T>['filteredData'] = useMemo(() => {
    if (filter) {
      // If data has changed, update fuse collection before filtering.
      if (dataRef.current !== data) {
        fuse.setCollection(data)
        dataRef.current = data
      }

      return fuse.search(filter).map(({ item, refIndex }) => ({
        item,
        originalIndex: refIndex,
      }))
    } else {
      return data.map((item, originalIndex) => ({
        item,
        originalIndex,
      }))
    }
  }, [fuse, filter, data])

  const onFilterChangeRef = useUpdatingRef(onFilterChange)
  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const filter = event.target.value
      setFilter(filter)
      onFilterChangeRef.current?.(filter)
    },
    [onFilterChangeRef, setFilter]
  )

  return {
    searchBarProps: {
      onChange,
      value: filter,
    },
    filteredData,
    filter,
    setFilter,
  }
}

const makeFuse = <T extends unknown>(
  data: T[],
  keys: Fuse.FuseOptionKey<T>[],
  options?: Fuse.IFuseOptions<T>
) => new Fuse(data, { keys, ...options })
