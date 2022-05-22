import clsx from 'clsx'
import { FC } from 'react'
import { Path, PathValue, UseFormSetValue, UseFormWatch } from 'react-hook-form'

interface SwitchProps {
  on: boolean
  onClick?: () => void
  className?: string
  sizing?: 'sm' | 'lg'
}

export const Switch: FC<SwitchProps> = ({
  on,
  onClick,
  className,
  sizing = 'lg',
}) => (
  <div
    className={clsx(
      'flex relative flex-none items-center rounded-full hover:opacity-70 cursor-pointer',
      {
        'bg-valid': on,
        'bg-transparent border border-dark': !on,
        // Sizing.
        'w-[28px] h-[16px]': sizing === 'sm',
        'w-[67px] h-[38px]': sizing === 'lg',
      },
      className
    )}
    onClick={onClick}
  >
    <div
      className={clsx(
        'absolute bg-dark rounded-full transition-all',
        // Sizing.
        {
          // Small
          'w-[10px] h-[10px]': sizing === 'sm',
          'left-[15px]': sizing === 'sm' && on,
          'left-[2px]': sizing === 'sm' && !on,
          // Large
          'w-[28px] h-[28px]': sizing === 'lg',
          'left-[33px]': sizing === 'lg' && on,
          'left-[4.5px]': sizing === 'lg' && !on,
        }
      )}
    ></div>
  </div>
)

// Return the field name paths that have type boolean.
export type BooleanFieldNames<FieldValues> = {
  [Property in Path<FieldValues>]: PathValue<FieldValues, Property> extends
    | boolean
    | undefined
    ? Property
    : never
}[Path<FieldValues>]

interface FormSwitchProps<
  FieldValues,
  BooleanFieldName extends BooleanFieldNames<FieldValues>
> extends Omit<SwitchProps, 'on' | 'onClick'> {
  label: BooleanFieldName
  watch: UseFormWatch<FieldValues>
  setValue: UseFormSetValue<FieldValues>
  onToggle?: (newValue: boolean) => void
}

export const FormSwitch = <
  FieldValues,
  BooleanFieldName extends BooleanFieldNames<FieldValues>
>({
  label,
  watch,
  setValue,
  onToggle,
  ...props
}: FormSwitchProps<FieldValues, BooleanFieldName>) => (
  <Switch
    on={!!watch(label)}
    onClick={() => {
      const newValue = !watch(label) as any
      setValue(label, newValue)
      onToggle?.(newValue)
    }}
    {...props}
  />
)
