import {
  FieldError,
  FieldPathValue,
  Path,
  UseFormRegister,
  Validate,
} from 'react-hook-form'

/**
 * @param label      - the label for the value that this will contain.
 * @param register   - the register function returned by `useForm`.
 * @param error      - any errors that have occured during validation of this
 *                     input.
 * @param validation - a list of functions that, when given the current value
 *                     of this field, return true if the value is valid and an
 *                     error message otherwise.
 */
export function TextInput<FieldValues, FieldName extends Path<FieldValues>>({
  label,
  register,
  error,
  validation,
  disabled = false,
  className = '',
}: {
  label: FieldName
  register: UseFormRegister<FieldValues>
  validation?: Validate<FieldPathValue<FieldValues, FieldName>>[]
  error?: FieldError
  border?: boolean
  disabled?: boolean
  className?: string
}) {
  const validate = validation?.reduce(
    (a, v) => ({ ...a, [v.toString()]: v }),
    {}
  )
  return (
    <input
      className={`bg-transparent rounded-lg px-3 py-2 transition focus:ring-1 focus:outline-none ring-brand ring-offset-0 border-default border border-default w-full body-text 
        ${error ? ' ring-error ring-1' : ''} ${className}`}
      disabled={disabled}
      type="text"
      {...register(label, { validate })}
    />
  )
}
