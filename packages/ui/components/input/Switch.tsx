import clsx from 'clsx'
import { FC } from 'react'
import { Path, PathValue, UseFormSetValue, UseFormWatch } from 'react-hook-form'

import { useTranslation } from '@dao-dao/i18n'

interface SwitchProps {
  on: boolean
  onClick?: () => void
  className?: string
  sizing?: 'sm' | 'lg'
  disabled?: boolean
}

export const Switch: FC<SwitchProps> = ({
  on,
  onClick,
  className,
  sizing = 'lg',
  disabled,
}) => (
  <div
    className={clsx(
      'flex relative flex-none items-center rounded-full hover:opacity-90 cursor-pointer',
      {
        'bg-valid': on,
        'bg-transparent border border-dark': !on,
        // Sizing.
        'w-[28px] h-[16px]': sizing === 'sm',
        'w-[67px] h-[38px]': sizing === 'lg',
      },
      className
    )}
    onClick={disabled ? undefined : onClick}
  >
    <div
      className={clsx(
        'absolute bg-toast rounded-full transition-all',
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

export interface FormSwitchProps<
  FieldValues,
  BooleanFieldName extends BooleanFieldNames<FieldValues>
> extends Omit<SwitchProps, 'on' | 'onClick'> {
  fieldName: BooleanFieldName
  watch: UseFormWatch<FieldValues>
  setValue: UseFormSetValue<FieldValues>
  onToggle?: (newValue: boolean) => void
  disabled?: boolean
}

export const FormSwitch = <
  FieldValues,
  BooleanFieldName extends BooleanFieldNames<FieldValues>
>({
  fieldName,
  watch,
  setValue,
  onToggle,
  ...props
}: FormSwitchProps<FieldValues, BooleanFieldName>) => (
  <Switch
    on={!!watch(fieldName)}
    onClick={() => {
      const newValue = !watch(fieldName) as any
      setValue(fieldName, newValue)
      onToggle?.(newValue)
    }}
    {...props}
  />
)

export interface FormSwitchCardProps<
  FieldValues,
  BooleanFieldName extends BooleanFieldNames<FieldValues>
> extends FormSwitchProps<FieldValues, BooleanFieldName> {
  containerClassName?: string
  onLabel?: string
  offLabel?: string
}

export const FormSwitchCard = <
  FieldValues,
  BooleanFieldName extends BooleanFieldNames<FieldValues>
>({
  containerClassName,
  onLabel: _onLabel,
  offLabel: _offLabel,
  ...props
}: FormSwitchCardProps<FieldValues, BooleanFieldName>) => {
  const { t } = useTranslation()

  const onLabel = _onLabel ?? t('enabled')
  const offLabel = _offLabel ?? t('disabled')

  return (
    <div
      className={clsx(
        'flex flex-row gap-4 items-center py-2 px-3 bg-card rounded-md',
        containerClassName
      )}
    >
      <p
        className="secondary-text"
        style={{
          width: Math.max(onLabel?.length ?? 0, offLabel?.length ?? 0) + 'ch',
        }}
      >
        {props.watch(props.fieldName) ? onLabel : offLabel}
      </p>

      <FormSwitch {...props} />
    </div>
  )
}
