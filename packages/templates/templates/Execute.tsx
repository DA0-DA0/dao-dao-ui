import JSON5 from 'json5'
import { useCallback, useMemo } from 'react'

import {
  makeWasmMessage,
  parseEncodedMessage,
  VotingModuleType,
} from '@dao-dao/utils'

import {
  Template,
  TemplateKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
  ExecuteComponent as Component,
} from '../components'

interface ExecuteData {
  address: string
  message: string
}

const useDefaults: UseDefaults<ExecuteData> = () => ({
  address: '',
  message: '{}',
})

const useTransformToCosmos: UseTransformToCosmos<ExecuteData> = () =>
  useCallback(({ address, message }: ExecuteData) => {
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
          funds: [],
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
              message: JSON.stringify(
                parseEncodedMessage(msg.wasm.execute.msg) ?? {}
              ),
            },
          }
        : { match: false },
    [msg]
  )

export const executeTemplate: Template<ExecuteData> = {
  key: TemplateKey.Execute,
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
