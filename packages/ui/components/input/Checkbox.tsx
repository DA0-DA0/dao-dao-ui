import { Check } from '@mui/icons-material'
import clsx from 'clsx'
import { FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form'

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
      'group inline-flex justify-center items-center rounded outline-1 outline-border-primary outline transition-all',
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
        '!w-5 !h-5 text-icon-primary group-hover:text-icon-button-primary transition-all',
        checked ? 'opacity-100' : 'opacity-0'
      )}
    />
  </div>
)

// Return the field name paths that have type boolean.
export type BooleanFieldNames<FV extends FieldValues> = {
  [Property in Path<FV>]: PathValue<FV, Property> extends boolean | undefined
    ? Property
    : never
}[Path<FV>]

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
