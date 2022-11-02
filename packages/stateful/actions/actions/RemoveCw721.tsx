import { useCallback, useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  constSelector,
  useRecoilValue,
  useRecoilValueLoadable,
  waitForAll,
} from 'recoil'

import { Cw721BaseSelectors, CwdCoreV2Selectors } from '@dao-dao/state'
import { RemoveCw721Emoji } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionKey,
  ActionMaker,
  ActionOptionsContextType,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { ContractInfoResponse } from '@dao-dao/types/contracts/Cw721Base'
import { makeWasmMessage } from '@dao-dao/utils'

import { RemoveCw721Component as StatelessRemoveCw721Component } from '../components/RemoveCw721'

interface RemoveCw721Data {
  address: string
}

const useDefaults: UseDefaults<RemoveCw721Data> = () => ({
  address: '',
})

const useDecodedCosmosMsg: UseDecodedCosmosMsg<RemoveCw721Data> = (
  msg: Record<string, any>
) =>
  useMemo(
    () =>
      'wasm' in msg &&
      'execute' in msg.wasm &&
      'update_cw721_token_list' in msg.wasm.execute.msg &&
      'to_add' in msg.wasm.execute.msg.update_cw721_token_list &&
      msg.wasm.execute.msg.update_cw721_token_list.to_add.length === 0 &&
      'to_remove' in msg.wasm.execute.msg.update_cw721_token_list &&
      msg.wasm.execute.msg.update_cw721_token_list.to_remove.length === 1
        ? {
            match: true,
            data: {
              address:
                msg.wasm.execute.msg.update_cw721_token_list.to_remove[0],
            },
          }
        : { match: false },
    [msg]
  )

export const makeRemoveCw721Action: ActionMaker<RemoveCw721Data> = ({
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

    const existingTokenAddresses = useRecoilValue(
      CwdCoreV2Selectors.allCw721TokenListSelector({
        contractAddress: address,
      })
    )
    const existingTokenInfos = useRecoilValue(
      waitForAll(
        existingTokenAddresses?.map((token) =>
          Cw721BaseSelectors.contractInfoSelector({
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
          info: ContractInfoResponse
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
            ? t('error.notCw721Address')
            : existingTokens.length === 0
            ? t('error.noCw721Tokens')
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
      <StatelessRemoveCw721Component
        {...props}
        options={{
          additionalAddressError,
          existingTokens,
          formattedJsonDisplayProps: {
            jsonLoadable: tokenInfoLoadable,
            Loader,
          },
        }}
      />
    )
  }

  const useTransformToCosmos: UseTransformToCosmos<RemoveCw721Data> = () =>
    useCallback(
      (data: RemoveCw721Data) =>
        makeWasmMessage({
          wasm: {
            execute: {
              contract_addr: address,
              funds: [],
              msg: {
                update_cw721_token_list: {
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
    key: ActionKey.RemoveCw721,
    Icon: RemoveCw721Emoji,
    label: t('title.removeCw721FromTreasury'),
    description: t('info.removeCw721FromTreasuryActionDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
