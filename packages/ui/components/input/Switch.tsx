import clsx from 'clsx'
import { FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export interface SwitchProps {
  enabled: boolean
  onClick?: () => void
  className?: string
  sizing?: 'sm' | 'lg'
  readOnly?: boolean
}

export const Switch = ({
  enabled,
  onClick,
  className,
  sizing = 'lg',
  readOnly,
}: SwitchProps) => (
  <div
    className={clsx(
      'flex relative flex-none items-center rounded-full',
      {
        'hover:opacity-90 cursor-pointer': !readOnly,
        'bg-valid': enabled,
        'bg-transparent border border-dark': !enabled,
        // Sizing.
        'w-[28px] h-[16px]': sizing === 'sm',
        'w-[67px] h-[38px]': sizing === 'lg',
      },
      className
    )}
    onClick={readOnly ? undefined : onClick}
  >
    <div
      className={clsx(
        'absolute bg-toast rounded-full transition-all',
        // Sizing.
        {
          // Small
          'w-[10px] h-[10px]': sizing === 'sm',
          'left-[15px]': sizing === 'sm' && enabled,
          'left-[2px]': sizing === 'sm' && !enabled,
          // Large
          'w-[28px] h-[28px]': sizing === 'lg',
          'left-[33px]': sizing === 'lg' && enabled,
          'left-[4.5px]': sizing === 'lg' && !enabled,
        }
      )}
    ></div>
  </div>
)

export interface SwitchCardProps extends SwitchProps {
  containerClassName?: string
  onLabel?: string
  offLabel?: string
}

export const SwitchCard = ({
  containerClassName,
  onLabel: _onLabel,
  offLabel: _offLabel,
  ...props
}: SwitchCardProps) => {
  const { t } = useTranslation()

  const onLabel = _onLabel ?? t('info.enabled')
  const offLabel = _offLabel ?? t('info.disabled')

  return (
    <div
      className={clsx(
        'flex flex-row gap-4 justify-between items-center py-2 px-3 bg-card rounded-md',
        containerClassName
      )}
    >
      <p className="min-w-[5rem] secondary-text">
        {props.enabled ? onLabel : offLabel}
      </p>

      <Switch {...props} />
    </div>
  )
}

// Return the field name paths that have type boolean.
export type BooleanFieldNames<FV extends FieldValues> = {
  [Property in Path<FV>]: PathValue<FV, Property> extends boolean | undefined
    ? Property
    : never
}[Path<FV>]

export type FormSwitchWrapperProps<
  Props,
  FV extends FieldValues,
  BooleanFieldName extends BooleanFieldNames<FV>
> = Omit<Props, 'enabled' | 'onClick'> & {
  fieldName: BooleanFieldName
  value: boolean | undefined
  setValue: UseFormSetValue<FV>
  onToggle?: (newValue: boolean) => void
}

export const FormSwitch = <
  FV extends FieldValues,
  BooleanFieldName extends BooleanFieldNames<FV>
>({
  fieldName,
  value,
  setValue,
  onToggle,
  ...props
}: FormSwitchWrapperProps<SwitchProps, FV, BooleanFieldName>) => (
  <Switch
    enabled={!!value}
    onClick={() => {
      const newValue = !value
      setValue(fieldName, newValue as any)
      onToggle?.(newValue)
    }}
    {...props}
  />
)

export const FormSwitchCard = <
  FV extends FieldValues,
  BooleanFieldName extends BooleanFieldNames<FV>
>({
  fieldName,
  value,
  setValue,
  onToggle,
  ...props
}: FormSwitchWrapperProps<SwitchCardProps, FV, BooleanFieldName>) => (
  <SwitchCard
    enabled={!!value}
    onClick={() => {
      const newValue = !value
      setValue(fieldName, newValue as any)
      onToggle?.(newValue)
    }}
    {...props}
  />
)
