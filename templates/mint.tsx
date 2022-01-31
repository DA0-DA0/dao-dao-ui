import { AddressInput } from '@components/input/AddressInput'
import { InputErrorMessage } from '@components/input/InputErrorMessage'
import { NumberInput } from '@components/input/NumberInput'
import { ArrowRightIcon, XIcon } from '@heroicons/react/outline'
import { FieldErrors, useFormContext } from 'react-hook-form'
import { convertDenomToMicroDenomWithDecimals } from 'util/conversion'
import {
  validateAddress,
  validatePositive,
  validateRequired,
} from 'util/formValidation'
import { makeExecutableMintMessage, makeMintMessage } from 'util/messagehelpers'
import { ToCosmosMsgProps } from './templateList'

export interface MintData {
  to: string
  amount: number
}

export const mintDefaults = (walletAddress: string) => {
  return {
    to: walletAddress,
    amount: 1,
  }
}

export const MintComponent = ({
  govTokenDenom,
  getLabel,
  onRemove,
  errors,
}: {
  govTokenDenom?: string
  getLabel: (field: string) => string
  onRemove: () => void
  errors: FieldErrors
}) => {
  const { register } = useFormContext()

  return (
    <div className="flex justify-between items-center bg-base-300 py-2 px-3 rounded-lg my-2">
      <div className="flex items-center gap-4 gap-y-2 flex-wrap">
        <div className="flex items-center flex-wrap gap-x-2 gap-y-2 w-24">
          <h2 className="text-3xl">🍵</h2>
          <h2>Mint</h2>
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
        {govTokenDenom && (
          <p className="font-mono text-secondary text-sm uppercase">
            ${govTokenDenom}
          </p>
        )}
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

export const transformMintToCosmos = (
  self: MintData,
  props: ToCosmosMsgProps
) => {
  const amount = convertDenomToMicroDenomWithDecimals(
    self.amount,
    props.govDecimals
  )
  return makeExecutableMintMessage(
    makeMintMessage(amount, self.to),
    props.govAddress
  )
}
