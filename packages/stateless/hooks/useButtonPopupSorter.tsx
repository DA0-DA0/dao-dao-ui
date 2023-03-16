import {
  RadioButtonChecked,
  RadioButtonUnchecked,
  SortRounded,
} from '@mui/icons-material'
import { useMemo, useState } from 'react'

import { ButtonPopupProps, SortFn, TypedOption } from '@dao-dao/types'

import { ButtonLink } from '../components'

type UseButtonPopupSorterOptions<T> = {
  data: T[]
  options: TypedOption<SortFn<T>>[]
  initialIndex?: number
}

type UseButtonPopupSorterReturn<T> = {
  buttonPopupProps: Pick<
    ButtonPopupProps,
    'sections' | 'sectionClassName' | 'trigger' | 'ButtonLink'
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

  return {
    buttonPopupProps: {
      trigger: {
        type: 'button',
        props: {
          variant: 'ghost',
          children: (
            <>
              <SortRounded />
              <p className="body-text whitespace-nowrap">
                {selectedOption?.label}
              </p>
            </>
          ),
        },
      },
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
