import { TypedOption } from '../sortFilter'

export type SegmentedControlsProps<T extends unknown> = {
  tabs: TypedOption<T>[]
  selected: T
  onSelect: (value: T) => void
  loading?: T
  className?: string
  disabled?: boolean
  noWrap?: boolean
}
