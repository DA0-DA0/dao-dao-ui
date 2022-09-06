import { fromBase64, toAscii, toBase64 } from '@cosmjs/encoding'
import {
  Grant,
  GenericAuthorization,
} from 'cosmjs-types/cosmos/authz/v1beta1/authz'
import { MsgGrant, MsgRevoke } from 'cosmjs-types/cosmos/authz/v1beta1/tx'

import {
  BankMsg,
  DistributionMsg,
  StakingMsg,
} from '@dao-dao/state/clients/cw-proposal-single'
import { ExecuteMsg as MintExecuteMsg } from '@dao-dao/types/contracts/cw20-gov'
import {
  CosmosMsgFor_Empty,
  ProposalResponse,
  WasmMsg,
} from '@dao-dao/types/contracts/cw3-dao'

export function parseEncodedMessage(base64String?: string) {
  if (base64String) {
    const jsonMessage = decodeURIComponent(escape(atob(base64String)))
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

// TODO refine types
export function isStargateMsg(msg?: any): msg is any {
  if (msg) {
    return (msg as any).stargate !== undefined
  }
  return false
}

export function isWasmMsg(msg?: CosmosMsgFor_Empty): msg is { wasm: WasmMsg } {
  if (msg) {
    return (msg as any).wasm !== undefined
  }
  return false
}

function getWasmMsgType(wasm: WasmMsg): WasmMsgType | undefined {
  for (const wasmType of WASM_TYPES) {
    if (!!(wasm as any)[wasmToype]) {
      return wasmType
    }
  }
  return undefined
}

function isBinaryType(msgType?: WasmMsgType): boolean {
  if (msgType) {
    return !!BINARY_WASM_TYPES[msgType]
  }
  return false
}

export function decodeMessages(
  msgs: ProposalResponse['msgs']
): { [key: string]: any }[] {
  const decodedMessageArray: any[] = []
  const proposalMsgs = Object.values(msgs)
  console.log(proposalMsgs)
  for (const msgObj of proposalMsgs) {
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
      console.log(msgObj)
      // let msg = {
      //   stargate: {
      //     type_url: msgObj.stargate.type_url,
      //   },
      // }

      // switch (msgObj.stargate.type_url) {
      //   case '/cosmos.authz.v1beta1.MsgGrant':
      //     msg.stargate.value = MsgGrant.decode(
      //       fromBase64(msgObj.stargate.value)
      //     )
      //     if (msg.stargate.value.grant?.authorization) {
      //       msg.stargate.value.grant.authorization.value =
      //         GenericAuthorization.decode(
      //           msg.stargate.value.grant.authorization.value
      //         )
      //     }
      //     decodedMessageArray.push(msg)
      //     break
      //   case '/cosmos.authz.v1beta1.MsgRevoke':
      //     msg.stargate.value = MsgRevoke.decode(
      //       fromBase64(msgObj.stargate.value)
      //     )
      //     break
      // // TODO
      // case '/cosmos.authz.v1beta1.MsgExec':
      // }
    } else {
      decodedMessageArray.push(msgObj)
    }
  }

  const decodedMessages = decodedMessageArray.length
    ? decodedMessageArray
    : proposalMsgs

  return decodedMessages
}

export function decodedMessagesString(msgs: ProposalResponse['msgs']): string {
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
    msg.wasm.execute.msg = btoa(
      unescape(encodeURIComponent(JSON.stringify(message.wasm.execute.msg)))
    )
  } else if (message?.wasm?.instantiate) {
    msg.wasm.instantiate.msg = btoa(
      unescape(encodeURIComponent(JSON.stringify(message.wasm.instantiate.msg)))
    )
  } else if (message.wasm.migrate) {
    msg.wasm.migrate.msg = btoa(
      unescape(encodeURIComponent(JSON.stringify(message.wasm.migrate.msg)))
    )
  }
  // Messages such as update or clear admin pass through without modification.
  return msg
}

export const makeAuthzMessage = (message: { stargate: any }): any => {
  let msg = message
  switch (message.stargate.type_url) {
    // TODO: this one is a bit tricky
    // case '/cosmos.authz.v1beta1.MsgExec':
    //   msg.stargate.value = MsgExec.fromPartial({})
    //   break;
    case '/cosmos.authz.v1beta1.MsgGrant':
      msg.stargate.value = toBase64(
        Uint8Array.from(
          MsgGrant.encode(
            MsgGrant.fromPartial({
              grantee: message.stargate.value.grantee,
              granter: message.stargate.value.granter,
              grant: {
                authorization: {
                  typeUrl: '/cosmos.authz.v1beta1.GenericAuthorization',
                  value: Uint8Array.from(
                    GenericAuthorization.encode(
                      GenericAuthorization.fromPartial({
                        msg: message.stargate.value.msgTypeUrl,
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
    case '/cosmos.authz.v1beta1.Msg/Revoke':
      msg.stargate.value = toBase64(
        Uint8Array.from(
          MsgRevoke.encode(
            MsgRevoke.fromPartial({
              grantee: message.stargate.value.grantee,
              granter: message.stargate.value.granter,
              msgTypeUrl: message.stargate.value.msgTypeUrl,
            })
          ).finish()
        )
      )
      break
  }

  return msg
}

export const makeExecutableMintMessage = (
  msg: MintExecuteMsg,
  contractAddress: string
): CosmosMsgFor_Empty => ({
  wasm: {
    execute: {
      contract_addr: contractAddress,
      msg: toBase64(toAscii(JSON.stringify(msg))),
      funds: [],
    },
  },
})

export const makeMintMessage = (
  amount: string,
  recipient: string
): MintExecuteMsg => ({
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
  fromValidator?: string
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
      if (!fromValidator) throw new Error('fromValidator not set')

      staking = {
        redelegate: {
          amount: coin,
          src_validator: fromValidator,
          dst_validator: validator,
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
