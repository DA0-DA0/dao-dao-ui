import { toBase64, toUtf8 } from '@cosmjs/encoding'
import { Coin } from '@cosmjs/proto-signing'
import { v4 as uuidv4 } from 'uuid'

import { PolytoneConnection } from '@dao-dao/types'
import {
  BankMsg,
  CosmosMsgFor_Empty,
  MintMsg,
  StargateMsg,
  WasmMsg,
} from '@dao-dao/types/contracts/common'

import { getSupportedChainConfig } from '../chain'
import { POLYTONE_TIMEOUT_SECONDS } from '../constants'
import { objectMatchesStructure } from '../objectMatchesStructure'
import { parseEncodedMessage } from './encoding'
import { decodeStargateMessage } from './protobuf'

type WasmMsgType =
  | 'execute'
  | 'instantiate'
  | 'migrate'
  | 'update_admin'
  | 'clear_admin'

const WASM_TYPES: WasmMsgType[] = [
  'execute',
  'instantiate',
  'migrate',
  'update_admin',
  'clear_admin',
]

const BINARY_WASM_TYPES: { [key: string]: boolean } = {
  execute: true,
  instantiate: true,
  migrate: true,
}

export function isWasmMsg(msg?: CosmosMsgFor_Empty): msg is { wasm: WasmMsg } {
  if (msg) {
    return (msg as any).wasm !== undefined
  }
  return false
}

function getWasmMsgType(wasm: WasmMsg): WasmMsgType | undefined {
  for (const wasmType of WASM_TYPES) {
    if (!!(wasm as any)[wasmType]) {
      return wasmType
    }
  }
  return undefined
}

export const isCosmWasmStargateMsg = (msg: any): msg is StargateMsg =>
  objectMatchesStructure(msg, {
    stargate: {
      type_url: {},
      value: {},
    },
  }) && typeof msg.stargate.value === 'string'

function isBinaryType(msgType?: WasmMsgType): boolean {
  if (msgType) {
    return !!BINARY_WASM_TYPES[msgType]
  }
  return false
}

export function decodeMessages(
  msgs: CosmosMsgFor_Empty[]
): Record<string, any>[] {
  const decodedMessages: any[] = []

  for (const msgObj of msgs) {
    if (isWasmMsg(msgObj)) {
      let decodedWasmMsg = msgObj

      const msgType = getWasmMsgType(msgObj.wasm)
      if (msgType && isBinaryType(msgType)) {
        const base64Msg = (msgObj.wasm as any)[msgType]
        if (base64Msg) {
          const msg = parseEncodedMessage(base64Msg.msg)
          if (msg) {
            decodedWasmMsg = {
              ...msgObj,
              wasm: {
                ...msgObj.wasm,
                [msgType]: {
                  ...base64Msg,
                  msg,
                },
              },
            }
          }
        }
      }

      decodedMessages.push(decodedWasmMsg)
    } else if (isCosmWasmStargateMsg(msgObj)) {
      // Decode Stargate protobuf message.
      decodedMessages.push(decodeStargateMessage(msgObj))
    } else {
      decodedMessages.push(msgObj)
    }
  }

  return decodedMessages
}

export function decodedMessagesString(msgs: CosmosMsgFor_Empty[]): string {
  const decodedMessageArray = decodeMessages(msgs)
  return JSON.stringify(decodedMessageArray, undefined, 2)
}

// This function mutates its input message.
export const makeWasmMessage = (message: {
  wasm: any
}): {
  wasm: WasmMsg
} => {
  // We need to encode Wasm Execute, Instantiate, and Migrate messages.
  let msg = message
  if (message?.wasm?.execute) {
    msg.wasm.execute.msg = toBase64(
      toUtf8(JSON.stringify(message.wasm.execute.msg))
    )
  } else if (message?.wasm?.instantiate) {
    msg.wasm.instantiate.msg = toBase64(
      toUtf8(JSON.stringify(message.wasm.instantiate.msg))
    )
  } else if (message?.wasm?.instantiate2) {
    msg.wasm.instantiate2.msg = toBase64(
      toUtf8(JSON.stringify(message.wasm.instantiate2.msg))
    )
    msg.wasm.instantiate2.salt = toBase64(
      toUtf8(message.wasm.instantiate2.salt)
    )
  } else if (message.wasm.migrate) {
    msg.wasm.migrate.msg = toBase64(
      toUtf8(JSON.stringify(message.wasm.migrate.msg))
    )
  }
  // Messages such as update or clear admin pass through without modification.
  return msg
}

export const makeExecutableMintMessage = (
  msg: MintMsg,
  contractAddress: string
): CosmosMsgFor_Empty => ({
  wasm: {
    execute: {
      contract_addr: contractAddress,
      msg: toBase64(toUtf8(JSON.stringify(msg))),
      funds: [],
    },
  },
})

export const makeMintMessage = (
  amount: string,
  recipient: string
): MintMsg => ({
  mint: {
    amount,
    recipient,
  },
})

export const makeBankMessage = (
  amount: string,
  to: string,
  denom: string
): BankMsg => ({
  send: {
    amount: [
      {
        amount,
        denom,
      },
    ],
    to_address: to,
  },
})

export enum StakingActionType {
  Delegate = 'delegate',
  Undelegate = 'undelegate',
  Redelegate = 'redelegate',
  WithdrawDelegatorReward = 'withdraw_delegator_reward',
  SetWithdrawAddress = 'set_withdraw_address',
}

