import { toBase64, toUtf8 } from '@cosmjs/encoding'
import { Coin } from '@cosmjs/proto-signing'
import { v4 as uuidv4 } from 'uuid'

import { DecodedIcaMsg, DecodedPolytoneMsg } from '@dao-dao/types'
import {
  BankMsg,
  CosmosMsgFor_Empty,
  MintMsg,
  StargateMsg,
  WasmMsg,
} from '@dao-dao/types/contracts/common'

import {
  getChainForChainName,
  getIbcTransferInfoBetweenChains,
  getIbcTransferInfoFromConnection,
  getSupportedChainConfig,
} from '../chain'
import { IBC_TIMEOUT_SECONDS } from '../constants'
import { processError } from '../error'
import { objectMatchesStructure } from '../objectMatchesStructure'
import { MsgSendTx } from '../protobuf/codegen/ibc/applications/interchain_accounts/controller/v1/tx'
import {
  CosmosTx,
  InterchainAccountPacketData,
  Type,
} from '../protobuf/codegen/ibc/applications/interchain_accounts/v1/packet'
import { MsgTransfer } from '../protobuf/codegen/ibc/applications/transfer/v1/tx'
import { encodeMessageAsBase64, parseEncodedMessage } from './encoding'
import {
  cwMsgToProtobuf,
  decodeStargateMessage,
  isDecodedStargateMsg,
  makeStargateMessage,
  protobufToCwMsg,
} from './protobuf'

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

export const decodeMessage = (msg: CosmosMsgFor_Empty): Record<string, any> => {
  // Decode base64 wasm binary into object.
  if (isWasmMsg(msg)) {
    const msgType = getWasmMsgType(msg.wasm)
    if (msgType && isBinaryType(msgType)) {
      const base64MsgContainer = (msg.wasm as any)[msgType]
      if (base64MsgContainer && 'msg' in base64MsgContainer) {
        const parsedMsg = parseEncodedMessage(base64MsgContainer.msg)
        if (parsedMsg) {
          return {
            ...msg,
            wasm: {
              ...msg.wasm,
              [msgType]: {
                ...base64MsgContainer,
                msg: parsedMsg,
              },
            },
          }
        }
      }
    }
  } else if (isCosmWasmStargateMsg(msg)) {
    // Decode Stargate protobuf message. If fail to decode, ignore.
    try {
      return decodeStargateMessage(msg)
    } catch (err) {
      console.error(processError(err, { forceCapture: true }))
    }
  }

  return msg
}

export const decodeMessages = (
  msgs: CosmosMsgFor_Empty[]
): Record<string, any>[] => msgs.map(decodeMessage)

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
      msg: encodeMessageAsBase64(msg),
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

