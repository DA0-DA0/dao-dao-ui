import { ReactNode } from 'react'

import { UserIcon, XIcon } from '@heroicons/react/outline'
import {
  FieldError,
  FieldPathValue,
  Path,
  UseFormRegister,
  Validate,
} from 'react-hook-form'

import { FormCard } from '@components/FormCard'
import {
  validateAddress,
  validatePositive,
  validateRequired,
} from 'util/formValidation'

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

  return (
    <FormCard>
      <div className="flex gap-3 justify-between">
        <p className="body-text flex items-center gap-2">
          {icon} {title}
        </p>
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-1">
            <NumberInput
              small
              onPlusMinus={onPlusMinus}
              label={amountLabel as any}
              register={register}
              error={amountError}
              validation={[
                validateRequired as ValidateFn,
                validatePositive as ValidateFn,
              ]}
              defaultValue="0"
              step={0.000001}
              disabled={readOnly}
            />
            <InputErrorMessage error={amountError} />
          </div>
          {tokenSymbol && (
            <div className="flex items-center gap-1">
              <div
                className="w-4 h-4 rounded-full border border-default bg-center bg-cover"
                style={{
                  backgroundImage: `url(${tokenImage})`,
                }}
              ></div>
              <p className="link-text">{tokenSymbol}</p>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <p className="secondary-text font-mono">{'->'}</p>
          <div className="flex flex-col gap-1">
            <AddressInput
              label={addrLabel}
              register={register}
              error={addrError}
              validation={[
                validateRequired as ValidateFn,
                validateAddress as ValidateFn,
              ]}
              disabled={readOnly}
            />
            <InputErrorMessage error={addrError} />
          </div>
        </div>
        {!readOnly && (
          <button
            type="button"
            onClick={onRemove}
            className={`${hideRemove ? 'hidden' : ''}`}
          >
            <XIcon className="text-error w-4" />
          </button>
        )}{' '}
      </div>
    </FormCard>
  )
}
