import { useCallback, useEffect, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  constSelector,
  useRecoilValue,
  useRecoilValueLoadable,
  waitForAll,
} from 'recoil'

import { Cw20BaseSelectors, CwCoreSelectors } from '@dao-dao/state'
import { TokenInfoResponse } from '@dao-dao/state/clients/cw20-base'
import { SuspenseLoader } from '@dao-dao/ui'
import { VotingModuleType, makeWasmMessage } from '@dao-dao/utils'

import { ActionKey } from '.'
import {
  Action,
  ActionCardLoader,
  ActionComponent,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '..'
import { RemoveTokenComponent as StatelessRemoveTokenComponent } from '../components'

interface RemoveTokenData {
  address: string
}

const useDefaults: UseDefaults<RemoveTokenData> = () => ({
  address: '',
})

const InnerComponent: ActionComponent = (props) => {
  const { getLabel, errors } = props

  const { watch, setError, clearErrors } = useFormContext()

  const tokenAddress = watch(getLabel('address'))
  const tokenInfoLoadable = useRecoilValueLoadable(
    tokenAddress
      ? Cw20BaseSelectors.tokenInfoSelector({
          contractAddress: tokenAddress,
          params: [],
        })
      : constSelector(undefined)
  )

  const existingTokenAddresses =
    useRecoilValue(
      CwCoreSelectors.allCw20TokenListSelector({
        contractAddress: props.coreAddress,
      })
    ) ?? []
  const existingTokenInfos =
    useRecoilValue(
      waitForAll(
        existingTokenAddresses.map((token) =>
          Cw20BaseSelectors.tokenInfoSelector({
            contractAddress: token,
            params: [],
          })
        )
      )
    ) ?? []
  const existingTokens = existingTokenAddresses
    .map((address, idx) => ({
      address,
      info: existingTokenInfos[idx],
    }))
    // If undefined token info response, ignore the token.
    .filter(({ info }) => !!info) as {
    address: string
    info: TokenInfoResponse
  }[]

  useEffect(() => {
    if (tokenInfoLoadable.state !== 'hasError' && existingTokens.length > 0) {
      if (errors?.address) {
        clearErrors(getLabel('address'))
      }
      return
    }

    if (!errors?.address) {
      setError(getLabel('address'), {
        type: 'manual',
        message:
          tokenInfoLoadable.state === 'hasError'
            ? 'Failed to get token info.'
            : existingTokens.length === 0
            ? 'No tokens in the DAO treasury.'
            : 'Unknown error',
      })
    }
  }, [
    tokenInfoLoadable.state,
    errors?.address,
    setError,
    clearErrors,
    getLabel,
    existingTokens.length,
  ])

  return (
    <StatelessRemoveTokenComponent
      {...props}
      options={{
        existingTokens,
        loadingTokenInfo: tokenInfoLoadable.state === 'loading',
        tokenInfo:
          tokenInfoLoadable.state === 'hasValue'
            ? tokenInfoLoadable.contents
            : undefined,
      }}
    />
  )
}

const Component: ActionComponent = (props) => (
  <SuspenseLoader fallback={<ActionCardLoader />}>
    <InnerComponent {...props} />
  </SuspenseLoader>
)

const useTransformToCosmos: UseTransformToCosmos<RemoveTokenData> = (
  coreAddress: string
) =>
  useCallback(
    (data: RemoveTokenData) =>
      makeWasmMessage({
        wasm: {
          execute: {
            contract_addr: coreAddress,
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
    [coreAddress]
  )

const useDecodedCosmosMsg: UseDecodedCosmosMsg<RemoveTokenData> = (
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

export const removeTokenAction: Action<RemoveTokenData> = {
  key: ActionKey.RemoveToken,
  label: '⭕️ Remove Treasury Token',
  description: 'Remove a token from your treasury.',
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
  votingModuleTypes: [
    VotingModuleType.Cw20StakedBalanceVoting,
    VotingModuleType.Cw4Voting,
  ],
}
