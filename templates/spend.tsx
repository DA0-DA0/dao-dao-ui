import { AddressInput } from '@components/input/AddressInput'
import { InputErrorMessage } from '@components/input/InputErrorMessage'
import { NumberInput } from '@components/input/NumberInput'
import { SelectInput } from '@components/input/SelectInput'
import { ArrowRightIcon, XIcon } from '@heroicons/react/outline'
import { FieldErrors, useFormContext } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import { NATIVE_DECIMALS } from 'util/constants'
import {
  Config,
  contractConfigSelector,
  ContractConfigWrapper,
} from 'util/contractConfigWrapper'
import { convertDenomToMicroDenomWithDecimals } from 'util/conversion'
import {
  validateAddress,
  validatePositive,
  validateRequired,
} from 'util/formValidation'
import { makeBankMessage, makeWasmMessage } from 'util/messagehelpers'
import { ToCosmosMsgProps } from './templateList'

export interface SpendData {
  to: string
  amount: number
  denom: string
}

export const spendDefaults = (
  walletAddress: string,
  _contractConfig: Config
) => {
  return {
    to: walletAddress,
    amount: 1,
    denom: process.env.NEXT_PUBLIC_FEE_DENOM,
  }
}

export const SpendComponent = ({
  contractAddress,
  getLabel,
  onRemove,
  errors,
  multisig,
}: {
  contractAddress: string
  getLabel: (field: string) => string
  onRemove: () => void
  errors: FieldErrors
  multisig?: boolean
}) => {
  const { register } = useFormContext()

  const info = useRecoilValue(
    contractConfigSelector({ contractAddress, multisig: !!multisig })
  )
  const config = new ContractConfigWrapper(info)
  const govTokenDenom = config.gov_token_symbol

  return (
    <div className="flex justify-between items-center bg-base-300 py-2 px-3 rounded-lg my-2">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center flex-wrap gap-x-2 gap-y-2 w-24">
          <h2 className="text-4xl">💵</h2>
          <h2>Spend</h2>
        </div>
        <div className="flex flex-col">
          <NumberInput
            label={getLabel('amount') as never}
            register={register}
            error={errors.amount}
            validation={[validateRequired, validatePositive]}
            border={false}
          />
          <InputErrorMessage error={errors.amount} />
        </div>
        <SelectInput
          label={getLabel('denom') as never}
          register={register}
          error={errors.denom}
          defaultValue={process.env.NEXT_PUBLIC_FEE_DENOM}
          border={false}
        >
          <option>{process.env.NEXT_PUBLIC_FEE_DENOM}</option>
          {govTokenDenom && <option>${govTokenDenom}</option>}
        </SelectInput>
        <div className="flex gap-2 items-center">
          <ArrowRightIcon className="h-4" />
          <div className="flex flex-col">
            <AddressInput
              label={getLabel('to') as never}
              register={register}
              error={errors.to}
              validation={[validateRequired, validateAddress]}
              border={false}
            />
            <InputErrorMessage error={errors.to} />
          </div>
        </div>
      </div>
      <button onClick={onRemove} type="button">
        <XIcon className="h-4" />
      </button>
    </div>
  )
}

export const transformSpendToCosmos = (
  self: SpendData,
  props: ToCosmosMsgProps
) => {
  if (self.denom === process.env.NEXT_PUBLIC_FEE_DENOM) {
    const amount = convertDenomToMicroDenomWithDecimals(
      self.amount,
      NATIVE_DECIMALS
    )
    const bank = makeBankMessage(amount, self.to, props.sigAddress, self.denom)
    return { bank }
  }
  const amount = convertDenomToMicroDenomWithDecimals(
    self.amount,
    props.govDecimals
  )
  return makeWasmMessage({
    wasm: {
      execute: {
        contract_addr: props.govAddress,
        funds: [],
        msg: {
          transfer: {
            recipient: self.to,
            amount: amount,
          },
        },
      },
    },
  })
}
