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

export interface SelectInputProps<
  FV extends FieldValues,
  FieldName extends Path<FV>
> extends Omit<ComponentPropsWithoutRef<'select'>, 'required'> {
  fieldName?: FieldName
  register?: UseFormRegister<FV>
  validation?: Validate<FieldPathValue<FV, FieldName>>[]
  error?: FieldError
  required?: boolean
}

export const SelectInput = <
  FV extends FieldValues,
  FieldName extends Path<FV>
>({
  fieldName,
  register,
  error,
  validation,
  children,
  required,
  className,
  ...props
}: SelectInputProps<FV, FieldName>) => {
  const validate = validation?.reduce(
    (a, v) => ({ ...a, [v.toString()]: v }),
    {}
  )

  return (
    <select
      className={clsx(
        'secondary-text rounded-md bg-transparent py-3 px-4 text-text-body ring-1 transition placeholder:text-text-tertiary focus:outline-none focus:ring-2',
        error
          ? 'ring-border-interactive-error'
          : 'ring-border-primary focus:ring-border-interactive-focus',
        props.disabled && 'appearance-none',
        className
      )}
      {...props}
      {...(register &&
        fieldName &&
        register(fieldName, { required: required && 'Required', validate }))}
    >
      {children}
    </select>
  )
}
