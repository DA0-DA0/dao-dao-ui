import {
  RadioButtonChecked,
  RadioButtonUnchecked,
  SortRounded,
} from '@mui/icons-material'
import { useCallback, useMemo, useState } from 'react'

import { ButtonPopupProps, SortFn, TypedOption } from '@dao-dao/types'

import { Button, ButtonLink } from '../components'

type UseButtonPopupSorterOptions<T> = {
  data: T[]
  options: TypedOption<SortFn<T>>[]
  initialIndex?: number
}

type UseButtonPopupSorterReturn<T> = {
  buttonPopupProps: Pick<
    ButtonPopupProps,
    'sections' | 'sectionClassName' | 'Trigger' | 'ButtonLink'
  >
  sortedData: T[]
}

// Pass an array of data and sort options, and get `buttonPopupProps` (for
// passing to `ButtonPopup`) and memoized `sortedData`.
export const useButtonPopupSorter = <T extends unknown>({
  data,
  options,
  initialIndex = 0,
}: UseButtonPopupSorterOptions<T>): UseButtonPopupSorterReturn<T> => {
  const [selectedIndex, setSelectedIndex] = useState<number>(initialIndex)
  const selectedOption = options[selectedIndex]

  const sortedData = useMemo(
    // Copy data since sort mutates.
    () => (selectedOption ? [...data].sort(selectedOption.value) : data),
    [data, selectedOption]
  )

  // Memoize so it doesn't flicker on re-renders.
  const Trigger: ButtonPopupProps['Trigger'] = useCallback(
    ({ open, ...props }) => (
      <Button focused={open} variant="ghost" {...props}>
        <SortRounded />
        <p className="body-text whitespace-nowrap">{selectedOption?.label}</p>
      </Button>
    ),
    [selectedOption?.label]
  )

  return {
    buttonPopupProps: {
      Trigger,
      sectionClassName: 'gap-1',
      sections: [
        {
          buttons: options.map(({ label }, index) => ({
            Icon:
              selectedIndex === index
                ? RadioButtonChecked
                : RadioButtonUnchecked,
            pressed: selectedIndex === index,
            label,
            onClick: () => setSelectedIndex(index),
          })),
        },
      ],
      // No button links, so using the stateless component is fine here.
      ButtonLink,
    },
    sortedData,
  }
}
