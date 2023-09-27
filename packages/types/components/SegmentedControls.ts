import { MouseEvent as ReactMouseEvent } from 'react'

import { TypedOption } from '../sortFilter'

export type SegmentedControlsProps<T extends unknown> = {
  tabs: TypedOption<T>[]
  selected: T
  onSelect: (
    value: T,
    event: ReactMouseEvent<HTMLButtonElement, MouseEvent>
  ) => void
  loading?: T
  className?: string
  disabled?: boolean
  noWrap?: boolean
  // If present, a More dropdown will be added to the end of the tabs.
  moreTabs?: TypedOption<T>[]
}
