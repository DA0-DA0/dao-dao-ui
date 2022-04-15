import { useRecoilValue } from 'recoil'

import { toBase64, toAscii } from '@cosmjs/encoding'
import { ExecuteMsg as MintExecuteMsg } from '@dao-dao/types/contracts/cw20-gov'
import {
  BankMsg,
  Coin,
  StakingMsg,
  DistributionMsg,
  CosmosMsgFor_Empty,
  ExecuteMsg,
  InstantiateMsg as DaoInstantiateMsg,
  Cw20Coin,
  Duration,
  WasmMsg,
  Uint128,
  ProposalResponse,
} from '@dao-dao/types/contracts/cw3-dao'
import {
  InstantiateMsg as MultisigInstantiateMsg,
  Member,
} from '@dao-dao/types/contracts/cw3-multisig'
import {
  C4_GROUP_CODE_ID,
  CW20_CODE_ID,
  STAKE_CODE_ID,
  convertDenomToContractReadableDenom,
  convertDenomToHumanReadableDenom,
  convertDenomToMicroDenomWithDecimals,
} from '@dao-dao/utils'

import { MintMsg } from 'types/messages'
import { ProposalMapItem } from 'types/proposals'

import {
  MessageMapEntry,
  ProposalMessageType,
} from '../models/proposal/messageMap'
import { cw20TokenInfo } from '../selectors/treasury'

const DENOM = convertDenomToHumanReadableDenom(
  process.env.NEXT_PUBLIC_STAKING_DENOM || ''
)

export const TYPE_KEY = '@type'
export const BANK_SEND_TYPE = '/cosmos.bank.v1beta1.MsgSend'
export const MAX_LABEL_LEN = 64

export function makeBankMessage(
  amount: string,
  to_address: string,
  from_address: string,
  denom = DENOM
): BankMsg {
  return {
    send: {
      amount: [
        {
          amount,
          denom,
        },
      ],
      // TODO: What are these type and from_address fields? They don't show up in spend messages after proposals are created.
      [TYPE_KEY]: BANK_SEND_TYPE,
      from_address,
      to_address,
    },
  }
}

export function makeStakingMessage(
  type: string,
  amount: string,
  denom = DENOM,
  validator: string,
  from_validator?: string
): CosmosMsgFor_Empty {
  let validator_info = {}
  if (type === 'redelegate') {
    validator_info = {
      src_validator: from_validator,
      dst_validator: validator,
    }
  } else validator_info = { validator }
  const staking: StakingMsg = {
    [type]: {
      ...validator_info,
      amount: {
        amount,
        denom,
      },
    },
  } as any
  return { staking }
}

// This function mutates its input message
export function makeWasmMessage(message: { wasm: any }): {
  wasm: WasmMsg
} {
  // We need to encode Wasm Execute, Instantiate, and Migrate messages
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
  // Messages such as update or clear admin pass through without modification
  return msg
}

export function makeSpendMessage(
  amount: string,
  to_address: string,
  from_address: string,
  denom = DENOM
): CosmosMsgFor_Empty {
  const bank: BankMsg = makeBankMessage(amount, to_address, from_address, denom)
  return {
    bank,
  }
}

export function makeDistributeMessage(validator: string): CosmosMsgFor_Empty {
  const distribution: DistributionMsg = {
    withdraw_delegator_reward: {
      validator,
    },
  }
  return { distribution }
}

export function getDenom(message: { bank: any }): string {
  const amounts = message?.bank?.send?.amount
  if (amounts?.length) {
    return amounts[0]?.denom ?? DENOM
  }
  return DENOM
}

export function makeExecutableMintMessage(
  msg: MintExecuteMsg,
  contract_addr: string
): CosmosMsgFor_Empty {
  return {
    wasm: {
      execute: {
        contract_addr,
        msg: toBase64(toAscii(JSON.stringify(msg))),
        funds: [],
      },
    },
  }
}

export function makeMintMessage(
  amount: string,
  to_address: string
): MintExecuteMsg {
  const msg: MintExecuteMsg = {
    mint: {
      amount,
      recipient: to_address,
    },
  }
  return msg
}

export function getMintAmount(
  mintMessage?: MessageMapEntry
): Uint128 | undefined {
  if (mintMessage?.messageType === ProposalMessageType.Mint) {
    const amount = (mintMessage.message as any)?.mint.amount
    return amount
  }
  return undefined
}

export function getSpendAmount(
  spendMsg?: MessageMapEntry
): Uint128 | undefined {
  if (spendMsg?.messageType === ProposalMessageType.Spend) {
    const coins = (spendMsg.message as any)?.bank?.send?.amount as Coin[]
    if (coins?.length) {
      return coins[0]?.amount
    }
  }
  return undefined
}

export function getSpendRecipient(
  spendMsg?: MessageMapEntry
): string | undefined {
  if (spendMsg?.messageType === ProposalMessageType.Spend) {
    const send = (spendMsg.message as any)?.bank?.send
    if (send) {
      return send?.to_address
    }
  }
  return undefined
}

