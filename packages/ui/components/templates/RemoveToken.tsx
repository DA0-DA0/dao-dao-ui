import { XIcon } from '@heroicons/react/outline'
import { useFormContext } from 'react-hook-form'

import { TokenInfoResponse } from '@dao-dao/types/contracts/cw20-gov'
import { Button } from '@dao-dao/ui'
import { AddressInput, InputErrorMessage, InputLabel } from '@dao-dao/ui'
import {
  makeWasmMessage,
  validateContractAddress,
  validateRequired,
} from '@dao-dao/utils'

import {
  TemplateComponent,
  ToCosmosMsgProps,
  TokenInfoDisplay,
  TokenInfoDisplayProps,
} from './common'

export interface RemoveTokenData {
  address: string
}

export const removeTokenDefaults = (): RemoveTokenData => ({
  address: '',
})

interface Token {
  address: string
  info: TokenInfoResponse
}

interface AddressSelectorProps {
  onSelect: (address: string) => void
  selectedAddress: string
  tokenOptions: Token[]
  readOnly?: boolean
}

const AddressSelector = ({
  onSelect,
  selectedAddress,
  tokenOptions,
  readOnly,
}: AddressSelectorProps) => (
  <div className="grid grid-cols-5 gap-1">
    {tokenOptions.map(({ address, info }) => (
      <Button
        key={address}
        className={`${
          address === selectedAddress ? '' : 'bg-transparent text-secondary'
        }`}
        disabled={readOnly}
        onClick={() => onSelect(address)}
        size="sm"
        type="button"
        variant="secondary"
      >
        ${info.symbol}
      </Button>
    ))}
  </div>
)

type RemoveTokenOptions = TokenInfoDisplayProps & {
  existingTokens: Token[]
}

export const RemoveTokenComponent: TemplateComponent<RemoveTokenOptions> = ({
  getLabel,
  onRemove,
  errors,
  readOnly,
  options: { existingTokens, ...options },
}) => {
  const { register, watch, setValue } = useFormContext()

  const tokenAddress = watch(getLabel('address'))

  const validateIsTreasuryToken = (v: string) =>
    existingTokens.some(({ address }) => address === v) ||
    'This token is not in the DAO treasury.'

  return (
    <div className="flex flex-col p-3 my-2 bg-primary rounded-lg">
      <div className="flex gap-2 justify-between items-center">
        <div className="flex gap-2 items-center">
          <h2 className="text-3xl">⭕️</h2>
          <h2>Remove Treasury Token</h2>
        </div>
        {onRemove && (
          <button onClick={onRemove} type="button">
            <XIcon className="h-4" />
          </button>
        )}
      </div>
      <div className="flex flex-col gap-1 my-3">
        <AddressSelector
          onSelect={(address) => setValue(getLabel('address'), address)}
          readOnly={readOnly}
          selectedAddress={tokenAddress}
          tokenOptions={existingTokens}
        />
      </div>
      <div className="flex flex-col mb-3">
        <InputLabel name="Token address" />
        <AddressInput
          disabled={readOnly}
          error={errors?.address}
          label={getLabel('address')}
          register={register}
          validation={[
            validateRequired,
            validateContractAddress,
            validateIsTreasuryToken,
          ]}
        />
        <InputErrorMessage error={errors?.address} />
      </div>

      <TokenInfoDisplay {...options} />
    </div>
  )
}

export const transformRemoveTokenToCosmos = (
  data: RemoveTokenData,
  { daoAddress }: ToCosmosMsgProps
) =>
  makeWasmMessage({
    wasm: {
      execute: {
        contract_addr: daoAddress,
        funds: [],
        msg: {
          update_cw20_token_list: {
            to_add: [],
            to_remove: [data.address],
          },
        },
      },
    },
  })

export const transformCosmosToRemoveToken = (
  msg: Record<string, any>
): RemoveTokenData | null =>
  'wasm' in msg &&
  'execute' in msg.wasm &&
  'update_cw20_token_list' in msg.wasm.execute.msg &&
  'to_add' in msg.wasm.execute.msg.update_cw20_token_list &&
  msg.wasm.execute.msg.update_cw20_token_list.to_add.length === 0 &&
  'to_remove' in msg.wasm.execute.msg.update_cw20_token_list &&
  msg.wasm.execute.msg.update_cw20_token_list.to_remove.length === 1
    ? {
        address: msg.wasm.execute.msg.update_cw20_token_list.to_remove[0],
      }
    : null
