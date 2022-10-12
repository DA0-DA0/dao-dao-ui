import { useCallback, useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  constSelector,
  useRecoilValue,
  useRecoilValueLoadable,
  waitForAll,
} from 'recoil'

import { Cw721BaseSelectors, CwCoreV1Selectors } from '@dao-dao/state'
import { ContractInfoResponse } from '@dao-dao/state/clients/cw721-base'
import {
  Action,
  ActionComponent,
  ActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/tstypes/actions'
import { RemoveCw721Emoji } from '@dao-dao/ui'
import { makeWasmMessage } from '@dao-dao/utils'

import { RemoveCw721Component as StatelessRemoveCw721Component } from '../components/RemoveCw721'

interface RemoveCw721Data {
  address: string
}

const useDefaults: UseDefaults<RemoveCw721Data> = () => ({
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

  const existingTokenAddresses = useRecoilValue(
    CwCoreV1Selectors.allCw721TokenListSelector({
      contractAddress: props.coreAddress,
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

const useTransformToCosmos: UseTransformToCosmos<RemoveCw721Data> = (
  coreAddress: string
) =>
  useCallback(
    (data: RemoveCw721Data) =>
      makeWasmMessage({
        wasm: {
          execute: {
            contract_addr: coreAddress,
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
    [coreAddress]
  )

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

export const removeCw721Action: Action<RemoveCw721Data> = {
  key: ActionKey.RemoveCw721,
  Icon: RemoveCw721Emoji,
  label: 'Remove NFT Collection from Treasury',
  description:
    'Stop displaying the NFTs owned by the DAO from a CW721 NFT collection in the treasury view.',
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
}
