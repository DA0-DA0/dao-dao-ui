import clsx from 'clsx'
import { ChangeEventHandler, ComponentPropsWithoutRef } from 'react'
import {
  FieldError,
  FieldPathValue,
  Path,
  UseFormRegister,
  Validate,
} from 'react-hook-form'

import { Wallet } from '@dao-dao/icons'

export interface AddressInputProps<
  FieldValues,
  FieldName extends Path<FieldValues>
> extends Omit<ComponentPropsWithoutRef<'input'>, 'required'> {
  label: FieldName
  register: UseFormRegister<FieldValues>
  onChange?: ChangeEventHandler<HTMLInputElement>
  validation?: Validate<FieldPathValue<FieldValues, FieldName>>[]
  error?: FieldError
  disabled?: boolean
  required?: boolean
}

export const AddressInput = <FieldValues, FieldName extends Path<FieldValues>>({
  label,
  register,
  error,
  validation,
  onChange,
  disabled,
  required,
  ...rest
}: AddressInputProps<FieldValues, FieldName>) => {
  const validate = validation?.reduce(
    (a, v) => ({ ...a, [v.toString()]: v }),
    {}
  )

  return (
    <div
      className={clsx(
        'flex gap-1 items-center py-2 px-3 font-mono text-sm bg-transparent rounded-lg border border-default focus-within:outline-none focus-within:ring-1 ring-brand ring-offset-0 transition',
        { 'ring-1 ring-error': error }
      )}
    >
      <Wallet color="currentColor" width="24px" />
      <input
        className="w-full bg-transparent border-none outline-none ring-none body-text"
        disabled={disabled}
        placeholder="Juno address"
        type="text"
        {...rest}
        {...register(label, {
          required: required && 'Required',
          validate,
          onChange,
        })}
      />
    </div>
  )
}
