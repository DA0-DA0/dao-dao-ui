import { Coin } from '@cosmjs/stargate'
import JSON5 from 'json5'
import { useCallback, useMemo } from 'react'
import { useRecoilValue } from 'recoil'

import { nativeBalancesSelector } from '@dao-dao/state'
import {
  ActionComponent,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/tstypes/actions'
import { ExecuteEmoji } from '@dao-dao/ui'
import {
  NATIVE_DECIMALS,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  makeWasmMessage,
} from '@dao-dao/utils'

import { ExecuteComponent as StatelessExecuteComponent } from '../components/Execute'

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

export const makeExecuteAction: ActionMaker<ExecuteData> = ({ t, address }) => {
  const Component: ActionComponent = (props) => {
    const nativeBalances = useRecoilValue(nativeBalancesSelector({ address }))

    return (
      <StatelessExecuteComponent
        {...props}
        options={{
          nativeBalances,
        }}
      />
    )
  }

  return {
    key: ActionKey.Execute,
    Icon: ExecuteEmoji,
    label: t('title.executeSmartContract'),
    description: t('info.executeSmartContractActionDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
