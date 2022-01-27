import { ArrowRightIcon, XIcon } from '@heroicons/react/outline'
import { Control, FieldErrors, UseFormRegisterReturn } from 'react-hook-form'
import {
  validateAddress,
  validateJSON,
  validatePositive,
  validateRequired,
} from 'util/formValidation'
import {
  AddressInput,
  CodeMirrorInput,
  InputErrorMessage,
  NumberInput,
  SelectInput,
} from './InputField'

export interface SpendData {
  to: string
  amount: number
  denom: string
}

export interface MintData {
  to: string
  amount: number
}

export interface CustomData {
  message: string
}

export type Message = SpendData | MintData

export function spendTemplate(walletAddress: string, govTokenDenom: string) {
  return {
    to: walletAddress,
    amount: 1,
    denom: process.env.NEXT_PUBLIC_FEE_DENOM,
    render: (
      _control: Control,
      register: (fieldName: string) => UseFormRegisterReturn,
      unregister: () => void,
      errors: FieldErrors,
      _getRealLabel: (field: string) => string
    ) => {
      return (
        <div className="flex justify-between items-center bg-base-300 py-2 px-3 rounded-lg my-2">
          <div className="flex items-center gap-x-4 gap-y-2 flex-wrap">
            <div className="flex items-center flex-wrap gap-x-2 gap-y-2 w-24">
              <h2 className="text-4xl">💵</h2>
              <h2>Spend</h2>
            </div>
            <div className="flex flex-col">
              <NumberInput
                label={'amount' as never}
                register={register}
                error={errors.amount}
                validation={[validateRequired, validatePositive]}
                noBorder
              />
              <InputErrorMessage error={errors.amount} />
            </div>
            <SelectInput
              label={'denom' as never}
              register={register}
              error={errors.denom}
              noBorder
            >
              <option selected>{process.env.NEXT_PUBLIC_FEE_DENOM}</option>
              <option>${govTokenDenom}</option>
            </SelectInput>
            <div className="flex gap-2 items-center">
              <ArrowRightIcon className="h-4" />
              <div className="flex flex-col">
                <AddressInput
                  label={'to' as never}
                  register={register}
                  error={errors.to}
                  validation={[validateRequired, validateAddress]}
                  noBorder
                />
                <InputErrorMessage error={errors.to} />
              </div>
            </div>
          </div>
          <button onClick={unregister} type="button">
            <XIcon className="h-4" />
          </button>
        </div>
      )
    },
  }
}

export function mintTemplate(walletAddress: string, govTokenDenom: string) {
  return {
    to: walletAddress,
    amount: 1,
    render: (
      _control: Control,
      register: (fieldName: string) => UseFormRegisterReturn,
      unregister: () => void,
      errors: FieldErrors,
      _getRealLabel: (field: string) => string
    ) => {
      return (
        <div className="flex justify-between items-center bg-base-300 py-2 px-3 rounded-lg my-2">
          <div className="flex items-center gap-x-4 gap-y-2 flex-wrap">
            <div className="flex items-center flex-wrap gap-x-2 gap-y-2 w-24">
              <h2 className="text-3xl">🌟</h2>
              <h2>Mint</h2>
            </div>
            <div className="flex flex-col">
              <NumberInput
                label={'amount' as never}
                register={register}
                error={errors.amount}
                validation={[validateRequired, validatePositive]}
                noBorder
              />
              <InputErrorMessage error={errors.amount} />
            </div>
            <p className="font-mono text-secondary text-sm uppercase">
              ${govTokenDenom}
            </p>
            <div className="flex gap-2 items-center">
              <ArrowRightIcon className="h-4" />
              <div className="flex flex-col">
                <AddressInput
                  label={'to' as never}
                  register={register}
                  error={errors.to}
                  validation={[validateRequired, validateAddress]}
                  noBorder
                />
                <InputErrorMessage error={errors.to} />
              </div>
            </div>
          </div>
          <button onClick={unregister} type="button">
            <XIcon className="h-4" />
          </button>
        </div>
      )
    },
  }
}

export function customTemplate() {
  return {
    message: '{}',
    render: (
      control: Control,
      _register: (fieldName: string) => UseFormRegisterReturn,
      unregister: () => void,
      errors: FieldErrors,
      getRealLabel: (field: string) => string
    ) => {
      // We need to use the real label for this component as the
      // control structure we pass along can't me made to understand
      // that we are in a nested object nor wrapped nicely like we do
      // with register.
      return (
        <div className="flex flex-col py-2 px-3 my-2 bg-base-300 rounded-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-3xl">🤖</h2>
              <h2>Custom</h2>
            </div>
            <button onClick={unregister} type="button">
              <XIcon className="h-4" />
            </button>
          </div>
          <CodeMirrorInput
            label={getRealLabel('message') as never}
            control={control}
            error={errors.message}
            validation={[validateJSON]}
          />
          <InputErrorMessage error={errors.message} />
        </div>
      )
    },
  }
}
