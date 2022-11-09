import { useCallback, useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  constSelector,
  useRecoilValue,
  useRecoilValueLoadable,
  waitForAll,
} from 'recoil'

import { Cw20BaseSelectors, CwdCoreV2Selectors } from '@dao-dao/state'
import { XEmoji } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionMaker,
  ActionOptionsContextType,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { TokenInfoResponse } from '@dao-dao/types/contracts/Cw20Base'
import { makeWasmMessage } from '@dao-dao/utils'

import { RemoveCw20Component as StatelessRemoveCw20Component } from '../components/RemoveCw20'

interface RemoveCw20Data {
  address: string
}

const useDefaults: UseDefaults<RemoveCw20Data> = () => ({
  address: '',
})

const useDecodedCosmosMsg: UseDecodedCosmosMsg<RemoveCw20Data> = (
  msg: Record<string, any>
) =>
  useMemo(
    () =>
      'wasm' in msg &&
      'execute' in msg.wasm &&
      'update_cw20_token_list' in msg.wasm.execute.msg &&
      'to_add' in msg.wasm.execute.msg.update_cw20_token_list &&
      msg.wasm.execute.msg.update_cw20_token_list.to_add.length === 0 &&
      'to_remove' in msg.wasm.execute.msg.update_cw20_token_list &&
      msg.wasm.execute.msg.update_cw20_token_list.to_remove.length === 1
        ? {
            match: true,
            data: {
              address: msg.wasm.execute.msg.update_cw20_token_list.to_remove[0],
            },
          }
        : { match: false },
    [msg]
  )

export const makeRemoveCw20Action: ActionMaker<RemoveCw20Data> = ({
  t,
  address,
  context,
}) => {
  // Only DAOs.
  if (context.type !== ActionOptionsContextType.Dao) {
    return null
  }

  const Component: ActionComponent = (props) => {
    const { t } = useTranslation()
    const { fieldNamePrefix } = props

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

    const existingTokenAddresses = useRecoilValue(
      CwdCoreV2Selectors.allCw20TokenListSelector({
        contractAddress: address,
      })
    )
    const existingTokenInfos = useRecoilValue(
      waitForAll(
        existingTokenAddresses?.map((token) =>
          Cw20BaseSelectors.tokenInfoSelector({
            contractAddress: token,
            params: [],
          })
        ) ?? []
      )
    )
    const existingTokens = useMemo(
      () =>
        (existingTokenAddresses
          ?.map((address, idx) => ({
            address,
            info: existingTokenInfos[idx],
          }))
          // If undefined token info response, ignore the token.
          .filter(({ info }) => !!info) ?? []) as {
          address: string
          info: TokenInfoResponse
        }[],
      [existingTokenAddresses, existingTokenInfos]
    )

    const [additionalAddressError, setAdditionalAddressError] =
      useState<string>()
    useEffect(() => {
      if (tokenInfoLoadable.state !== 'hasError' && existingTokens.length > 0) {
        if (additionalAddressError) {
          setAdditionalAddressError(undefined)
        }
        return
      }

      if (!additionalAddressError) {
        setAdditionalAddressError(
          tokenInfoLoadable.state === 'hasError'
            ? t('error.notCw20Address')
            : existingTokens.length === 0
            ? t('error.noCw20Tokens')
            : // Should never happen.
              t('error.unexpectedError')
        )
      }
    }, [
      tokenInfoLoadable.state,
      existingTokens.length,
      t,
      additionalAddressError,
    ])

    return (
      <StatelessRemoveCw20Component
        {...props}
        options={{
          additionalAddressError,
          existingTokens,
          formattedJsonDisplayProps: {
            jsonLoadable: tokenInfoLoadable,
          },
        }}
      />
    )
  }

  const useTransformToCosmos: UseTransformToCosmos<RemoveCw20Data> = () =>
    useCallback(
      (data: RemoveCw20Data) =>
        makeWasmMessage({
          wasm: {
            execute: {
              contract_addr: address,
              funds: [],
              msg: {
                update_cw20_token_list: {
                  to_add: [],
                  to_remove: [data.address],
                },
              },
            },
          },
        }),
      []
    )

  return {
    key: CoreActionKey.RemoveCw20,
    Icon: XEmoji,
    label: t('title.removeCw20FromTreasury'),
    description: t('info.removeCw20FromTreasuryActionDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
