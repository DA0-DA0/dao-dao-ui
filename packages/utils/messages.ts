import { fromBase64, fromUtf8, toBase64, toUtf8 } from '@cosmjs/encoding'
import { GenericAuthorization } from 'cosmjs-types/cosmos/authz/v1beta1/authz'
import {
  MsgExec,
  MsgGrant,
  MsgRevoke,
} from 'cosmjs-types/cosmos/authz/v1beta1/tx'
import { PubKey } from 'cosmjs-types/cosmos/crypto/ed25519/keys'
import {
  MsgWithdrawDelegatorReward,
  MsgWithdrawValidatorCommission,
} from 'cosmjs-types/cosmos/distribution/v1beta1/tx'
import { MsgUnjail } from 'cosmjs-types/cosmos/slashing/v1beta1/tx'
import {
  MsgBeginRedelegate,
  MsgCreateValidator,
  MsgDelegate,
  MsgEditValidator,
  MsgUndelegate,
} from 'cosmjs-types/cosmos/staking/v1beta1/tx'

import {
  BankMsg,
  CosmosMsgFor_Empty,
  DistributionMsg,
  MintMsg,
  StakingMsg,
  StargateMsg,
  WasmMsg,
} from '@dao-dao/types/contracts/common'

export function parseEncodedMessage(base64String?: string) {
  if (base64String) {
    const jsonMessage = fromUtf8(fromBase64(base64String))
    if (jsonMessage) {
      return JSON.parse(jsonMessage)
    }
  }
  return undefined
}

export type WasmMsgType =
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

export function isStargateMsg(msg?: CosmosMsgFor_Empty): boolean {
  if (msg) {
    return (msg as any).stargate !== undefined
  }
  return false
}

function isBinaryType(msgType?: WasmMsgType): boolean {
  if (msgType) {
    return !!BINARY_WASM_TYPES[msgType]
  }
  return false
}

export function decodeMessages(
  msgs: CosmosMsgFor_Empty[]
): { [key: string]: any }[] {
  const decodedMessageArray: any[] = []
  for (const msgObj of msgs) {
    if (isWasmMsg(msgObj)) {
      const msgType = getWasmMsgType(msgObj.wasm)
      if (msgType && isBinaryType(msgType)) {
        const base64Msg = (msgObj.wasm as any)[msgType]
        if (base64Msg) {
          const msg = parseEncodedMessage(base64Msg.msg)
          if (msg) {
            decodedMessageArray.push({
              ...msgObj,
              wasm: {
                ...msgObj.wasm,
                [msgType]: {
                  ...base64Msg,
                  msg,
                },
              },
            })
          }
        }
      }
    } else if (isStargateMsg(msgObj)) {
      let msg = msgObj as StargateMsg
      // Decode Stargate protobuf message
      decodedMessageArray.push({
        stargate: decodeProtobuf(msg.stargate),
      })
    } else {
      decodedMessageArray.push(msgObj)
    }
  }

  const decodedMessages = decodedMessageArray.length
    ? decodedMessageArray
    : msgs

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
  } else if (message.wasm.migrate) {
    msg.wasm.migrate.msg = toBase64(
      toUtf8(JSON.stringify(message.wasm.migrate.msg))
    )
  }
  // Messages such as update or clear admin pass through without modification.
  return msg
}

// Takes an encode proto messagne and attempts to decode it.
export const decodeProtobuf = (msg: {
  type_url: string
  value: any
}): { type_url: string; value: any } => {
  const newMsg = {
    ...msg,
  }
  switch (msg.type_url) {
    case '/cosmos.authz.v1beta1.MsgGrant':
      newMsg.value = MsgGrant.decode(fromBase64(msg.value))
      if (newMsg.value?.grant?.authorization) {
        newMsg.value.grant.authorization.value = GenericAuthorization.decode(
          newMsg.value.grant.authorization?.value
        )
      }
      break
    case '/cosmos.authz.v1beta1.MsgRevoke':
      newMsg.value = MsgRevoke.decode(fromBase64(msg.value))
      break
    case '/cosmos.authz.v1beta1.MsgExec':
      newMsg.value = MsgExec.decode(fromBase64(msg.value))
      break
    case '/cosmos.staking.v1beta1.MsgDelegate':
      newMsg.value = MsgDelegate.decode(fromBase64(msg.value))
      break
    case '/cosmos.staking.v1beta1.MsgUndelegate':
      newMsg.value = MsgUndelegate.decode(fromBase64(msg.value))
      break
    case '/cosmos.staking.v1beta1.MsgBeginRedelegate':
      newMsg.value = MsgBeginRedelegate.decode(fromBase64(msg.value))
      break
    case '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward':
      newMsg.value = MsgWithdrawDelegatorReward.decode(fromBase64(msg.value))
      break
    case '/cosmos.staking.v1beta1.MsgCreateValidator':
      newMsg.value = MsgCreateValidator.decode(fromBase64(msg.value))
      newMsg.value.pubkey.value = toBase64(
        PubKey.decode(newMsg.value.pubkey.value).key
      )
      break
    case '/cosmos.staking.v1beta1.MsgEditValidator':
      newMsg.value = MsgEditValidator.decode(fromBase64(msg.value))
      break
    case '/cosmos.slashing.v1beta1.MsgUnjail':
      newMsg.value = MsgUnjail.decode(fromBase64(msg.value))
      break
    case '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission':
      newMsg.value = MsgWithdrawValidatorCommission.decode(
        fromBase64(msg.value)
      )
      break
  }

  return newMsg
}

