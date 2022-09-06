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
        'py-3 px-4 w-full placeholder:text-text-tertiary text-text-body bg-transparent rounded-md focus:outline-none ring-1 focus:ring-2 transition secondary-text',
        error
          ? 'ring-border-interactive-error'
          : 'ring-border-primary focus:ring-border-interactive-focus',
        className
      )}
      {...rest}
      {...register(fieldName, { required: required && 'Required', validate })}
    ></textarea>
  )
}
