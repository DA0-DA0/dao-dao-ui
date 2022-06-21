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
  defaultValue?: string
  step?: string | number
  onPlusMinus?: [() => void, () => void]
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
  defaultValue,
  step,
  onPlusMinus,
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

  const sharedProps = {
    defaultValue,
    disabled,
    step,
    type: 'number',
    ...props,
    ...register(fieldName, {
      required: required && 'Required',
      validate,
      ...(setValueAs ? { setValueAs } : { valueAsNumber: true }),
    }),
  }

  const _containerClassName = clsx(
    'py-2 px-3 bg-transparent rounded-lg border border-default focus-within:outline-none focus-within:ring-1 ring-brand ring-offset-0 transition',
    {
      'ring-1 ring-error': error,
      'w-28': sizing === 'sm',
      'w-40': sizing === 'md',
      'w-28 md:w-32 lg:w-40': sizing === 'auto',
    },
    containerClassName
  )

  if (onPlusMinus) {
    return (
      <div
        className={clsx(
          'flex flex-row gap-1 items-center text-sm',
          _containerClassName
        )}
      >
        <button
          className={clsx('transition secondary-text', {
            'hover:body-text': !disabled,
          })}
          disabled={disabled}
          onClick={() => onPlusMinus[0]()}
          type="button"
        >
          <PlusIcon className="w-4" />
        </button>
        <button
          className={clsx('transition secondary-text', {
            'hover:body-text': !disabled,
          })}
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
          {...sharedProps}
        />
      </div>
    )
  }

  return (
    <input
      className={clsx('body-text', _containerClassName)}
      {...sharedProps}
    />
  )
}
