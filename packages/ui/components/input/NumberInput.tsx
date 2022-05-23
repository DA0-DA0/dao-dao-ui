import { MinusIcon, PlusIcon } from '@heroicons/react/outline'
import {
  FieldError,
  FieldPathValue,
  Path,
  UseFormRegister,
  Validate,
} from 'react-hook-form'

/**
 * @param label      - the label for the value that this will contain.
 * @param register   - the register function returned by `useForm`.
 * @param error      - any errors that have occured during validation of this
 *                     input.
 * @param validation - a list of functions that, when given the current value
 *                     of this field, return true if the value is valid and an
 *                     error message otherwise.
 */
export function NumberInput<FieldValues, FieldName extends Path<FieldValues>>({
  label,
  register,
  error,
  validation,
  defaultValue,
  step,
  disabled = false,
  onPlusMinus,
  small = false,
  className,
}: {
  label: FieldName
  register: UseFormRegister<FieldValues>
  validation?: Validate<FieldPathValue<FieldValues, FieldName>>[]
  error?: FieldError
  defaultValue?: string
  step?: string | number
  disabled?: boolean
  onPlusMinus?: [() => void, () => void]
  small?: boolean
  className?: string
}) {
  const validate = validation?.reduce(
    (a, v) => ({ ...a, [v.toString()]: v }),
    {}
  )

  if (onPlusMinus) {
    return (
      <div
        className={`flex items-center gap-1 bg-transparent rounded-lg px-3 py-2 transition focus-within:ring-1 focus-within:outline-none ring-brand ring-offset-0 border border-default text-sm ${
          small ? 'w-40' : ''
        }
        ${error ? ' ring-error ring-1' : ''} ${className}`}
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
          className="w-full text-right bg-transparent border-none outline-none ring-none body-text"
          defaultValue={defaultValue}
          disabled={disabled}
          step={step}
          type="number"
          {...register(label, {
            validate,
          })}
        />
      </div>
    )
  }

  return (
    <input
      className={`bg-transparent rounded-lg px-3 py-2 transition focus:ring-1 focus:outline-none ring-brand ring-offset-0 border border-default body-text
        ${error ? ' ring-error ring-1' : ''} ${className}`}
      defaultValue={defaultValue}
      disabled={disabled}
      step={step}
      type="number"
      {...register(label, { validate })}
    />
  )
}
