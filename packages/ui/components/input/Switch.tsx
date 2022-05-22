import clsx from 'clsx'
import { FC } from 'react'
import { Path, PathValue, UseFormSetValue, UseFormWatch } from 'react-hook-form'

interface SwitchProps {
  on: boolean
  onClick?: () => void
  className?: string
}

export const Switch: FC<SwitchProps> = ({ on, onClick, className }) => (
  <div
    className={clsx(
      'flex relative items-center w-[67px] h-[38px] rounded-full hover:opacity-70 cursor-pointer',
      {
        'bg-valid': on,
        'bg-transparent border border-dark': !on,
      },
      className
    )}
    onClick={onClick}
  >
    <div
      className={clsx(
        'absolute w-[28px] h-[28px] rounded-full transition-all',
        {
          'left-[33px] bg-dark': on,
          'left-[4.5px] bg-dark': !on,
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
