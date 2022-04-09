import { useEffect } from 'react'

import { useRecoilValueLoadable } from 'recoil'

import { Config } from 'util/contractConfigWrapper'
import { validateContractAddress, validateRequired } from 'util/formValidation'
import { makeWasmMessage } from 'util/messagehelpers'

import { AddressInput } from '@components/input/AddressInput'
import { InputErrorMessage } from '@components/input/InputErrorMessage'
import { InputLabel } from '@components/input/InputLabel'
import { LogoNoBorder } from '@components/Logo'
import { XIcon } from '@heroicons/react/outline'
import { useFormContext } from 'react-hook-form'
import { tokenConfig } from 'selectors/daos'

import {
  TemplateComponent,
  TemplateComponentProps,
  ToCosmosMsgProps,
} from './templateList'

export interface AddTokenData {
  address: string
}

export const addTokenDefaults = (
  _walletAddress: string,
  _contractConfig: Config
): AddTokenData => ({
  address: '',
})

export const TokenInfoDisplay = ({
  address,
  setError,
  clearError,
}: {
  address: string
  setError: (message: string) => void
  clearError: () => void
}) => {
  const tokenInfo = useRecoilValueLoadable(tokenConfig(address))

  useEffect(() => {
    if (tokenInfo.state === 'hasError') {
      setError('Failed to get token info')
    } else {
      clearError()
    }
  }, [tokenInfo, setError, clearError])

  return (
    <div>
      {tokenInfo.state === 'loading' && (
        <div className="animate-spin-medium inline-block mt-2 p-2">
          <LogoNoBorder />
        </div>
      )}
      {tokenInfo.state === 'hasValue' && (
        <>
          <InputLabel name="Token info" />
          <pre className="overflow-auto border rounded-lg p-2 text-secondary border-secondary">
            {JSON.stringify(tokenInfo.getValue(), null, 2)}
          </pre>
        </>
      )}
    </div>
  )
}

interface TokenSelectorProps
  extends Pick<
    TemplateComponentProps,
    'getLabel' | 'onRemove' | 'errors' | 'readOnly'
  > {
  symbol: string
  title: string
}

export const TokenSelector = ({
  getLabel,
  onRemove,
  errors,
  readOnly,
  symbol,
  title,
}: TokenSelectorProps) => {
  const { register, watch, setError, clearErrors } = useFormContext()

  const tokenAddress = watch(getLabel('address'))

  return (
    <div className="flex flex-col p-3 rounded-lg my-2 bg-primary">
      <div className="flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-3xl">{symbol}</h2>
          <h2>{title}</h2>
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
          label={getLabel('address')}
          register={register}
          error={errors?.to}
          validation={[validateRequired, validateContractAddress]}
          disabled={readOnly}
        />
        <InputErrorMessage error={errors?.to} />
      </div>
      <TokenInfoDisplay
        address={tokenAddress}
        setError={(message) =>
          setError(getLabel('to'), { type: 'manual', message })
        }
        clearError={() => clearErrors(getLabel('to'))}
      />
    </div>
  )
}

export const AddTokenComponent: TemplateComponent = ({
  getLabel,
  onRemove,
  errors,
  readOnly,
}) => (
  <TokenSelector
    getLabel={getLabel}
    onRemove={onRemove}
    errors={errors}
    readOnly={readOnly}
    symbol="🔘"
    title="Add Treasury Token"
  />
)

export const transformAddTokenToCosmos = (
  self: AddTokenData,
  props: ToCosmosMsgProps
) => {
  return makeWasmMessage({
    wasm: {
      execute: {
        contract_addr: props.sigAddress,
        funds: [],
        msg: {
          update_cw20_token_list: {
            to_add: [self.address],
            to_remove: [],
          },
        },
      },
    },
  })
}

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