// If the source and destination chains are different, this wraps the message in
// a polytone execution message. Otherwise, it just returns the message. If the
// chains are different but the message is undefined, this will return a message
// that just creates a Polytone account.
export const maybeMakePolytoneExecuteMessage = (
  srcChainId: string,
  destChainId: string,
  // Allow passing no message, which just creates an account. `msg` cannot be an
  // array if the chains are the same.
  msg?: CosmosMsgFor_Empty | CosmosMsgFor_Empty[]
): CosmosMsgFor_Empty => {
  // If on same chain, just return the message.
  if (srcChainId === destChainId && msg) {
    if (Array.isArray(msg)) {
      throw new Error('Cannot use an array for same-chain messages.')
    }

    return msg
  }

  const polytoneConnection =
    getSupportedChainConfig(srcChainId)?.polytone?.[destChainId]

  return makeWasmMessage({
    wasm: {
      execute: {
        contract_addr: polytoneConnection?.note,
        funds: [],
        msg: {
          execute: {
            msgs: msg ? [msg].flat() : [],
            timeout_seconds: IBC_TIMEOUT_SECONDS.toString(),
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

// Checks if the message is a Polytone execute message and extracts the chain ID
// and msg(s).
export const decodePolytoneExecuteMsg = (
  srcChainId: string,
  decodedMsg: Record<string, any>,
  // How many messages are expected.
  type: 'one' | 'zero' | 'oneOrZero' | 'any' = 'one'
): DecodedPolytoneMsg => {
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

  const cosmosMsgs = decodedMsg.wasm.execute.msg.execute.msgs
  const msgs = decodeMessages(cosmosMsgs)

  return {
    match: true,
    chainId: polytoneConnection[0],
    polytoneConnection: polytoneConnection[1],
    msg: msgs[0] || {},
    cosmosMsg: cosmosMsgs[0],
    msgs,
    cosmosMsgs,
    initiatorMsg: decodedMsg.wasm.execute.msg.execute.callback.msg,
  }
}

// If the source and destination chains are different, this wraps the message in
// an ICA execution message. Otherwise, it just returns the message.
export const maybeMakeIcaExecuteMessage = (
  srcChainId: string,
  destChainId: string,
  // The ICA host address (owner) on the source chain (i.e. the src sender).
  icaHostAddress: string,
  // The ICA remote address on the destination chain (i.e. the dest sender).
  icaRemoteAddress: string,
  msg: CosmosMsgFor_Empty | CosmosMsgFor_Empty[]
): CosmosMsgFor_Empty => {
  // If on same chain, just return the message.
  if (srcChainId === destChainId && msg) {
    if (Array.isArray(msg)) {
      throw new Error('Cannot use an array for same-chain messages.')
    }

    return msg
  }

  const {
    sourceChain: { connection_id: connectionId },
  } = getIbcTransferInfoBetweenChains(srcChainId, destChainId)

  return makeStargateMessage({
    stargate: {
      typeUrl: MsgSendTx.typeUrl,
      value: MsgSendTx.fromPartial({
        owner: icaHostAddress,
        connectionId,
        packetData: InterchainAccountPacketData.fromPartial({
          type: Type.TYPE_EXECUTE_TX,
          data: CosmosTx.toProto({
            messages: [msg]
              .flat()
              .map((msg) => cwMsgToProtobuf(msg, icaRemoteAddress)),
          }),
          memo: '',
        }),
        // Nanoseconds timeout from TX execution.
        relativeTimeout: BigInt(IBC_TIMEOUT_SECONDS * 1e9),
      }),
    },
  })
}

// Checks if the message is an ICA execute message and extracts the chain ID and
// msg(s).
export const decodeIcaExecuteMsg = (
  srcChainId: string,
  decodedMsg: Record<string, any>,
  // How many messages are expected.
  type: 'one' | 'zero' | 'oneOrZero' | 'any' = 'one'
): DecodedIcaMsg => {
  if (
    !isDecodedStargateMsg(decodedMsg) ||
    decodedMsg.stargate.typeUrl !== MsgSendTx.typeUrl
  ) {
    return {
      match: false,
    }
  }

  try {
    const { connectionId } = decodedMsg.stargate.value as MsgSendTx
    const { destinationChain } = getIbcTransferInfoFromConnection(
      srcChainId,
      connectionId
    )
    const chainId = getChainForChainName(destinationChain.chain_name).chain_id

    const { packetData: { data } = {} } = decodedMsg.stargate.value as MsgSendTx
    const protobufMessages = data && CosmosTx.decode(data).messages
    const cosmosMsgsWithSenders =
      protobufMessages?.map((protobuf) => protobufToCwMsg(protobuf)) || []

    if (
      (type === 'zero' && cosmosMsgsWithSenders.length !== 0) ||
      (type === 'one' && cosmosMsgsWithSenders.length !== 1) ||
      (type === 'oneOrZero' && cosmosMsgsWithSenders.length > 1)
    ) {
      return {
        match: false,
      }
    }

    const msgsWithSenders = cosmosMsgsWithSenders.map(({ sender, msg }) => ({
      sender,
      msg: decodeMessage(msg),
    }))

    return {
      match: true,
      chainId,
      msgWithSender: msgsWithSenders[0],
      cosmosMsgWithSender: cosmosMsgsWithSenders[0],
      msgsWithSenders,
      cosmosMsgsWithSenders,
    }
  } catch {
    return {
      match: false,
    }
  }
}

// Checks if the message is a cw1-whitelist execute message and extracts the
// address and msg(s).
export const decodeCw1WhitelistExecuteMsg = (
  decodedMsg: Record<string, any>,
  // How many messages are expected.
  type: 'one' | 'zero' | 'oneOrZero' | 'any'
):
  | {
      address: string
      msgs: Record<string, any>[]
      cosmosMsgs: CosmosMsgFor_Empty[]
    }
  | undefined => {
  if (
    !objectMatchesStructure(decodedMsg, {
      wasm: {
        execute: {
          contract_addr: {},
          funds: {},
          msg: {
            execute: {
              msgs: {},
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
    return
  }

  const cosmosMsgs = decodedMsg.wasm.execute.msg.execute.msgs
  const msgs = decodeMessages(cosmosMsgs)

  return {
    address: decodedMsg.wasm.execute.contract_addr,
    msgs,
    cosmosMsgs,
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
    : isCosmWasmStargateMsg(msg)
    ? (() => {
        try {
          const decoded = decodeStargateMessage(msg).stargate
          switch (decoded.typeUrl) {
            // Support IBC spends.
            case MsgTransfer.typeUrl: {
              const data = decoded.value as MsgTransfer
              if (data.token) {
                return [data.token]
              }
            }
          }
        } catch {}

        return []
      })()
    : []
