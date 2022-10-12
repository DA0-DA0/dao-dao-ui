import { Code, Wallet } from '@mui/icons-material'
import clsx from 'clsx'
import { ChangeEventHandler, ComponentPropsWithoutRef } from 'react'
import {
  FieldError,
  FieldPathValue,
  FieldValues,
  Path,
  UseFormRegister,
  Validate,
} from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export interface AddressInputProps<
  FV extends FieldValues,
  FieldName extends Path<FV>
> extends Omit<ComponentPropsWithoutRef<'input'>, 'required'> {
  fieldName: FieldName
  register: UseFormRegister<FV>
  onChange?: ChangeEventHandler<HTMLInputElement>
  validation?: Validate<FieldPathValue<FV, FieldName>>[]
  error?: FieldError | string
  disabled?: boolean
  required?: boolean
  containerClassName?: string
  iconType?: 'wallet' | 'contract'
}

export const AddressInput = <
  FV extends FieldValues,
  FieldName extends Path<FV>
>({
  fieldName,
  register,
  error,
  validation,
  onChange,
  disabled,
  required,
  className,
  containerClassName,
  iconType = 'wallet',
  ...rest
}: AddressInputProps<FV, FieldName>) => {
  const { t } = useTranslation()
  const validate = validation?.reduce(
    (a, v) => ({ ...a, [v.toString()]: v }),
    {}
  )

  const Icon = iconType === 'wallet' ? Wallet : Code

  return (
    <div
      className={clsx(
        'flex gap-2 items-center py-3 px-4 font-mono text-sm bg-transparent rounded-md focus-within:outline-none ring-1 focus-within:ring-2 transition secondary-text',
        error
          ? 'ring-border-interactive-error'
          : 'ring-border-primary focus:ring-border-interactive-focus',
        containerClassName
      )}
    >
      <Icon className="!w-5 !h-5" />
      <input
        className={clsx(
          'w-full bg-transparent border-none outline-none ring-none body-text',
          className
        )}
        disabled={disabled}
        placeholder={t('form.address')}
        type="text"
        {...rest}
        {...register(fieldName, {
          required: required && 'Required',
          validate,
          onChange,
        })}
      />
    </div>
  )
}
