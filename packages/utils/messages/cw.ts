import { toBase64, toUtf8 } from '@cosmjs/encoding'
import { v4 as uuidv4 } from 'uuid'

import {
  BankMsg,
  CosmosMsgFor_Empty,
  DistributionMsg,
  MintMsg,
  StakingMsg,
  StargateMsg,
  WasmMsg,
} from '@dao-dao/types/contracts/common'

import { POLYTONE_EAR, POLYTONE_NOTES } from '../constants'
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

export enum StakeType {
  Delegate = 'delegate',
  Undelegate = 'undelegate',
  Redelegate = 'redelegate',
  WithdrawDelegatorReward = 'withdraw_delegator_reward',
}

export const makeStakingMessage = (
  type: `${StakeType}`,
  amount: string,
  denom: string,
  validator: string,
  toValidator = ''
): CosmosMsgFor_Empty => {
  const coin = {
    amount,
    denom,
  }

  let staking: StakingMsg
  switch (type) {
    case StakeType.Delegate:
      staking = {
        delegate: {
          amount: coin,
          validator,
        },
      }
      break
    case StakeType.Undelegate:
      staking = {
        undelegate: {
          amount: coin,
          validator,
        },
      }
      break
    case StakeType.Redelegate:
      staking = {
        redelegate: {
          amount: coin,
          src_validator: validator,
          dst_validator: toValidator,
        },
      }
      break
    default:
      throw new Error('Unexpected staking type')
  }

  return { staking }
}

export const makeDistributeMessage = (
  validator: string
): CosmosMsgFor_Empty => ({
  distribution: {
    withdraw_delegator_reward: {
      validator,
    },
  } as DistributionMsg,
})

export const makePolytoneExecuteMessage = (
  chainId: string,
  // Allow passing no message, which just creates an account.
  msg?: CosmosMsgFor_Empty
): CosmosMsgFor_Empty =>
  makeWasmMessage({
    wasm: {
      execute: {
        contract_addr: POLYTONE_NOTES[chainId]?.note,
        funds: [],
        msg: {
          execute: {
            msgs: msg ? [msg] : [],
            // TODO(polytone): Tune timeout
            // 10 minutes
            timeout_seconds: '600',
            callback: {
              msg: toBase64(toUtf8(uuidv4())),
              receiver: POLYTONE_EAR,
            },
          },
        },
      },
    },
  })

// Checks if the message is a Polytone execute message and extract sthe chain
// ID and msg.
export const decodePolytoneExecuteMsg = (
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
      msg: Record<string, any>
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

  const chainId = Object.entries(POLYTONE_NOTES).find(
    ([, { note }]) => note === decodedMsg.wasm.execute.contract_addr
  )?.[0]
  // Unrecognized polytone note.
  if (!chainId) {
    return {
      match: false,
    }
  }

  return {
    match: true,
    chainId,
    msg:
      decodedMsg.wasm.execute.msg.execute.msgs.length === 0
        ? {}
        : decodeMessages(decodedMsg.wasm.execute.msg.execute.msgs)[0],
  }
}