export const makeStakingActionMessage = (
  type: `${StakingActionType}`,
  amount: string,
  denom: string,
  validator: string,
  toValidator = '',
  withdrawAddress = ''
): CosmosMsgFor_Empty => {
  const coin = {
    amount,
    denom,
  }

  let msg: CosmosMsgFor_Empty
  switch (type) {
    case StakingActionType.Delegate:
      msg = {
        staking: {
          delegate: {
            amount: coin,
            validator,
          },
        },
      }
      break
    case StakingActionType.Undelegate:
      msg = {
        staking: {
          undelegate: {
            amount: coin,
            validator,
          },
        },
      }
      break
    case StakingActionType.Redelegate:
      msg = {
        staking: {
          redelegate: {
            amount: coin,
            src_validator: validator,
            dst_validator: toValidator,
          },
        },
      }
      break
    case StakingActionType.WithdrawDelegatorReward:
      msg = {
        distribution: {
          withdraw_delegator_reward: {
            validator,
          },
        },
      }
      break
    case StakingActionType.SetWithdrawAddress:
      msg = {
        distribution: {
          set_withdraw_address: {
            address: withdrawAddress,
          },
        },
      }
      break
    default:
      throw new Error('Unexpected staking type')
  }

  return msg
}

export const makePolytoneExecuteMessage = (
  srcChainId: string,
  destChainId: string,
  // Allow passing no message, which just creates an account.
  msg?: CosmosMsgFor_Empty
): CosmosMsgFor_Empty => {
  const polytoneConnection =
    getSupportedChainConfig(srcChainId)?.polytone?.[destChainId]

  return makeWasmMessage({
    wasm: {
      execute: {
        contract_addr: polytoneConnection?.note,
        funds: [],
        msg: {
          execute: {
            msgs: msg ? [msg] : [],
            timeout_seconds: POLYTONE_TIMEOUT_SECONDS.toString(),
            callback: {
              msg: toBase64(toUtf8(uuidv4())),
              receiver: polytoneConnection?.listener,
            },
          },
        },
      },
    },
  })
}

// Checks if the message is a Polytone execute message and extract sthe chain
// ID and msg.
export const decodePolytoneExecuteMsg = (
  srcChainId: string,
  decodedMsg: Record<string, any>,
  // How many messages are expected.
  type: 'one' | 'zero' | 'oneOrZero' = 'one'
):
  | {
      match: false
    }
  | {
      match: true
      chainId: string
      polytoneConnection: PolytoneConnection
      msg: Record<string, any>
      cosmosMsg: CosmosMsgFor_Empty | undefined
      initiatorMsg: string
    } => {
  if (
    !objectMatchesStructure(decodedMsg, {
      wasm: {
        execute: {
          contract_addr: {},
          funds: {},
          msg: {
            execute: {
              msgs: {},
              timeout_seconds: {},
              callback: {
                msg: {},
                receiver: {},
              },
            },
          },
        },
      },
    }) ||
    (type === 'zero' &&
      decodedMsg.wasm.execute.msg.execute.msgs.length !== 0) ||
    (type === 'one' && decodedMsg.wasm.execute.msg.execute.msgs.length !== 1) ||
    (type === 'oneOrZero' &&
      decodedMsg.wasm.execute.msg.execute.msgs.length > 1)
  ) {
    return {
      match: false,
    }
  }

  const polytoneConnection = Object.entries(
    getSupportedChainConfig(srcChainId)?.polytone || {}
  ).find(([, { note }]) => note === decodedMsg.wasm.execute.contract_addr)
  // Unrecognized polytone connection.
  if (!polytoneConnection) {
    return {
      match: false,
    }
  }

  return {
    match: true,
    chainId: polytoneConnection[0],
    polytoneConnection: polytoneConnection[1],
    msg:
      decodedMsg.wasm.execute.msg.execute.msgs.length === 0
        ? {}
        : decodeMessages(decodedMsg.wasm.execute.msg.execute.msgs)[0],
    cosmosMsg:
      decodedMsg.wasm.execute.msg.execute.msgs.length === 0
        ? undefined
        : decodedMsg.wasm.execute.msg.execute.msgs[0],
    initiatorMsg: decodedMsg.wasm.execute.msg.execute.callback.msg,
  }
}

export const getFundsUsedInCwMessage = (msg: CosmosMsgFor_Empty): Coin[] =>
  'bank' in msg
    ? 'send' in msg.bank
      ? msg.bank.send.amount
      : 'burn' in msg.bank
      ? msg.bank.burn.amount
      : []
    : 'staking' in msg
    ? 'delegate' in msg.staking
      ? [msg.staking.delegate.amount]
      : 'undelegate' in msg.staking
      ? [msg.staking.undelegate.amount]
      : 'redelegate' in msg.staking
      ? [msg.staking.redelegate.amount]
      : []
    : 'ibc' in msg
    ? 'transfer' in msg.ibc
      ? [msg.ibc.transfer.amount]
      : []
    : 'wasm' in msg
    ? 'execute' in msg.wasm
      ? msg.wasm.execute.funds
      : 'instantiate' in msg.wasm
      ? msg.wasm.instantiate.funds
      : 'instantiate2' in msg.wasm
      ? msg.wasm.instantiate2.funds
      : []
    : []
