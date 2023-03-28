import { Check } from '@mui/icons-material'
import clsx from 'clsx'

export type SelectCircleProps = {
  selected: boolean
  onSelect?: () => void
  className?: string
}

export const SelectCircle = ({
  selected,
  onSelect,
  className,
}: SelectCircleProps) => (
  <div
    className={clsx(
      'h-5 w-5 rounded-full border border-border-primary transition',
      selected
        ? 'flex items-center justify-center bg-component-pill'
        : 'bg-background-primary',
      onSelect && 'cursor-pointer',
      className
    )}
    onClick={onSelect}
  >
    <Check
      className={clsx(
        '!h-4 !w-4 text-icon-primary transition',
        selected ? 'opacity-100' : 'opacity-0'
      )}
    />
  </div>
)
