import { useCallback, useMemo, useState } from 'react'

import {
  DropdownProps,
  Dropdown as OriginalDropdown,
} from '../components/Dropdown'

export type SortFn<T> = (a: T, b: T) => number

interface UseDropdownSorterReturn<T> {
  Dropdown: (
    props: Omit<DropdownProps<SortFn<T>>, 'selected' | 'onSelect'>
  ) => JSX.Element
  sortedData: T[]
  selectedSortFn: SortFn<T> | undefined
}

// Pass an array of data and get a Dropdown component that automatically sorts
// the given data. Returns `Dropdown` for rendering and `sortedData`.
export const useDropdownSorter = <T extends unknown>(
  data: T[],
  initialSelection?: SortFn<T>
): UseDropdownSorterReturn<T> => {
  const [selectedSortFn, setSelectedSortFn] = useState<SortFn<T> | undefined>(
    // useState can take a function that is immediately called to get the value.
    // Since we want to set the value to a function, we need to return it via a
    // function.
    () => initialSelection
  )

  const Dropdown = useCallback(
    (props: Omit<DropdownProps<SortFn<T>>, 'selected' | 'onSelect'>) => (
      <OriginalDropdown<SortFn<T>>
        // useState can take a function that is called with its previous state
        // to get the next value. Since we want to set the value to a function,
        // we need to return it via a function.
        onSelect={(selected) => setSelectedSortFn(() => selected)}
        selected={selectedSortFn}
        {...props}
      />
    ),
    [selectedSortFn]
  )

  const sortedData = useMemo(
    // Copy data since sort mutates.
    () => (selectedSortFn ? [...data].sort(selectedSortFn) : data),
    [data, selectedSortFn]
  )

  return {
    Dropdown,
    sortedData,
    selectedSortFn,
  }
}
