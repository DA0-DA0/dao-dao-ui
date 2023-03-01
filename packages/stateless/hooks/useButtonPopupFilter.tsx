import {
  FilterListRounded,
  RadioButtonChecked,
  RadioButtonUnchecked,
} from '@mui/icons-material'
import { useCallback, useMemo, useState } from 'react'

import { ButtonPopupProps, FilterFn, TypedOption } from '@dao-dao/types'

import { Button, ButtonLink } from '../components'

type UseButtonPopupFilterOptions<T, O> = {
  data: T[]
  options: O[]
  initialIndex?: number
}

type UseButtonPopupFilterReturn<T, O> = {
  buttonPopupProps: Pick<
    ButtonPopupProps,
    'sections' | 'Trigger' | 'ButtonLink'
  >
  filteredData: T[]
  selectedOption: O
}

// Pass an array of data and sort options, and get `buttonPopupProps` (for
// passing to `ButtonPopup`) and memoized `filteredData`.
export const useButtonPopupFilter = <
  T extends unknown,
  O extends TypedOption<FilterFn<T>>
>({
  data,
  options,
  initialIndex = 0,
}: UseButtonPopupFilterOptions<T, O>): UseButtonPopupFilterReturn<T, O> => {
  const [selectedIndex, setSelectedIndex] = useState<number>(initialIndex)
  const selectedOption = options[selectedIndex]

  const filteredData = useMemo(
    () => (selectedOption ? data.filter(selectedOption.value) : data),
    [data, selectedOption]
  )

  // Memoize so it doesn't flicker on re-renders.
  const Trigger: ButtonPopupProps['Trigger'] = useCallback(
    ({ open, ...props }) => (
      <Button pressed={open} variant="ghost" {...props}>
        <FilterListRounded />
        <p className="whitespace-nowrap">{selectedOption?.label}</p>
      </Button>
    ),
    [selectedOption?.label]
  )

  return {
    buttonPopupProps: {
      Trigger,
      sections: [
        {
          buttons: options.map(({ label }, index) => ({
            Icon:
              selectedIndex === index
                ? RadioButtonChecked
                : RadioButtonUnchecked,
            label,
            onClick: () => setSelectedIndex(index),
          })),
        },
      ],
      // No button links, so using the stateless component is fine here.
      ButtonLink,
    },
    filteredData,
    selectedOption,
  }
}
