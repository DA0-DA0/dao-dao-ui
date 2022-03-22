import { ReactNode } from 'react'

import {
  FieldError,
  FieldPathValue,
  Path,
  UseFormRegister,
  Validate,
} from 'react-hook-form'

export function SelectInput<FieldValues, FieldName extends Path<FieldValues>>({
  label,
  register,
  error,
  validation,
  children,
  border = true,
  defaultValue,
  disabled = false,
}: {
  label: FieldName
  register: UseFormRegister<FieldValues>
  validation?: Validate<FieldPathValue<FieldValues, FieldName>>[]
  error?: FieldError
  children: ReactNode
  border?: boolean
  defaultValue?: string
  disabled?: boolean
}) {
  const validate = validation?.reduce(
    (a, v) => ({ ...a, [v.toString()]: v }),
    {}
  )
  return (
    <select
      className={`select font-normal
        ${error ? ' select-error' : ''}
        ${border ? ' select-bordered' : ''}`}
      defaultValue={defaultValue}
      disabled={disabled}
      {...register(label, { validate })}
    >
      {children}
    </select>
  )
}
