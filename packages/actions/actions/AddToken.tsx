import { useCallback, useEffect, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import { Cw20BaseSelectors } from '@dao-dao/state'
import { makeWasmMessage } from '@dao-dao/utils'

import {
  AddTokenIcon,
  AddTokenComponent as StatelessAddTokenComponent,
} from '../components'
import {
  Action,
  ActionComponent,
  ActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '../types'

interface AddTokenData {
  address: string
}

const useDefaults: UseDefaults<AddTokenData> = () => ({
  address: '',
})

const Component: ActionComponent = (props) => {
  const { fieldNamePrefix, errors, Loader } = props

  const { watch, setError, clearErrors } = useFormContext()

  const tokenAddress = watch(fieldNamePrefix + 'address')
  const tokenInfoLoadable = useRecoilValueLoadable(
    tokenAddress
      ? Cw20BaseSelectors.tokenInfoSelector({
          contractAddress: tokenAddress,
          params: [],
        })
      : constSelector(undefined)
  )

  useEffect(() => {
    if (tokenInfoLoadable.state !== 'hasError') {
      if (errors?.address) {
        clearErrors(fieldNamePrefix + 'address')
      }
      return
    }

    if (!errors?.address) {
      setError(fieldNamePrefix + 'address', {
        type: 'manual',
        message: 'Failed to get token info.',
      })
    }
  }, [
    tokenInfoLoadable.state,
    errors?.address,
    setError,
    clearErrors,
    fieldNamePrefix,
  ])

  return (
    <StatelessAddTokenComponent
      {...props}
      options={{
        loadingTokenInfo: tokenInfoLoadable.state === 'loading',
        tokenInfo:
          tokenInfoLoadable.state === 'hasValue'
            ? tokenInfoLoadable.contents
            : undefined,
        Loader,
      }}
    />
  )
}

const useTransformToCosmos: UseTransformToCosmos<AddTokenData> = (
  coreAddress: string
) =>
  useCallback(
    (data: AddTokenData) =>
      makeWasmMessage({
        wasm: {
          execute: {
            contract_addr: coreAddress,
            funds: [],
            msg: {
              update_cw20_list: {
                to_add: [data.address],
                to_remove: [],
              },
            },
          },
        },
      }),
    [coreAddress]
  )

const useDecodedCosmosMsg: UseDecodedCosmosMsg<AddTokenData> = (
  msg: Record<string, any>
) =>
  useMemo(
    () =>
      'wasm' in msg &&
      'execute' in msg.wasm &&
      'update_cw20_list' in msg.wasm.execute.msg &&
      'to_add' in msg.wasm.execute.msg.update_cw20_list &&
      msg.wasm.execute.msg.update_cw20_list.to_add.length === 1 &&
      'to_remove' in msg.wasm.execute.msg.update_cw20_list &&
      msg.wasm.execute.msg.update_cw20_list.to_remove.length === 0
        ? {
            match: true,
            data: {
              address: msg.wasm.execute.msg.update_cw20_list.to_add[0],
            },
          }
        : { match: false },
    [msg]
  )

export const addTokenAction: Action<AddTokenData> = {
  key: ActionKey.AddToken,
  Icon: AddTokenIcon,
  label: 'Add Treasury Token',
  description: "Add a token to your DAO's treasury.",
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
}
