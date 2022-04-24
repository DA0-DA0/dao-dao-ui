import { AddressInput, InputErrorMessage, NumberInput } from '@dao-dao/ui'
import {
  validateAddress,
  validatePositive,
  validateRequired,
  makeExecutableMintMessage,
  makeMintMessage,
} from '@dao-dao/utils'
import {
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
} from '@dao-dao/utils'
import { XIcon } from '@heroicons/react/outline'
import { useFormContext } from 'react-hook-form'

import {
  FromCosmosMsgProps,
  TemplateComponent,
  ToCosmosMsgProps,
} from './common'

export interface MintData {
  to: string
  amount: number
}

export const mintDefaults = ({
  walletAddress,
}: {
  walletAddress: string
}): MintData => ({
  to: walletAddress,
  amount: 1,
})

export interface MintOptions {
  govTokenSymbol: string
}

export const MintComponent: TemplateComponent<MintOptions> = ({
  getLabel,
  onRemove,
  errors,
  readOnly,
  options: { govTokenSymbol },
}) => {
  const { register, watch, setValue } = useFormContext()
  const amount = watch(getLabel('amount'))

  return (
    <div className="flex justify-between items-center p-3 my-2 bg-primary rounded-lg">
      <div className="flex flex-wrap gap-4 gap-y-2 items-center">
        <div className="flex flex-wrap gap-2 items-center w-24">
          <h2 className="text-3xl">🌿</h2>
          <h2>Mint</h2>
        </div>
        <div className="flex flex-col">
          <NumberInput
            disabled={readOnly}
            error={errors?.amount}
            label={getLabel('amount')}
            onPlusMinus={[
              () =>
                setValue(getLabel('amount'), (Number(amount) + 1).toString()),
              () =>
                setValue(getLabel('amount'), (Number(amount) - 1).toString()),
            ]}
            register={register}
            small
            validation={[validateRequired, validatePositive]}
          />
          <InputErrorMessage error={errors?.amount} />
        </div>
        {govTokenSymbol && (
          <p className="font-mono text-sm text-secondary uppercase">
            ${govTokenSymbol}
          </p>
        )}
        <div className="flex gap-2 items-center">
          <p className="font-mono secondary-text">{'->'}</p>
          <div className="flex flex-col">
            <AddressInput
              disabled={readOnly}
              error={errors?.to}
              label={getLabel('to')}
              register={register}
              validation={[validateRequired, validateAddress]}
            />
            <InputErrorMessage error={errors?.to} />
          </div>
        </div>
      </div>
      {onRemove && (
        <button onClick={onRemove} type="button">
          <XIcon className="h-4" />
        </button>
      )}
    </div>
  )
}

export const transformMintToCosmos = (
  self: MintData,
  { govDecimals, govAddress }: ToCosmosMsgProps
) => {
  const amount = convertDenomToMicroDenomWithDecimals(self.amount, govDecimals)
  return makeExecutableMintMessage(makeMintMessage(amount, self.to), govAddress)
}

export const transformCosmosToMint = (
  msg: Record<string, any>,
  { govDecimals }: FromCosmosMsgProps
): MintData | null =>
  'wasm' in msg &&
  'execute' in msg.wasm &&
  'mint' in msg.wasm.execute.msg &&
  'amount' in msg.wasm.execute.msg.mint &&
  'recipient' in msg.wasm.execute.msg.mint
    ? {
        to: msg.wasm.execute.msg.mint.recipient,
        amount: convertMicroDenomToDenomWithDecimals(
          msg.wasm.execute.msg.mint.amount,
          govDecimals
        ),
      }
    : null
