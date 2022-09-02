import { Check } from '@mui/icons-material'
import clsx from 'clsx'

export interface CheckboxProps {
  checked: boolean
  onClick?: () => void
  className?: string
  readOnly?: boolean
  // Apply css hover/active states using tailwind group modifiers in addition to
  // the normal modifiers. This lets the parent component appear to serve as a
  // checkbox as well.
  styleWithGroup?: boolean
}

export const Checkbox = ({
  checked,
  onClick,
  className,
  readOnly,
  styleWithGroup = true,
}: CheckboxProps) => (
  <div
    className={clsx(
      'group inline-flex justify-center items-center rounded-md outline-1 outline-border-primary outline transition-all',
      checked ? 'bg-component-pill' : 'bg-background-button',
      !readOnly && {
        'hover:bg-background-button-hover active:bg-background-button-pressed  active:outline-2 cursor-pointer':
          true,
        // Respond to parent group as well.
        'group-hover:bg-background-button-hover group-active:bg-background-button-pressed group-active:outline-2':
          styleWithGroup,
      },
      className
    )}
    onClick={readOnly ? undefined : onClick}
  >
    <Check
      className={clsx(
        'w-5 h-5 text-icon-primary group-hover:text-icon-button-primary transition-all',
        checked ? 'opacity-100' : 'opacity-0'
      )}
    />
  </div>
)
