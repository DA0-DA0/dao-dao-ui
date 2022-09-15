import { useCallback, useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import { Cw20BaseSelectors } from '@dao-dao/state'
import {
  Action,
  ActionComponent,
  ActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/tstypes/actions'
import { AddCw20Emoji } from '@dao-dao/ui'
import { makeWasmMessage } from '@dao-dao/utils'

import { AddCw20Component as StatelessAddCw20Component } from '../components/AddCw20'

interface AddCw20Data {
  address: string
}

const useDefaults: UseDefaults<AddCw20Data> = () => ({
  address: '',
})

const Component: ActionComponent = (props) => {
  const { t } = useTranslation()
  const { fieldNamePrefix, Loader } = props

  const { watch } = useFormContext()

  const tokenAddress = watch(fieldNamePrefix + 'address')
  const tokenInfoLoadable = useRecoilValueLoadable(
    tokenAddress
      ? Cw20BaseSelectors.tokenInfoSelector({
          contractAddress: tokenAddress,
          params: [],
        })
      : constSelector(undefined)
  )

  const [additionalAddressError, setAdditionalAddressError] = useState<string>()
  useEffect(() => {
    if (tokenInfoLoadable.state !== 'hasError') {
      if (additionalAddressError) {
        setAdditionalAddressError(undefined)
      }
      return
    }

    if (!additionalAddressError) {
      setAdditionalAddressError(t('error.notCw20Address'))
    }
  }, [tokenInfoLoadable.state, t, additionalAddressError])

  return (
    <StatelessAddCw20Component
      {...props}
      options={{
        additionalAddressError,
        formattedJsonDisplayProps: {
          jsonLoadable: tokenInfoLoadable,
          Loader,
        },
      }}
    />
  )
}

const useTransformToCosmos: UseTransformToCosmos<AddCw20Data> = (
  coreAddress: string
) =>
  useCallback(
    (data: AddCw20Data) =>
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

const useDecodedCosmosMsg: UseDecodedCosmosMsg<AddCw20Data> = (
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

export const addCw20Action: Action<AddCw20Data> = {
  key: ActionKey.AddCw20,
  Icon: AddCw20Emoji,
  label: 'Display Token Balance in Treasury',
  description:
    "Display the DAO's balance of a CW20 token in the treasury view.",
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
}
