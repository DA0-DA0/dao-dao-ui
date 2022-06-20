import clsx from 'clsx'
import { ComponentProps } from 'react'
import {
  FieldError,
  FieldPathValue,
  Path,
  UseFormRegister,
  Validate,
} from 'react-hook-form'

interface TextInputProps<FieldValues, FieldName extends Path<FieldValues>>
  extends Omit<ComponentProps<'input'>, 'type' | 'required'> {
  fieldName: FieldName
  register: UseFormRegister<FieldValues>
  validation?: Validate<FieldPathValue<FieldValues, FieldName>>[]
  error?: FieldError
  required?: boolean
}

/**
 * @param fieldName  - the field name for the value that this will contain.
 * @param register   - the register function returned by `useForm`.
 * @param error      - any errors that have occured during validation of this
 *                     input.
 * @param validation - a list of functions that, when given the current value
 *                     of this field, return true if the value is valid and an
 *                     error message otherwise.
 */
export const TextInput = <FieldValues, FieldName extends Path<FieldValues>>({
  fieldName,
  register,
  error,
  validation,
  className,
  required,
  ...rest
}: TextInputProps<FieldValues, FieldName>) => {
  const validate = validation?.reduce(
    (a, v) => ({ ...a, [v.toString()]: v }),
    {}
  )

  return (
    <input
      className={clsx(
        'py-2 px-3 w-full bg-transparent rounded-lg border border-default focus:outline-none focus:ring-1 ring-brand ring-offset-0 transition body-text',
        { 'ring-1 ring-error': error },
        className
      )}
      type="text"
      {...rest}
      {...register(fieldName, { required: required && 'Required', validate })}
    />
  )
}
