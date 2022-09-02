import { Check } from '@mui/icons-material'
import clsx from 'clsx'

export interface CheckboxProps {
  checked: boolean
  onClick?: () => void
  className?: string
  readOnly?: boolean
}

export const Checkbox = ({
  checked,
  onClick,
  className,
  readOnly,
}: CheckboxProps) => (
  <div
    className={clsx(
      'inline-flex justify-center items-center rounded-md border border-border-primary transition-all',
      checked ? 'bg-component-pill' : 'bg-background-button',
      !readOnly &&
        'hover:bg-background-button-hover active:bg-background-button-pressed active:ring ring-inset ring-border-primary cursor-pointer',
      className
    )}
    onClick={readOnly ? undefined : onClick}
  >
    <Check
      className={clsx(
        'w-5 h-5 text-icon-primary hover:text-icon-button-primary transition-all',
        checked ? 'opacity-100' : 'opacity-0'
      )}
    />
  </div>
)
