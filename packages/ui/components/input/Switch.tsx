import clsx from 'clsx'
import { FC } from 'react'
import { Path, PathValue, UseFormSetValue, UseFormWatch } from 'react-hook-form'

import { useTranslation } from '@dao-dao/i18n'

interface SwitchProps {
  enabled: boolean
  onClick?: () => void
  className?: string
  sizing?: 'sm' | 'lg'
  readOnly?: boolean
}

export const Switch: FC<SwitchProps> = ({
  enabled,
  onClick,
  className,
  sizing = 'lg',
  readOnly,
}) => (
  <div
    className={clsx(
      'relative flex flex-none items-center rounded-full',
      {
        'cursor-pointer hover:opacity-90': !readOnly,
        'bg-valid': enabled,
        'border border-dark bg-transparent': !enabled,
        // Sizing.
        'h-[16px] w-[28px]': sizing === 'sm',
        'h-[38px] w-[67px]': sizing === 'lg',
      },
      className
    )}
    onClick={readOnly ? undefined : onClick}
  >
    <div
      className={clsx(
        'absolute rounded-full bg-toast transition-all',
        // Sizing.
        {
          // Small
          'h-[10px] w-[10px]': sizing === 'sm',
          'left-[15px]': sizing === 'sm' && enabled,
          'left-[2px]': sizing === 'sm' && !enabled,
          // Large
          'h-[28px] w-[28px]': sizing === 'lg',
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

export const SwitchCard: FC<SwitchCardProps> = ({
  containerClassName,
  onLabel: _onLabel,
  offLabel: _offLabel,
  ...props
}) => {
  const { t } = useTranslation()

  const onLabel = _onLabel ?? t('info.enabled')
  const offLabel = _offLabel ?? t('info.disabled')

  return (
    <div
      className={clsx(
        'flex flex-row items-center gap-4 rounded-md bg-card py-2 px-3',
        containerClassName
      )}
    >
      <p
        className="secondary-text"
        style={{
          width: Math.max(onLabel?.length ?? 0, offLabel?.length ?? 0) + 'ch',
        }}
      >
        {props.enabled ? onLabel : offLabel}
      </p>

      <Switch {...props} />
    </div>
  )
}

// Return the field name paths that have type boolean.
export type BooleanFieldNames<FieldValues> = {
  [Property in Path<FieldValues>]: PathValue<FieldValues, Property> extends
    | boolean
    | undefined
    ? Property
    : never
}[Path<FieldValues>]

export type FormSwitchWrapperProps<
  Props,
  FieldValues,
  BooleanFieldName extends BooleanFieldNames<FieldValues>
> = Omit<Props, 'enabled' | 'onClick'> & {
  fieldName: BooleanFieldName
  watch: UseFormWatch<FieldValues>
  setValue: UseFormSetValue<FieldValues>
  onToggle?: (newValue: boolean) => void
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
}: FormSwitchWrapperProps<SwitchProps, FieldValues, BooleanFieldName>) => (
  <Switch
    enabled={!!watch(fieldName)}
    onClick={() => {
      const newValue = !watch(fieldName) as any
      setValue(fieldName, newValue)
      onToggle?.(newValue)
    }}
    {...props}
  />
)

export const FormSwitchCard = <
  FieldValues,
  BooleanFieldName extends BooleanFieldNames<FieldValues>
>({
  fieldName,
  watch,
  setValue,
  onToggle,
  ...props
}: FormSwitchWrapperProps<SwitchCardProps, FieldValues, BooleanFieldName>) => (
  <SwitchCard
    enabled={!!watch(fieldName)}
    onClick={() => {
      const newValue = !watch(fieldName) as any
      setValue(fieldName, newValue)
      onToggle?.(newValue)
    }}
    {...props}
  />
)
