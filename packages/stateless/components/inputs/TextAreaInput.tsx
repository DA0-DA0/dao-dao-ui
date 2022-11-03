import clsx from 'clsx'
import { ComponentPropsWithoutRef } from 'react'
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
> extends Omit<ComponentPropsWithoutRef<'textarea'>, 'required'> {
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
        'secondary-text text-text-body placeholder:text-text-tertiary w-full appearance-none rounded-md bg-transparent py-3 px-4 ring-1 transition focus:outline-none focus:ring-2',
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