// Instantiate message for a DAO that is using an existing cw20 token
// as its governance token.
export function makeDaoInstantiateWithExistingTokenMessage(
  name: string,
  description: string,
  tokenAddress: string,
  threshold: number,
  quorum: number | undefined,
  max_voting_period: Duration,
  unstaking_duration: Duration,
  proposal_deposit_amount: string | number,
  refund_failed_proposals: boolean,
  image_url?: string
): DaoInstantiateMsg {
  const decimalThreshold = `${threshold}`
  const decimalQuorum = `${quorum}`

  if (typeof proposal_deposit_amount === 'number') {
    proposal_deposit_amount = `${proposal_deposit_amount}`
  }

  const thresholdObj = quorum
    ? {
        threshold_quorum: {
          threshold: decimalThreshold,
          quorum: decimalQuorum,
        },
      }
    : { absolute_percentage: { percentage: decimalThreshold } }

  const msg: DaoInstantiateMsg = {
    name,
    description,
    image_url,
    gov_token: {
      use_existing_cw20: {
        addr: tokenAddress,
        label: `dao_${name}_staking_contract`,
        stake_contract_code_id: STAKE_CODE_ID,
        unstaking_duration,
      },
    },
    threshold: thresholdObj,
    max_voting_period,
    proposal_deposit_amount,
    refund_failed_proposals,
  }
  return msg
}

// Instantiate message for a DAO which is creating a new cw20 token to
// use as its governance token.
export function makeDaoInstantiateWithNewTokenMessage(
  name: string,
  description: string,
  tokenName: string,
  tokenSymbol: string,
  tokenImage: string,
  owners: Cw20Coin[],
  dao_initial_balance: Uint128,
  threshold: number,
  quorum: number | undefined,
  max_voting_period: Duration,
  unstaking_duration: Duration,
  proposal_deposit_amount: string | number,
  refund_failed_proposals: boolean,
  image_url?: string
): DaoInstantiateMsg {
  const decimalThreshold = `${threshold}`
  const decimalQuorum = `${quorum}`
  if (typeof proposal_deposit_amount === 'number') {
    proposal_deposit_amount = `${proposal_deposit_amount}`
  }

  const thresholdObj = quorum
    ? {
        threshold_quorum: {
          threshold: decimalThreshold,
          quorum: decimalQuorum,
        },
      }
    : { absolute_percentage: { percentage: decimalThreshold } }

  const msg: DaoInstantiateMsg = {
    name,
    description,
    image_url,
    gov_token: {
      instantiate_new_cw20: {
        cw20_code_id: CW20_CODE_ID,
        label: tokenName,
        msg: {
          name: tokenName,
          symbol: tokenSymbol,
          decimals: 6,
          initial_balances: owners,
          ...(tokenImage && { marketing: { logo: { url: tokenImage } } }),
        },
        stake_contract_code_id: STAKE_CODE_ID,
        initial_dao_balance: dao_initial_balance,
        unstaking_duration,
      },
    },
    threshold: thresholdObj,
    max_voting_period,
    proposal_deposit_amount,
    refund_failed_proposals,
  }
  return msg
}

export function makeMultisigInstantiateMessage(
  name: string,
  description: string,
  voters: Member[],
  threshold: number,
  max_voting_period: number,
  image_url?: string
): MultisigInstantiateMsg {
  return {
    name,
    description,
    group: {
      instantiate_new_group: {
        code_id: C4_GROUP_CODE_ID,
        label: name,
        voters,
      },
    },
    threshold: {
      absolute_count: {
        weight: threshold,
      },
    },
    max_voting_period: {
      time: max_voting_period,
    },
    image_url,
  }
}

export interface MessageAction {
  label: string
  id: string
  execute: () => void
  href: string
  isEnabled: () => boolean
}

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

export function isBankMsg(msg?: CosmosMsgFor_Empty): msg is { bank: BankMsg } {
  return (msg as any).bank !== undefined
}

export function isBurnMsg(msg?: BankMsg): msg is {
  burn: {
    amount: Coin[]
    [k: string]: unknown
  }
} {
  return (msg as any)?.burn !== undefined
}

export function isSendMsg(msg?: BankMsg): msg is {
  send: {
    amount: Coin[]
    to_address: string
    [k: string]: unknown
  }
} {
  return (msg as any)?.send !== undefined
}

export function isExecuteMsg(msg?: any): msg is {
  execute: {
    contract_addr: string
    funds: Coin[]
    msg: any
  }
} {
  return (msg as any)?.execute !== undefined
}

export function isMintMsg(msg: any): msg is MintMsg {
  if (isExecuteMsg(msg)) {
    return msg.execute?.msg?.mint !== undefined
  }
  return false
}

export const getMintRecipient = (mintMsg?: MessageMapEntry) => {
  return mintMsg?.message?.mint?.recipient
}
