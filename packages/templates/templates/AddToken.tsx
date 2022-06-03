import { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import { tokenInfoSelector } from '@dao-dao/state/recoil/selectors/clients/cw20-base'
import { makeWasmMessage } from '@dao-dao/utils'

import {
  AddTokenComponent as StatelessAddTokenComponent,
  TemplateComponent,
  UseDecodeCosmosMsg,
  UseTransformToCosmos,
} from '../components'

export interface AddTokenData {
  address: string
}

export const addTokenDefaults = (): AddTokenData => ({
  address: '',
})

export const AddTokenComponent: TemplateComponent = (props) => {
  const { getLabel } = props

  const { watch, setError, clearErrors } = useFormContext()

  const tokenAddress = watch(getLabel('address'))
  const tokenInfoLoadable = useRecoilValueLoadable(
    tokenAddress
      ? tokenInfoSelector({ contractAddress: tokenAddress, params: [] })
      : constSelector(undefined)
  )

  useEffect(() => {
    if (tokenInfoLoadable.state === 'hasError') {
      setError(getLabel('address'), {
        type: 'manual',
        message: 'Failed to get token info.',
      })
    } else {
      clearErrors(getLabel('address'))
    }
  }, [tokenInfoLoadable.state, setError, clearErrors, getLabel])

  return (
    <StatelessAddTokenComponent
      {...props}
      options={{
        loadingTokenInfo: tokenInfoLoadable.state === 'loading',
        tokenInfo:
          tokenInfoLoadable.state === 'hasValue'
            ? tokenInfoLoadable.contents
            : undefined,
      }}
    />
  )
}

export const useTransformAddTokenToCosmos: UseTransformToCosmos<
  AddTokenData
> = (coreAddress: string) =>
  useCallback(
    (data: AddTokenData) =>
      makeWasmMessage({
        wasm: {
          execute: {
            contract_addr: coreAddress,
            funds: [],
            msg: {
              update_cw20_token_list: {
                to_add: [data.address],
                to_remove: [],
              },
            },
          },
        },
      }),
    [coreAddress]
  )

export const useDecodeAddTokenCosmosMsg: UseDecodeCosmosMsg<AddTokenData> = (
  msg: Record<string, any>
) =>
  'wasm' in msg &&
  'execute' in msg.wasm &&
  'update_cw20_token_list' in msg.wasm.execute.msg &&
  'to_add' in msg.wasm.execute.msg.update_cw20_token_list &&
  msg.wasm.execute.msg.update_cw20_token_list.to_add.length === 1 &&
  'to_remove' in msg.wasm.execute.msg.update_cw20_token_list &&
  msg.wasm.execute.msg.update_cw20_token_list.to_remove.length === 0
    ? {
        match: true,
        data: {
          address: msg.wasm.execute.msg.update_cw20_token_list.to_add[0],
        },
      }
    : { match: false }
