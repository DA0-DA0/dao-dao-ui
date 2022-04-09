import { useState } from 'react'
import { ChangeEventHandler } from 'react'

import { useSetRecoilState } from 'recoil'

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
}) {
  const validate = validation?.reduce(
    (a, v) => ({ ...a, [v.toString()]: v }),
    {}
  )

  if (onPlusMinus) {
    return (
      <div
        className={`flex items-center gap-1 bg-transparent rounded-lg px-3 py-2 transition focus-within:ring-1 focus-within:outline-none ring-brand ring-offset-0 border-default border border-default text-sm ${
          small ? 'w-40' : ''
        }
        ${error ? ' ring-error ring-1' : ''}`}
      >
        <button
          type="button"
          className="secondary-text hover:body-text transition"
          onClick={() => onPlusMinus[0]()}
          disabled={disabled}
        >
          <PlusIcon className="w-4" />
        </button>
        <button
          type="button"
          className="secondary-text hover:body-text transition"
          onClick={() => onPlusMinus[1]()}
          disabled={disabled}
        >
          <MinusIcon className="w-4" />
        </button>
        <input
          type="number"
          step={step}
          className="bg-transparent w-full ring-none border-none outline-none text-right"
          disabled={disabled}
          defaultValue={defaultValue}
          {...register(label, {
            validate,
          })}
        />
      </div>
    )
  }

  return (
    <input
      type="number"
      step={step}
      defaultValue={defaultValue}
      className={`bg-transparent rounded-lg px-3 py-2 transition focus:ring-1 focus:outline-none ring-brand ring-offset-0 border-default border border-default body-text
        ${error ? ' ring-error ring-1' : ''}`}
      disabled={disabled}
      {...register(label, { validate })}
    />
  )
}
