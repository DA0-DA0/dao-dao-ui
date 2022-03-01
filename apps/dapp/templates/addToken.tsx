import { AddressInput } from '@components/input/AddressInput'
import { InputErrorMessage } from '@components/input/InputErrorMessage'
import { InputLabel } from '@components/input/InputLabel'
import { LogoNoBorder } from '@components/Logo'
import { XIcon } from '@heroicons/react/outline'
import { useEffect } from 'react'
import { FieldErrors, useFormContext } from 'react-hook-form'
import { useRecoilValueLoadable } from 'recoil'
import { tokenConfig } from 'selectors/daos'
import { Config } from 'util/contractConfigWrapper'
import { validateContractAddress, validateRequired } from 'util/formValidation'
import { makeWasmMessage } from 'util/messagehelpers'
import { ToCosmosMsgProps } from './templateList'

export interface AddTokenData {
  address: string
}

export const addTokenDefaults = (
  _walletAddress: string,
  _contractConfig: Config
) => {
  return {
    address: '',
  }
}

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
    if (tokenInfo.state === 'hasError') setError('Failed to get token info')
    else if (tokenInfo.state !== 'loading') clearError()
  }, [tokenInfo.state])

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

export const TokenSelector = ({
  getLabel,
  onRemove,
  errors,
  symbol,
  title,
}: {
  getLabel: (field: string) => string
  onRemove: () => void
  errors: FieldErrors
  symbol: string
  title: string
}) => {
  const { register, watch, setError, clearErrors } = useFormContext()

  const tokenAddress = watch(getLabel('address'))

  return (
    <div className="flex flex flex-col py-2 px-3 rounded-lg my-2 bg-base-300">
      <div className="flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-4xl">{symbol}</h2>
          <h2>{title}</h2>
        </div>
        <button onClick={() => onRemove()} type="button">
          <XIcon className="h-4" />
        </button>
      </div>
      <div className="flex flex-col">
        <InputLabel name="Token address" />
        <AddressInput
          label={getLabel('address') as never}
          register={register}
          error={errors.to}
          validation={[validateRequired, validateContractAddress]}
          border={false}
        />
        <InputErrorMessage error={errors.to} />
      </div>
      <TokenInfoDisplay
        address={tokenAddress}
        setError={(message) =>
          setError(getLabel('address'), { type: 'manual', message })
        }
        clearError={() => clearErrors(getLabel('address'))}
      />
    </div>
  )
}

export const AddTokenComponent = ({
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
  return (
    <TokenSelector
      getLabel={getLabel}
      onRemove={onRemove}
      errors={errors}
      symbol="🔘"
      title="Add Treasury Token"
    />
  )
}

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
