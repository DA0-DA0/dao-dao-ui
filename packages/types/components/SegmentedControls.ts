import { MouseEvent as ReactMouseEvent } from 'react'

import { TypedOption } from '../sortFilter'

export type SegmentedControlsTab<T extends unknown> = TypedOption<T> & {
  /**
   * Whether or not to disable selection of this tab. Defaults to false.
   */
  disabled?: boolean
}

export type SegmentedControlsProps<T extends unknown> = {
  tabs: SegmentedControlsTab<T>[]
  selected: T | undefined
  onSelect: (
    value: T,
    event: ReactMouseEvent<HTMLButtonElement, MouseEvent>
  ) => void
  loading?: T
  className?: string
  disabled?: boolean
  noWrap?: boolean
  // If present, a More dropdown will be added to the end of the tabs.
  moreTabs?: SegmentedControlsTab<T>[]
}
