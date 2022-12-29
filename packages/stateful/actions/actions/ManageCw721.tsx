import { useCallback, useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  constSelector,
  useRecoilValue,
  useRecoilValueLoadable,
  waitForAll,
} from 'recoil'

import { Cw721BaseSelectors } from '@dao-dao/state'
import { DaoCoreV2Selectors } from '@dao-dao/state/recoil'
import { ImageEmoji } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionMaker,
  ActionOptionsContextType,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { ContractInfoResponse } from '@dao-dao/types/contracts/Cw721Base'
import { makeWasmMessage } from '@dao-dao/utils'

import { ManageCw721Component as StatelessManageCw721Component } from '../components/ManageCw721'
import { useActionOptions } from '../react'

interface ManageCw721Data {
  adding: boolean
  address: string
}

export const useDefaults: UseDefaults<ManageCw721Data> = () => ({
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
      ? Cw721BaseSelectors.contractInfoSelector({
          contractAddress: tokenAddress,
          params: [],
        })
      : constSelector(undefined)
  )

  const existingTokenAddresses = useRecoilValue(
    DaoCoreV2Selectors.allCw721TokenListSelector({
      contractAddress: address,
      chainId,
    })
  )
  const existingTokenInfos = useRecoilValue(
    waitForAll(
      existingTokenAddresses?.map((token) =>
        Cw721BaseSelectors.contractInfoSelector({
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
        info: ContractInfoResponse
      }[],
    [existingTokenAddresses, existingTokenInfos]
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
      setAdditionalAddressError(
        tokenInfoLoadable.state === 'hasError'
          ? t('error.notCw721Address')
          : existingTokens.length === 0
          ? t('error.noCw721Tokens')
          : // Should never happen.
            t('error.unexpectedError')
      )
    }
  }, [tokenInfoLoadable.state, t, additionalAddressError, existingTokens])

  return (
    <StatelessManageCw721Component
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

const useDecodedCosmosMsg: UseDecodedCosmosMsg<ManageCw721Data> = (
  msg: Record<string, any>
) =>
  useMemo(
    () =>
      'wasm' in msg &&
      'execute' in msg.wasm &&
      'update_cw721_list' in msg.wasm.execute.msg &&
      'to_add' in msg.wasm.execute.msg.update_cw721_list &&
      'to_remove' in msg.wasm.execute.msg.update_cw721_list
        ? {
            match: true,
            data: {
              adding:
                msg.wasm.execute.msg.update_cw721_list.to_add.length === 1,
              address: msg.wasm.execute.msg.update_cw721_list.to_add[0],
            },
          }
        : { match: false },
    [msg]
  )

export const makeManageCw721Action: ActionMaker<ManageCw721Data> = ({
  t,
  address,
  context,
}) => {
  // Only DAOs.
  if (context.type !== ActionOptionsContextType.Dao) {
    return null
  }

  const useTransformToCosmos: UseTransformToCosmos<ManageCw721Data> = () =>
    useCallback(
      (data: ManageCw721Data) =>
        makeWasmMessage({
          wasm: {
            execute: {
              contract_addr: address,
              funds: [],
              msg: {
                update_cw721_list: {
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
    key: CoreActionKey.ManageCw721,
    Icon: ImageEmoji,
    label: t('title.manageTreasuryNfts'),
    description: t('info.manageTreasuryNftsDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