// Takes an unencoded protobuf message value and
// attemps to encode it based on type_url
export const encodeProtobufValue = (
  type_url: string,
  value: any
): Uint8Array => {
  switch (type_url) {
    case '/cosmos.authz.v1beta1.MsgExec':
      value = toBase64(
        Uint8Array.from(
          MsgExec.encode(
            MsgExec.fromPartial({
              grantee: value.grantee,
              msgs: value.msgs,
            })
          ).finish()
        )
      )
      break
    case '/cosmos.authz.v1beta1.MsgGrant':
      value = toBase64(
        Uint8Array.from(
          MsgGrant.encode(
            MsgGrant.fromPartial({
              grantee: value.grantee,
              granter: value.granter,
              grant: {
                authorization: {
                  typeUrl: '/cosmos.authz.v1beta1.GenericAuthorization',
                  value: Uint8Array.from(
                    GenericAuthorization.encode(
                      GenericAuthorization.fromPartial({
                        msg: value.msgTypeUrl,
                      })
                    ).finish()
                  ),
                },
              },
            })
          ).finish()
        )
      )
      break
    case '/cosmos.authz.v1beta1.MsgRevoke':
      value = toBase64(
        Uint8Array.from(
          MsgRevoke.encode(
            MsgRevoke.fromPartial({
              grantee: value.grantee,
              granter: value.granter,
              msgTypeUrl: value.msgTypeUrl,
            })
          ).finish()
        )
      )
      break
    case '/cosmos.staking.v1beta1.MsgDelegate':
      value = toBase64(
        MsgDelegate.encode(
          MsgDelegate.fromPartial({
            ...value,
          })
        ).finish()
      )
      break
    case '/cosmos.staking.v1beta1.MsgUndelegate':
      value = toBase64(
        MsgUndelegate.encode(
          MsgUndelegate.fromPartial({
            ...value,
          })
        ).finish()
      )
      break
    case '/cosmos.staking.v1beta1.MsgBeginRedelegate':
      value = toBase64(
        MsgBeginRedelegate.encode(
          MsgBeginRedelegate.fromPartial({
            ...value,
          })
        ).finish()
      )
      break
    case '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward':
      value = toBase64(
        MsgWithdrawDelegatorReward.encode(
          MsgWithdrawDelegatorReward.fromPartial({
            ...value,
          })
        ).finish()
      )
      break
    case '/cosmos.staking.v1beta1.MsgCreateValidator':
      value = toBase64(
        MsgCreateValidator.encode({
          ...value,
          pubkey: {
            typeUrl: value.pubkey.typeUrl,
            value: PubKey.encode(
              PubKey.fromPartial(value.pubkey.value)
            ).finish(),
          },
        }).finish()
      )
      break
    case '/cosmos.staking.v1beta1.MsgEditValidator':
      value = toBase64(MsgEditValidator.encode(value).finish())
      break
    case '/cosmos.slashing.v1beta1.MsgUnjail':
      value = toBase64(
        MsgUnjail.encode(
          MsgUnjail.fromPartial({
            ...value,
          })
        ).finish()
      )
      break
    case '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission':
      value = toBase64(
        MsgWithdrawValidatorCommission.encode({
          ...value,
        }).finish()
      )
      break
    default:
      console.error(type_url, value)
      throw Error('Unrecognized type url')
  }

  return value
}

// Expects typeUrl
export const makeRawProtobufMsg = (msg: {
  typeUrl: string
  value: any
}): { typeUrl: string; value: Uint8Array } => ({
  typeUrl: msg.typeUrl,
  value: encodeProtobufValue(msg.typeUrl, msg.value),
})

// CosmWasm expects type_url to be in snake_case format
export const makeStargateMessage = (message: {
  stargate: { type_url: string; value: any }
}): CosmosMsgFor_Empty => ({
  stargate: {
    type_url: message.stargate.type_url,
    value: encodeProtobufValue(
      message.stargate.type_url,
      message.stargate.value
    ),
  },
})

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
