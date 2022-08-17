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

import { Wallet } from '@dao-dao/icons'

export interface AddressInputProps<
  FV extends FieldValues,
  FieldName extends Path<FV>
> extends Omit<ComponentPropsWithoutRef<'input'>, 'required'> {
  fieldName: FieldName
  register: UseFormRegister<FV>
  onChange?: ChangeEventHandler<HTMLInputElement>
  validation?: Validate<FieldPathValue<FV, FieldName>>[]
  error?: FieldError
  disabled?: boolean
  required?: boolean
  containerClassName?: string
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
  ...rest
}: AddressInputProps<FV, FieldName>) => {
  const { t } = useTranslation()
  const validate = validation?.reduce(
    (a, v) => ({ ...a, [v.toString()]: v }),
    {}
  )

  return (
    <div
      className={clsx(
        'flex gap-1 items-center py-2 px-3 font-mono text-sm bg-transparent rounded-lg border border-default focus-within:outline-none focus-within:ring-1 ring-brand ring-offset-0 transition',
        { 'ring-1 ring-error': error },
        containerClassName
      )}
    >
      <Wallet color="currentColor" width="24px" />
      <input
        className={clsx(
          'w-full bg-transparent border-none outline-none ring-none body-text',
          className
        )}
        disabled={disabled}
        placeholder={t('form.junoAddress')}
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
