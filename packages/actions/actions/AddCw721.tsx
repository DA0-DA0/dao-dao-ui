import { useCallback, useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import { Cw721BaseSelectors } from '@dao-dao/state'
import {
  ActionComponent,
  ActionKey,
  ActionMaker,
  ActionOptionsContextType,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/tstypes/actions'
import { AddCw721Emoji } from '@dao-dao/ui'
import { makeWasmMessage } from '@dao-dao/utils'

import { AddCw721Component as StatelessAddCw721Component } from '../components/AddCw721'

interface AddCw721Data {
  address: string
}

const useDefaults: UseDefaults<AddCw721Data> = () => ({
  address: '',
})

const Component: ActionComponent = (props) => {
  const { t } = useTranslation()
  const { fieldNamePrefix, Loader } = props

  const { watch } = useFormContext()

  const tokenAddress = watch(fieldNamePrefix + 'address')
  const tokenInfoLoadable = useRecoilValueLoadable(
    tokenAddress
      ? Cw721BaseSelectors.contractInfoSelector({
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
      setAdditionalAddressError(t('error.notCw721Address'))
    }
  }, [tokenInfoLoadable.state, t, additionalAddressError])

  return (
    <StatelessAddCw721Component
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

const useDecodedCosmosMsg: UseDecodedCosmosMsg<AddCw721Data> = (
  msg: Record<string, any>
) =>
  useMemo(
    () =>
      'wasm' in msg &&
      'execute' in msg.wasm &&
      'update_cw721_list' in msg.wasm.execute.msg &&
      'to_add' in msg.wasm.execute.msg.update_cw721_list &&
      msg.wasm.execute.msg.update_cw721_list.to_add.length === 1 &&
      'to_remove' in msg.wasm.execute.msg.update_cw721_list &&
      msg.wasm.execute.msg.update_cw721_list.to_remove.length === 0
        ? {
            match: true,
            data: {
              address: msg.wasm.execute.msg.update_cw721_list.to_add[0],
            },
          }
        : { match: false },
    [msg]
  )

export const makeAddCw721Action: ActionMaker<AddCw721Data> = ({
  t,
  address,
  context,
}) => {
  // Only DAOs.
  if (context.type !== ActionOptionsContextType.Dao) {
    return null
  }

  const useTransformToCosmos: UseTransformToCosmos<AddCw721Data> = () =>
    useCallback(
      (data: AddCw721Data) =>
        makeWasmMessage({
          wasm: {
            execute: {
              contract_addr: address,
              funds: [],
              msg: {
                update_cw721_list: {
                  to_add: [data.address],
                  to_remove: [],
                },
              },
            },
          },
        }),
      []
    )

  return {
    key: ActionKey.AddCw721,
    Icon: AddCw721Emoji,
    label: t('title.addCw721ToTreasury'),
    description: t('info.addCw721ToTreasuryActionDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
