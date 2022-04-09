import { useRecoilValue } from 'recoil'

import {
  Config,
  contractConfigSelector,
  ContractConfigWrapper,
} from 'util/contractConfigWrapper'
import {
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
} from 'util/conversion'
import {
  validateAddress,
  validatePositive,
  validateRequired,
} from 'util/formValidation'
import { makeExecutableMintMessage, makeMintMessage } from 'util/messagehelpers'

import { AddressInput } from '@components/input/AddressInput'
import { InputErrorMessage } from '@components/input/InputErrorMessage'
import { NumberInput } from '@components/input/NumberInput'
import { ArrowRightIcon, XIcon } from '@heroicons/react/outline'
import { useFormContext } from 'react-hook-form'

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
    <div className="flex justify-between items-center bg-primary p-3 rounded-lg my-2">
      <div className="flex items-center gap-4 gap-y-2 flex-wrap">
        <div className="flex items-center flex-wrap gap-2 w-24">
          <h2 className="text-3xl">🌿</h2>
          <h2>Mint</h2>
        </div>
        <div className="flex flex-col">
          <NumberInput
            small
            onPlusMinus={[
              () =>
                setValue(getLabel('amount'), (Number(amount) + 1).toString()),
              () =>
                setValue(getLabel('amount'), (Number(amount) - 1).toString()),
            ]}
            label={getLabel('amount')}
            register={register}
            error={errors?.amount}
            validation={[validateRequired, validatePositive]}
            disabled={readOnly}
          />
          <InputErrorMessage error={errors?.amount} />
        </div>
        {govTokenDenom && (
          <p className="font-mono text-secondary text-sm uppercase">
            ${govTokenDenom}
          </p>
        )}
        <div className="flex gap-2 items-center">
          <p className="secondary-text font-mono">{'->'}</p>
          <div className="flex flex-col">
            <AddressInput
              label={getLabel('to')}
              register={register}
              error={errors?.to}
              validation={[validateRequired, validateAddress]}
              disabled={readOnly}
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
