import { AddressInput, InputErrorMessage, InputLabel } from '@dao-dao/ui'
import { makeWasmMessage } from '@dao-dao/utils'
import {
  validateContractAddress,
  validateRequired,
} from '@dao-dao/utils/validation'
import { XIcon } from '@heroicons/react/outline'
import { useFormContext } from 'react-hook-form'

import {
  TemplateComponent,
  ToCosmosMsgProps,
  TokenInfoDisplay,
  TokenInfoDisplayProps,
} from './common'

export interface AddTokenData {
  address: string
}

export const addTokenDefaults = (): AddTokenData => ({
  address: '',
})

export const AddTokenComponent: TemplateComponent<TokenInfoDisplayProps> = ({
  getLabel,
  onRemove,
  errors,
  readOnly,
  options,
}) => {
  const { register } = useFormContext()

  return (
    <div className="flex flex-col p-3 my-2 bg-primary rounded-lg">
      <div className="flex gap-2 justify-between items-center">
        <div className="flex gap-2 items-center">
          <h2 className="text-3xl">🔘</h2>
          <h2>Add Treasury Token</h2>
        </div>
        {onRemove && (
          <button onClick={onRemove} type="button">
            <XIcon className="h-4" />
          </button>
        )}
      </div>
      <div className="flex flex-col">
        <InputLabel name="Token address" />
        <AddressInput
          disabled={readOnly}
          error={errors?.to}
          label={getLabel('address')}
          register={register}
          validation={[validateRequired, validateContractAddress]}
        />
        <InputErrorMessage error={errors?.to} />
      </div>

      <TokenInfoDisplay {...options} />
    </div>
  )
}

export const transformAddTokenToCosmos = (
  data: AddTokenData,
  { daoAddress }: ToCosmosMsgProps
) =>
  makeWasmMessage({
    wasm: {
      execute: {
        contract_addr: daoAddress,
        funds: [],
        msg: {
          update_cw20_token_list: {
            to_add: [data.address],
            to_remove: [],
          },
        },
      },
    },
  })

export const transformCosmosToAddToken = (
  msg: Record<string, any>
): AddTokenData | null =>
  'wasm' in msg &&
  'execute' in msg.wasm &&
  'update_cw20_token_list' in msg.wasm.execute.msg &&
  'to_add' in msg.wasm.execute.msg.update_cw20_token_list &&
  msg.wasm.execute.msg.update_cw20_token_list.to_add.length === 1 &&
  'to_remove' in msg.wasm.execute.msg.update_cw20_token_list &&
  msg.wasm.execute.msg.update_cw20_token_list.to_remove.length === 0
    ? {
        address: msg.wasm.execute.msg.update_cw20_token_list.to_add[0],
      }
    : null
