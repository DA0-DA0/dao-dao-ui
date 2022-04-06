import { ChangeEventHandler } from 'react'

import {
  FieldError,
  FieldPathValue,
  Path,
  UseFormRegister,
  Validate,
} from 'react-hook-form'

import SvgCopy from '@components/icons/Copy'

export function AddressInput<FieldValues, FieldName extends Path<FieldValues>>({
  label,
  register,
  error,
  validation,
  onChange,
  disabled = false,
}: {
  label: FieldName
  register: UseFormRegister<FieldValues>
  onChange?: ChangeEventHandler<HTMLInputElement>
  validation?: Validate<FieldPathValue<FieldValues, FieldName>>[]
  error?: FieldError
  disabled?: boolean
}) {
  const validate = validation?.reduce(
    (a, v) => ({ ...a, [v.toString()]: v }),
    {}
  )
  return (
    <div
      className={`flex items-center gap-1 bg-transparent rounded-lg px-3 py-2 transition focus-within:ring-1 focus-within:outline-none ring-brand ring-offset-0 border-default border border-default text-sm font-mono
        ${error ? ' ring-error ring-1' : ''}`}
    >
      <SvgCopy width="24px" color="currentColor" />
      <input
        type="text"
        className="bg-transparent w-full ring-none border-none outline-none"
        disabled={disabled}
        {...register(label, { validate, onChange })}
      />
    </div>
  )
}
