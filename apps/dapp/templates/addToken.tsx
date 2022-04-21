import { useEffect } from 'react'

import { useRecoilValueLoadable } from 'recoil'

import {
  AddressInput,
  InputErrorMessage,
  InputLabel,
  LogoNoBorder,
} from '@dao-dao/ui'
import { XIcon } from '@heroicons/react/outline'
import { useFormContext } from 'react-hook-form'

import { tokenConfig } from 'selectors/daos'
import { Config } from 'util/contractConfigWrapper'
import { validateContractAddress, validateRequired } from 'util/formValidation'
import { makeWasmMessage } from 'util/messagehelpers'

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
    } else if (tokenInfo.state === 'loading') {
      setError('Loading token')
    } else {
      clearError()
    }
  }, [tokenInfo, setError, clearError])

  return (
    <div>
      {tokenInfo.state === 'loading' && (
        <div className="inline-block p-2 mt-2 animate-spin-medium">
          <LogoNoBorder />
        </div>
      )}
      {tokenInfo.state === 'hasValue' && (
        <>
          <InputLabel name="Token info" />
          <pre className="overflow-auto p-2 text-secondary rounded-lg border border-secondary">
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
    <div className="flex flex-col p-3 my-2 bg-primary rounded-lg">
      <div className="flex gap-2 justify-between items-center">
        <div className="flex gap-2 items-center">
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
          disabled={readOnly}
          error={errors?.to}
          label={getLabel('address')}
          register={register}
          validation={[validateRequired, validateContractAddress]}
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

export const AddTokenComponent: TemplateComponent = ({
  getLabel,
  onRemove,
  errors,
  readOnly,
}) => (
  <TokenSelector
    errors={errors}
    getLabel={getLabel}
    onRemove={onRemove}
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
