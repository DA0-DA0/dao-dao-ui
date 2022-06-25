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
  defaultValue,
  disabled = false,
}: {
  label: FieldName
  register: UseFormRegister<FieldValues>
  validation?: Validate<FieldPathValue<FieldValues, FieldName>>[]
  error?: FieldError
  children: ReactNode
  defaultValue?: string
  disabled?: boolean
}) {
  const validate = validation?.reduce(
    (a, v) => ({ ...a, [v.toString()]: v }),
    {}
  )
  return (
    <select
      className={`bg-transparent rounded-lg px-3 py-2 transition focus:ring-1 focus:outline-none text-dark ring-brand ring-offset-0 border border-default 
        ${error ? ' ring-error ring-1' : ''}`}
      defaultValue={defaultValue}
      disabled={disabled}
      {...register(label, { validate })}
    >
      {children}
    </select>
  )
}
