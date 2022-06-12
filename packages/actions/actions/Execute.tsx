import { Coin } from '@cosmjs/stargate'
import JSON5 from 'json5'
import { useCallback, useMemo } from 'react'
import { useRecoilValue } from 'recoil'

import { nativeBalancesSelector } from '@dao-dao/state'
import {
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  makeWasmMessage,
  NATIVE_DECIMALS,
  VotingModuleType,
} from '@dao-dao/utils'

import { ActionKey } from '.'
import {
  Action,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
  ActionComponent,
} from '..'
import { ExecuteComponent as StatelessExecuteComponent } from '../components'

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
            ),
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
  const nativeBalances =
    useRecoilValue(nativeBalancesSelector(props.coreAddress)) ?? []

  return (
    <StatelessExecuteComponent
      {...props}
      options={{
        nativeBalances,
      }}
    />
  )
}

export const executeAction: Action<ExecuteData> = {
  key: ActionKey.Execute,
  label: '⚔️ Execute Smart Contract',
  description: 'Execute a message on a smart contract.',
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
  votingModuleTypes: [
    VotingModuleType.Cw20StakedBalanceVoting,
    VotingModuleType.Cw4Voting,
  ],
}
