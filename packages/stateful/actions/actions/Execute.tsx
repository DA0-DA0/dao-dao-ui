import { Coin } from '@cosmjs/stargate'
import JSON5 from 'json5'
import { useCallback, useMemo } from 'react'

import { nativeBalancesSelector } from '@dao-dao/state'
import {
  ActionCardLoader,
  SwordsEmoji,
  useCachedLoadable,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionMaker,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  NATIVE_DECIMALS,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  loadableToLoadingData,
  makeWasmMessage,
} from '@dao-dao/utils'

import { SuspenseLoader } from '../../components/SuspenseLoader'
import { ExecuteComponent as StatelessExecuteComponent } from '../components/Execute'
import { useActionOptions } from '../react'

interface ExecuteData {
  address: string
  message: string
  funds: { denom: string; amount: number }[]
}

const useDefaults: UseDefaults<ExecuteData> = () => ({
  address: '',
  message: '{}',
  funds: [],
})

const useTransformToCosmos: UseTransformToCosmos<ExecuteData> = () =>
  useCallback(({ address, message, funds }: ExecuteData) => {
    let msg
    try {
      msg = JSON5.parse(message)
    } catch (err) {
      console.error(`internal error. unparsable message: (${message})`, err)
      return
    }

    return makeWasmMessage({
      wasm: {
        execute: {
          contract_addr: address,
          funds: funds.map(({ denom, amount }) => ({
            denom,
            amount: convertDenomToMicroDenomWithDecimals(
              amount,
              NATIVE_DECIMALS
            ).toString(),
          })),
          msg,
        },
      },
    })
  }, [])

const useDecodedCosmosMsg: UseDecodedCosmosMsg<ExecuteData> = (
  msg: Record<string, any>
) =>
  useMemo(
    () =>
      'wasm' in msg && 'execute' in msg.wasm
        ? {
            match: true,
            data: {
              address: msg.wasm.execute.contract_addr,
              message: JSON.stringify(msg.wasm.execute.msg, undefined, 2),
              funds: (msg.wasm.execute.funds as Coin[]).map(
                ({ denom, amount }) => ({
                  denom,
                  amount: Number(
                    convertMicroDenomToDenomWithDecimals(
                      amount,
                      NATIVE_DECIMALS
                    )
                  ),
                })
              ),
            },
          }
        : { match: false },
    [msg]
  )

const Component: ActionComponent = (props) => {
  const { address, chainId } = useActionOptions()

  // This needs to be loaded via a cached loadable to avoid displaying a loader
  // when this data updates on a schedule. Manually trigger a suspense loader
  // the first time when the initial data is still loading.
  const nativeBalancesLoadable = loadableToLoadingData(
    useCachedLoadable(
      address
        ? nativeBalancesSelector({
            address,
            chainId,
          })
        : undefined
    ),
    []
  )

  return (
    <SuspenseLoader
      fallback={<ActionCardLoader />}
      forceFallback={
        // Manually trigger loader.
        nativeBalancesLoadable.loading
      }
    >
      <StatelessExecuteComponent
        {...props}
        options={{
          nativeBalances: nativeBalancesLoadable.loading
            ? []
            : nativeBalancesLoadable.data,
        }}
      />
    </SuspenseLoader>
  )
}

export const makeExecuteAction: ActionMaker<ExecuteData> = ({ t }) => ({
  key: CoreActionKey.Execute,
  Icon: SwordsEmoji,
  label: t('title.executeSmartContract'),
  description: t('info.executeSmartContractActionDescription'),
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
})
