import { ChangeEventHandler } from 'react'

import {
  FieldError,
  FieldPathValue,
  Path,
  UseFormRegister,
  Validate,
} from 'react-hook-form'

export function AddressInput<FieldValues, FieldName extends Path<FieldValues>>({
  label,
  register,
  error,
  validation,
  onChange,
  border = true,
  className,
}: {
  label: FieldName
  register: UseFormRegister<FieldValues>
  onChange?: ChangeEventHandler<HTMLInputElement>
  validation?: Validate<FieldPathValue<FieldValues, FieldName>>[]
  error?: FieldError
  border?: boolean
  className?: string
}) {
  const validate = validation?.reduce(
    (a, v) => ({ ...a, [v.toString()]: v }),
    {}
  )
  return (
    <input
      type="text"
      className={`input text-sm font-mono
        ${error ? ' input-error' : ''}
        ${border ? ' input-bordered' : ''}
        ${className ? ' ' + className : ''}`}
      {...register(label, { validate, onChange })}
    />
  )
}
