import { UserIcon, XIcon } from '@heroicons/react/outline'
import { ReactNode } from 'react'
import {
  FieldError,
  FieldPathValue,
  Path,
  UseFormRegister,
  Validate,
} from 'react-hook-form'

import {
  validateAddress,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils/validation'

import { FormCard } from '../FormCard'
import { AddressInput } from './AddressInput'
import { InputErrorMessage } from './InputErrorMessage'
import { NumberInput } from './NumberInput'

/**
 * @param label      - the label for the value that this will contain.
 * @param register   - the register function returned by `useForm`.
 * @param error      - any errors that have occured during validation of this
 *                     input.
 * @param validation - a list of functions that, when given the current value
 *                     of this field, return true if the value is valid and an
 *                     error message otherwise.
 */
export function TokenAmountInput<
  FieldValues,
  AmountFieldName extends Path<FieldValues>,
  AddrFieldName extends Path<FieldValues>
>({
  amountLabel,
  addrLabel,
  onRemove,
  tokenSymbol,
  tokenImage,
  hideRemove,
  icon = <UserIcon className="w-4" />,
  title,
  register,
  onPlusMinus,
  amountError,
  addrError,
  readOnly,
}: {
  amountLabel: AmountFieldName
  addrLabel: AddrFieldName
  onRemove: () => void
  tokenSymbol?: string
  tokenImage?: string
  hideRemove: boolean
  icon?: ReactNode
  title: string
  register: UseFormRegister<FieldValues>
  onPlusMinus?: [() => void, () => void]
  amountError?: FieldError
  addrError?: FieldError
  readOnly?: boolean
}) {
  type ValidateFn = Validate<FieldPathValue<FieldValues, AddrFieldName>>

  const numberInputParams = {
    defaultValue: '0',
    disabled: readOnly,
    error: amountError,
    label: amountLabel as any,
    onPlusMinus: onPlusMinus,
    register: register,
    step: 0.000001,
    validation: [
      validateRequired as ValidateFn,
      validatePositive as ValidateFn,
    ],
  }

  return (
    <FormCard>
      <div className="flex flex-col gap-3 justify-between md:flex-row">
        <div className="flex justify-between">
          <p className="flex gap-2 items-center body-text">
            {icon}
            {title}
          </p>
          <div className="md:hidden">
            <button onClick={onRemove} type="button">
              <XIcon className="w-4 text-error" />
            </button>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex flex-col gap-1">
            <div className="hidden md:block">
              <NumberInput {...numberInputParams} sizing="md" />
            </div>
            <div className="md:hidden">
              <NumberInput {...numberInputParams} />
            </div>
            <InputErrorMessage error={amountError} />
          </div>
          {tokenSymbol && (
            <div className="flex gap-1 items-center">
              <div
                className="w-4 h-4 bg-center bg-cover rounded-full border border-default"
                style={{
                  backgroundImage: `url(${tokenImage})`,
                }}
              ></div>
              <p className="link-text">{tokenSymbol}</p>
            </div>
          )}
        </div>
        <div className="flex gap-2 items-center">
          <p className="hidden font-mono md:block secondary-text">{'->'}</p>
          <div className="flex flex-col gap-1">
            <AddressInput
              disabled={readOnly}
              error={addrError}
              label={addrLabel}
              register={register}
              validation={[
                validateRequired as ValidateFn,
                validateAddress as ValidateFn,
              ]}
            />
            <InputErrorMessage error={addrError} />
          </div>
        </div>
        {!readOnly && !hideRemove && (
          <button className="hidden md:block" onClick={onRemove} type="button">
            <XIcon className="w-4 text-error" />
          </button>
        )}{' '}
      </div>
    </FormCard>
  )
}
