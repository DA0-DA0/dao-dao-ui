import { Check } from '@mui/icons-material'
import clsx from 'clsx'
import { FieldValues, UseFormSetValue } from 'react-hook-form'

import { BooleanFieldNames } from '@dao-dao/types'

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
      'group inline-flex items-center justify-center rounded outline outline-1 outline-border-primary transition-all',
      checked ? 'bg-component-pill' : 'bg-background-button',
      readOnly
        ? 'pointer-events-none'
        : {
            'cursor-pointer hover:bg-background-button-hover  active:bg-background-button-pressed active:outline-2':
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
        '!h-5 !w-5 text-icon-primary transition-all group-hover:text-icon-button-primary',
        checked ? 'opacity-100' : 'opacity-0'
      )}
    />
  </div>
)

export type FormCheckboxWrapperProps<
  Props,
  FV extends FieldValues,
  BooleanFieldName extends BooleanFieldNames<FV>
> = Omit<Props, 'checked' | 'onClick'> & {
  fieldName: BooleanFieldName
  value: boolean | undefined
  setValue: UseFormSetValue<FV>
  onToggle?: (newValue: boolean) => void
}

export const FormCheckbox = <
  FV extends FieldValues,
  BooleanFieldName extends BooleanFieldNames<FV>
>({
  fieldName,
  value,
  setValue,
  onToggle,
  ...props
}: FormCheckboxWrapperProps<CheckboxProps, FV, BooleanFieldName>) => (
  <Checkbox
    checked={!!value}
    onClick={() => {
      const newValue = !value
      setValue(fieldName, newValue as any)
      onToggle?.(newValue)
    }}
    {...props}
  />
)
