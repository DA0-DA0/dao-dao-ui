import { useRecoilValue } from 'recoil'

import { XIcon } from '@heroicons/react/outline'
import { useFormContext } from 'react-hook-form'

import { AddressInput } from '@components/input/AddressInput'
import { InputErrorMessage } from '@components/input/InputErrorMessage'
import { NumberInput } from '@components/input/NumberInput'
import {
  Config,
  contractConfigSelector,
  ContractConfigWrapper,
} from 'util/contractConfigWrapper'
import {
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
} from '@dao-dao/utils'
import {
  validateAddress,
  validatePositive,
  validateRequired,
} from 'util/formValidation'
import { makeExecutableMintMessage, makeMintMessage } from 'util/messagehelpers'

import {
  FromCosmosMsgProps,
  TemplateComponent,
  ToCosmosMsgProps,
} from './templateList'

export interface MintData {
  to: string
  amount: number
}

export const mintDefaults = (
  walletAddress: string,
  _contractConfig: Config
): MintData => ({
  to: walletAddress,
  amount: 1,
})

export const MintComponent: TemplateComponent = ({
  contractAddress,
  getLabel,
  onRemove,
  errors,
  multisig,
  readOnly,
}) => {
  const { register, watch, setValue } = useFormContext()
  const amount = watch(getLabel('amount'))

  const info = useRecoilValue(
    contractConfigSelector({ contractAddress, multisig: !!multisig })
  )
  const config = new ContractConfigWrapper(info)
  const govTokenDenom = config.gov_token_symbol

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
        {govTokenDenom && (
          <p className="font-mono text-sm text-secondary uppercase">
            ${govTokenDenom}
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
