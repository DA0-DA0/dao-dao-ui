import { useRecoilValue, waitForAll } from 'recoil'

import { Button } from '@dao-dao/ui'
import { AddressInput, InputErrorMessage, InputLabel } from '@dao-dao/ui'
import { XIcon } from '@heroicons/react/outline'
import { useFormContext } from 'react-hook-form'
import { Button } from '@dao-dao/ui'

import { cw20TokenInfo, cw20TokensList } from 'selectors/treasury'
import { Config } from 'util/contractConfigWrapper'
import { validateContractAddress, validateRequired } from 'util/formValidation'
import { makeWasmMessage } from 'util/messagehelpers'

import { TokenInfoDisplay } from './addToken'
import { TemplateComponent, ToCosmosMsgProps } from './templateList'

export interface RemoveTokenData {
  address: string
}

export const removeTokenDefaults = (
  _walletAddress: string,
  _contractConfig: Config
): RemoveTokenData => ({
  address: '',
})

interface AddressSelectorProps {
  onSelect: (address: string) => void
  selectedAddress: string
  options: string[]
  readOnly?: boolean
}

const AddressSelector = ({
  onSelect,
  selectedAddress,
  options,
  readOnly,
}: AddressSelectorProps) => {
  const tokenInfo = useRecoilValue(
    waitForAll(options.map((address) => cw20TokenInfo(address)))
  )

  const active = (a: string) => a === selectedAddress
  return (
    <div className="grid grid-cols-5 gap-1">
      {options.map((address, idx) => {
        const info = tokenInfo[idx]
        return (
          <Button
            key={address}
            className={`${
              active(address) ? '' : 'bg-transparent text-secondary'
            }`}
            disabled={readOnly}
            onClick={() => onSelect(address)}
            size="sm"
            type="button"
            variant="secondary"
          >
            ${info.symbol}
          </Button>
        )
      })}
    </div>
  )
}

export const RemoveTokenComponent: TemplateComponent = ({
  contractAddress,
  getLabel,
  onRemove,
  errors,
  readOnly,
}) => {
  const { register, watch, setError, clearErrors, setValue } = useFormContext()

  const tokens = useRecoilValue(cw20TokensList(contractAddress))
  const tokenAddress = watch(getLabel('address'))

  const validateIsTreasuryToken = (v: string) =>
    tokens.includes(v) || 'This token is not in the DAO treasury.'

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
          options={tokens}
          readOnly={readOnly}
          selectedAddress={tokenAddress}
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
      <TokenInfoDisplay
        address={tokenAddress}
        clearError={() => clearErrors(getLabel('address'))}
        setError={(message) =>
          setError(getLabel('address'), { type: 'manual', message })
        }
      />
    </div>
  )
}

export const transformRemoveTokenToCosmos = (
  self: RemoveTokenData,
  props: ToCosmosMsgProps
) => {
  return makeWasmMessage({
    wasm: {
      execute: {
        contract_addr: props.sigAddress,
        funds: [],
        msg: {
          update_cw20_token_list: {
            to_add: [],
            to_remove: [self.address],
          },
        },
      },
    },
  })
}

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
