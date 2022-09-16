import { useMemo, useState } from 'react'

import { DropdownOption, DropdownProps } from '../components/Dropdown'

export type SortFn<T> = (a: T, b: T) => number

interface UseDropdownSorterReturn<T> {
  dropdownProps: Pick<
    DropdownProps<SortFn<T>>,
    'onSelect' | 'options' | 'selected'
  >
  sortedData: T[]
  selectedSortFn: SortFn<T> | undefined
}

// Pass an array of data and sort options, and get `dropdownProps` (for passing
// to `Dropdown`) and memoized `sortedData`.
export const useDropdownSorter = <T extends unknown>(
  data: T[],
  options: DropdownOption<SortFn<T>>[],
  initialIndex = 0
): UseDropdownSorterReturn<T> => {
  const [selectedIndex, setSelectedIndex] = useState<number>(initialIndex)

  const sortedData = useMemo(
    // Copy data since sort mutates.
    () => (selectedIndex ? [...data].sort(options[selectedIndex].value) : data),
    [data, options, selectedIndex]
  )

  return {
    dropdownProps: {
      onSelect: (_, index) => setSelectedIndex(index),
      options,
      selected: options[selectedIndex].value,
    },
    sortedData,
    selectedSortFn: options[selectedIndex].value,
  }
}
