import { useCallback, useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  constSelector,
  useRecoilValue,
  useRecoilValueLoadable,
  waitForAll,
} from 'recoil'

import { Cw20BaseSelectors } from '@dao-dao/state'
import { DaoCoreV2Selectors } from '@dao-dao/state/recoil'
import { TokenEmoji } from '@dao-dao/stateless'
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
import { makeWasmMessage, objectMatchesStructure } from '@dao-dao/utils'

import { ManageCw20Component as StatelessManageCw20Component } from '../components/ManageCw20'
import { useActionOptions } from '../react'

interface ManageCw20Data {
  adding: boolean
  address: string
}

const useDefaults: UseDefaults<ManageCw20Data> = () => ({
  adding: true,
  address: '',
})

const Component: ActionComponent = (props) => {
  const { address, chainId } = useActionOptions()

  const { t } = useTranslation()
  const { fieldNamePrefix } = props

  const { watch } = useFormContext()

  const tokenAddress = watch(fieldNamePrefix + 'address')
  const tokenInfoLoadable = useRecoilValueLoadable(
    tokenAddress
      ? Cw20BaseSelectors.tokenInfoSelector({
          contractAddress: tokenAddress,
          chainId,
          params: [],
        })
      : constSelector(undefined)
  )

  const existingTokenAddresses = useRecoilValue(
    DaoCoreV2Selectors.allCw20TokenListSelector({
      contractAddress: address,
      chainId,
    })
  )
  const existingTokenInfos = useRecoilValue(
    waitForAll(
      existingTokenAddresses?.map((token) =>
        Cw20BaseSelectors.tokenInfoSelector({
          contractAddress: token,
          chainId,
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

  const [additionalAddressError, setAdditionalAddressError] = useState<string>()
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
    <StatelessManageCw20Component
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

const useDecodedCosmosMsg: UseDecodedCosmosMsg<ManageCw20Data> = (
  msg: Record<string, any>
) =>
  useMemo(
    () =>
      objectMatchesStructure(msg, {
        wasm: {
          execute: {
            contract_addr: {},
            funds: {},
            msg: {
              update_cw20_list: {
                to_add: {},
                to_remove: {},
              },
            },
          },
        },
      }) &&
      // Ensure only one token is being added or removed, but not both, and not
      // more than one token. Ideally this component lets you add or remove
      // multiple tokens at once, but that's not supported yet.
      ((msg.wasm.execute.msg.update_cw20_list.to_add.length === 1 &&
        msg.wasm.execute.msg.update_cw20_list.to_remove.length === 0) ||
        (msg.wasm.execute.msg.update_cw20_list.to_add.length === 0 &&
          msg.wasm.execute.msg.update_cw20_list.to_remove.length === 1))
        ? {
            match: true,
            data: {
              adding: msg.wasm.execute.msg.update_cw20_list.to_add.length === 1,
              address:
                msg.wasm.execute.msg.update_cw20_list.to_add.length === 1
                  ? msg.wasm.execute.msg.update_cw20_list.to_add[0]
                  : msg.wasm.execute.msg.update_cw20_list.to_remove[0],
            },
          }
        : { match: false },
    [msg]
  )

export const makeManageCw20Action: ActionMaker<ManageCw20Data> = ({
  t,
  address,
  context,
}) => {
  // Only DAOs.
  if (context.type !== ActionOptionsContextType.Dao) {
    return null
  }

  const useTransformToCosmos: UseTransformToCosmos<ManageCw20Data> = () =>
    useCallback(
      (data: ManageCw20Data) =>
        makeWasmMessage({
          wasm: {
            execute: {
              contract_addr: address,
              funds: [],
              msg: {
                update_cw20_list: {
                  to_add: data.adding ? [data.address] : [],
                  to_remove: !data.adding ? [data.address] : [],
                },
              },
            },
          },
        }),
      []
    )

  return {
    key: CoreActionKey.ManageCw20,
    Icon: TokenEmoji,
    label: t('title.manageTreasuryTokens'),
    description: t('info.manageTreasuryTokensDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
