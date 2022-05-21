import clsx from 'clsx'
import { ComponentProps } from 'react'
import {
  FieldError,
  FieldPathValue,
  Path,
  UseFormRegister,
  Validate,
} from 'react-hook-form'

interface TextAreaInputProps<FieldValues, FieldName extends Path<FieldValues>>
  extends ComponentProps<'textarea'> {
  label: FieldName
  register: UseFormRegister<FieldValues>
  validation?: Validate<FieldPathValue<FieldValues, FieldName>>[]
  error?: FieldError
}

export const TextAreaInput = <
  FieldValues,
  FieldName extends Path<FieldValues>
>({
  label,
  register,
  error,
  validation,
  className,
  ...rest
}: TextAreaInputProps<FieldValues, FieldName>) => {
  const validate = validation?.reduce(
    (a, v) => ({ ...a, [v.toString()]: v }),
    {}
  )

  return (
    <textarea
      className={clsx(
        'py-2 px-3 w-full bg-transparent rounded-lg border border-default focus:outline-none focus:ring-1 ring-brand ring-offset-0 transition body-text',
        {
          'ring-1 ring-error': error,
        },
        className
      )}
      {...rest}
      {...register(label, { validate })}
    ></textarea>
  )
}
