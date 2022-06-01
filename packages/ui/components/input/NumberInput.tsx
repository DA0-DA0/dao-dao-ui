import { MinusIcon, PlusIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { ComponentProps } from 'react'
import {
  FieldError,
  FieldPathValue,
  Path,
  UseFormRegister,
  Validate,
} from 'react-hook-form'

interface NumberInputProps<FieldValues, FieldName extends Path<FieldValues>>
  extends Omit<ComponentProps<'input'>, 'type' | 'required'> {
  label: FieldName
  register: UseFormRegister<FieldValues>
  validation?: Validate<FieldPathValue<FieldValues, FieldName>>[]
  error?: FieldError
  defaultValue?: string
  step?: string | number
  onPlusMinus?: [() => void, () => void]
  containerClassName?: string
  sizing?: 'sm' | 'md'
  required?: boolean
}

/**
 * @param label      - the label for the value that this will contain.
 * @param register   - the register function returned by `useForm`.
 * @param error      - any errors that have occured during validation of this
 *                     input.
 * @param validation - a list of functions that, when given the current value
 *                     of this field, return true if the value is valid and an
 *                     error message otherwise.
 */
export const NumberInput = <FieldValues, FieldName extends Path<FieldValues>>({
  label,
  register,
  error,
  validation,
  defaultValue,
  step,
  onPlusMinus,
  disabled,
  sizing,
  className,
  containerClassName,
  required,
  ...props
}: NumberInputProps<FieldValues, FieldName>) => {
  const validate = validation?.reduce(
    (a, v) => ({ ...a, [v.toString()]: v }),
    {}
  )

  if (onPlusMinus) {
    return (
      <div
        className={clsx(
          'flex gap-1 items-center py-2 px-3 text-sm bg-transparent rounded-lg border border-default focus-within:outline-none focus-within:ring-1 ring-brand ring-offset-0 transition',
          {
            'ring-1 ring-error': error,
            'w-28': sizing === 'sm',
            'w-40': sizing === 'md',
          },
          containerClassName
        )}
      >
        <button
          className="transition secondary-text hover:body-text"
          disabled={disabled}
          onClick={() => onPlusMinus[0]()}
          type="button"
        >
          <PlusIcon className="w-4" />
        </button>
        <button
          className="transition secondary-text hover:body-text"
          disabled={disabled}
          onClick={() => onPlusMinus[1]()}
          type="button"
        >
          <MinusIcon className="w-4" />
        </button>
        <input
          className={clsx(
            'w-full text-right bg-transparent border-none outline-none ring-none body-text',
            className
          )}
          defaultValue={defaultValue}
          disabled={disabled}
          step={step}
          type="number"
          {...props}
          {...register(label, {
            required: required && 'Required',
            validate,
            valueAsNumber: true,
          })}
        />
      </div>
    )
  }

  return (
    <input
      className={clsx(
        'py-2 px-3 bg-transparent rounded-lg border border-default focus:outline-none focus:ring-1 ring-brand ring-offset-0 transition body-text',
        { 'ring-1 ring-error': error },
        className
      )}
      defaultValue={defaultValue}
      disabled={disabled}
      step={step}
      type="number"
      {...props}
      {...register(label, {
        required: required && 'Required',
        validate,
        valueAsNumber: true,
      })}
    />
  )
}
