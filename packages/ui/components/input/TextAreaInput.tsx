import clsx from 'clsx'
import { ComponentProps } from 'react'
import {
  FieldError,
  FieldPathValue,
  FieldValues,
  Path,
  UseFormRegister,
  Validate,
} from 'react-hook-form'

export interface TextAreaInputProps<
  FV extends FieldValues,
  FieldName extends Path<FV>
> extends Omit<ComponentProps<'textarea'>, 'required'> {
  fieldName: FieldName
  register: UseFormRegister<FV>
  validation?: Validate<FieldPathValue<FV, FieldName>>[]
  error?: FieldError
  required?: boolean
}

export const TextAreaInput = <
  FV extends FieldValues,
  FieldName extends Path<FV>
>({
  fieldName,
  register,
  error,
  validation,
  className,
  required,
  ...rest
}: TextAreaInputProps<FV, FieldName>) => {
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
      {...register(fieldName, { required: required && 'Required', validate })}
    ></textarea>
  )
}
