import { MinusIcon, PlusIcon } from '@heroicons/react/outline'
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

export interface NumberInputProps<
  FV extends FieldValues,
  FieldName extends Path<FV>
> extends Omit<ComponentProps<'input'>, 'type' | 'required'> {
  fieldName: FieldName
  register: UseFormRegister<FV>
  validation?: Validate<FieldPathValue<FV, FieldName>>[]
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
export const NumberInput = <
  FV extends FieldValues,
  FieldName extends Path<FV>
>({
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
}: NumberInputProps<FV, FieldName>) => {
  const validate = validation?.reduce(
    (a, v) => ({ ...a, [v.toString()]: v }),
    {}
  )

  return (
    <div
      className={clsx(
        'flex flex-row gap-1 items-center text-sm',
        'py-3 px-4 bg-transparent rounded-md border focus:outline-none ring-1 focus:ring-2 transition secondary-text',
        // Border
        error
          ? 'ring-border-interactive-error'
          : 'ring-border-primary focus:ring-border-interactive-focus',
        // Sizing
        {
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
