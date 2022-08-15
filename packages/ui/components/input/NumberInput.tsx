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
  fieldName: FieldName
  register: UseFormRegister<FieldValues>
  validation?: Validate<FieldPathValue<FieldValues, FieldName>>[]
  error?: FieldError
  onMinus?: () => void
  onPlus?: () => void
  containerClassName?: string
  sizing?: 'sm' | 'md' | 'auto'
  required?: boolean
  setValueAs?: (value: any) => any
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
export const NumberInput = <FieldValues, FieldName extends Path<FieldValues>>({
  fieldName,
  register,
  error,
  validation,
  onMinus,
  onPlus,
  disabled,
  sizing,
  className,
  containerClassName,
  required,
  setValueAs,
  ...props
}: NumberInputProps<FieldValues, FieldName>) => {
  const validate = validation?.reduce(
    (a, v) => ({ ...a, [v.toString()]: v }),
    {}
  )

  return (
    <div
      className={clsx(
        'flex flex-row gap-1 items-center text-sm',
        'py-2 px-3 bg-transparent rounded-lg border border-default focus-within:outline-none focus-within:ring-1 ring-brand ring-offset-0 transition',
        {
          'ring-1 ring-error': error,
          'w-28': sizing === 'sm',
          'w-40': sizing === 'md',
          'w-28 md:w-32 lg:w-40': sizing === 'auto',
        },
        containerClassName
      )}
    >
      {onPlus && (
        <button
          className={clsx('transition secondary-text', {
            'hover:body-text': !disabled,
          })}
          disabled={disabled}
          onClick={onPlus}
          type="button"
        >
          <PlusIcon className="w-4" />
        </button>
      )}
      {onMinus && (
        <button
          className={clsx('transition secondary-text', {
            'hover:body-text': !disabled,
          })}
          disabled={disabled}
          onClick={onMinus}
          type="button"
        >
          <MinusIcon className="w-4" />
        </button>
      )}

      <input
        className={clsx(
          'w-full text-right bg-transparent border-none outline-none ring-none body-text',
          className
        )}
        disabled={disabled}
        type="number"
        {...props}
        {...register(fieldName, {
          required: required && 'Required',
          validate,
          ...(setValueAs ? { setValueAs } : { valueAsNumber: true }),
        })}
      />
    </div>
  )
}
