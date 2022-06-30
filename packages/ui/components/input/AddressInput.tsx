import clsx from 'clsx'
import { ChangeEventHandler, ComponentPropsWithoutRef } from 'react'
import {
  FieldError,
  FieldPathValue,
  Path,
  UseFormRegister,
  Validate,
} from 'react-hook-form'

import { useTranslation } from '@dao-dao/i18n'
import { Wallet } from '@dao-dao/icons'

export interface AddressInputProps<
  FieldValues,
  FieldName extends Path<FieldValues>
> extends Omit<ComponentPropsWithoutRef<'input'>, 'required'> {
  fieldName: FieldName
  register: UseFormRegister<FieldValues>
  onChange?: ChangeEventHandler<HTMLInputElement>
  validation?: Validate<FieldPathValue<FieldValues, FieldName>>[]
  error?: FieldError
  disabled?: boolean
  required?: boolean
  containerClassName?: string
}

export const AddressInput = <FieldValues, FieldName extends Path<FieldValues>>({
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
}: AddressInputProps<FieldValues, FieldName>) => {
  const { t } = useTranslation()
  const validate = validation?.reduce(
    (a, v) => ({ ...a, [v.toString()]: v }),
    {}
  )

  return (
    <div
      className={clsx(
        'flex items-center gap-1 rounded-lg border border-default bg-transparent py-2 px-3 font-mono text-sm ring-brand ring-offset-0 transition focus-within:outline-none focus-within:ring-1',
        { 'ring-1 ring-error': error },
        containerClassName
      )}
    >
      <Wallet color="currentColor" width="24px" />
      <input
        className={clsx(
          'ring-none body-text w-full border-none bg-transparent outline-none',
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
