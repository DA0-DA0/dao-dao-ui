import { fromBase64, toBase64, fromAscii, toAscii } from '@cosmjs/encoding'
import {
  convertDenomToHumanReadableDenom,
  convertDenomToMicroDenomWithDecimals,
} from './conversion'
import {
  BankMsg,
  Coin,
  CosmosMsgFor_Empty,
  ExecuteMsg,
  InstantiateMsg as DaoInstantiateMsg,
  Cw20Coin,
  Duration,
  WasmMsg,
  Uint128,
  ProposalResponse,
} from '@dao-dao/types/contracts/cw3-dao'
import { ExecuteMsg as MintExecuteMsg } from '@dao-dao/types/contracts/cw20-gov'
import { C4_GROUP_CODE_ID, CW20_CODE_ID, STAKE_CODE_ID } from './constants'
import {
  InstantiateMsg as MultisigInstantiateMsg,
  Member,
} from '@dao-dao/types/contracts/cw3-multisig'
import { MintMsg } from 'types/messages'
import {
  MessageMapEntry,
  ProposalMessageType,
} from '../models/proposal/messageMap'
import { ProposalMapItem } from 'types/proposals'
import {
  convertDenomToContractReadableDenom,
  convertDenomToMicroDenom,
} from './conversion'
import { cw20TokenInfo } from '../selectors/treasury'
import { useRecoilValue } from 'recoil'

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
      [TYPE_KEY]: BANK_SEND_TYPE,
      from_address,
      to_address,
    },
  }
}

// This function mutates its input message
export function makeWasmMessage(message: { wasm: any }): {
  wasm: WasmMsg
} {
  // We need to encode Wasm Execute, Instantiate, and Migrate messages
  let msg = message
  if (message?.wasm?.execute) {
    msg.wasm.execute.msg = toBase64(
      toAscii(JSON.stringify(message.wasm.execute.msg))
    )
  } else if (message?.wasm?.instantiate) {
    msg.wasm.instantiate.msg = toBase64(
      toAscii(JSON.stringify(message.wasm.instantiate.msg))
    )
  } else if (message.wasm.migrate) {
    msg.wasm.migrate.msg = toBase64(
      toAscii(JSON.stringify(message.wasm.migrate.msg))
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

export function validDaoInstantiateMessageParams(
  name?: string,
  description?: string,
  tokenName?: string,
  tokenSymbol?: string,
  owners?: Cw20Coin[],
  percentage?: string | number,
  max_voting_period?: Duration,
  proposal_deposit_amount?: string | number
): boolean {
  return false
}

// Instantiate message for a DAO that is using an existing cw20 token
// as its governance token.
export function makeDaoInstantiateWithExistingTokenMessage(
  name: string,
  description: string,
  tokenAddress: string,
  percentage: string | number,
  max_voting_period: Duration,
  unstaking_duration: Duration,
  proposal_deposit_amount: string | number,
  refund_failed_proposals: boolean
): DaoInstantiateMsg {
  if (typeof percentage === 'number') {
    percentage = `${percentage}`
  }
  if (typeof proposal_deposit_amount === 'number') {
    proposal_deposit_amount = `${proposal_deposit_amount}`
  }
  const msg: DaoInstantiateMsg = {
    name,
    description,
    gov_token: {
      use_existing_cw20: {
        addr: tokenAddress,
        label: `dao_${name}_staking_contract`,
        stake_contract_code_id: STAKE_CODE_ID,
        unstaking_duration,
      },
    },
    threshold: {
      absolute_percentage: {
        percentage,
      },
    },
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
  owners: Cw20Coin[],
  dao_initial_balance: Uint128,
  percentage: string | number,
  max_voting_period: Duration,
  unstaking_duration: Duration,
  proposal_deposit_amount: string | number,
  refund_failed_proposals: boolean
): DaoInstantiateMsg {
  if (typeof percentage === 'number') {
    percentage = `${percentage}`
  }
  if (typeof proposal_deposit_amount === 'number') {
    proposal_deposit_amount = `${proposal_deposit_amount}`
  }
  const msg: DaoInstantiateMsg = {
    name,
    description,
    gov_token: {
      instantiate_new_cw20: {
        cw20_code_id: CW20_CODE_ID,
        label: tokenName,
        msg: {
          name: tokenName,
          symbol: tokenSymbol,
          decimals: 6,
          initial_balances: owners,
        },
        stake_contract_code_id: STAKE_CODE_ID,
        initial_dao_balance: dao_initial_balance,
        unstaking_duration,
      },
    },
    threshold: {
      absolute_percentage: {
        percentage,
      },
    },
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
  max_voting_period: number
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
  }
}

export interface MessageAction {
  label: string
  id: string
  execute: () => void
  href: string
  isEnabled: () => boolean
}

export function labelForAmount(amount: Coin[]): string {
  if (!amount?.length) {
    return ''
  }
  return amount
    .map((coin) => `${coin.amount !== '' ? coin.amount : '0'} ${coin.denom}`)
    .join(', ')
}

export function labelForMessage(
  msg?: CosmosMsgFor_Empty | ExecuteMsg | MintExecuteMsg,
  defaultMessage = ''
): string {
  if (!msg) {
    return defaultMessage
  }
  // TODO(gavin.doughtie): i18n
  const anyMsg: any = msg
  let messageString = ''
  if (anyMsg.bank) {
    if (anyMsg.bank.send) {
      messageString = `${labelForAmount(anyMsg.bank.send.amount)} -> ${
        anyMsg.bank.send.to_address
      }`
    } else if (anyMsg.bank.burn) {
      messageString = `${labelForAmount(anyMsg.bank.burn.amount)} -> 🔥`
    }
  } else if (anyMsg.mint) {
    messageString = `${anyMsg.mint.amount} -> ${anyMsg.mint.recipient}`
  } else if (anyMsg.custom) {
    const customMap: { [k: string]: any } = anyMsg.custom
    messageString = Object.entries(customMap)
      .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
      .join(', ')
    messageString = messageString.slice(0, MAX_LABEL_LEN) || ''
  }
  return messageString
}

export function parseEncodedMessage(base64String?: string) {
  if (base64String) {
    const stringMessage = fromBase64(base64String)
    const jsonMessage = fromAscii(stringMessage)
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
  proposal: ProposalResponse
): { [key: string]: any }[] {
  const decodedMessageArray: any[] = []
  const proposalMsgs = Object.values(proposal.msgs)
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

export function decodedMessagesString(proposal: ProposalResponse): string {
  const decodedMessageArray = decodeMessages(proposal)
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

export function messageForDraftProposal(
  draftProposal: ProposalMapItem,
  govTokenAddress?: string
) {
  const msgs = draftProposal.messages
    ? Object.values(draftProposal.messages).map((mapEntry) => {
        // Spend proposals are inputted in human readable form (ex:
        // junox). Contracts expect things in the micro form (ex: ujunox)
        // so we, painfully, do some conversions:
        if (mapEntry.messageType === ProposalMessageType.Spend) {
          // Without doing a deep copy here we run the risk of modifying
          // fields of the message which are displayed in the UI.
          let microMessage = JSON.parse(JSON.stringify(mapEntry.message))
          const bank = (microMessage as any).bank as BankMsg
          if (!bank) {
            return
          }

          let amounts: Coin[]
          let variant: string
          if ('send' in bank) {
            amounts = (bank as any).send.amount
            variant = 'send'
          } else if ('burn' in bank) {
            amounts = (bank as any).burn.amount
            variant = 'burn'
          } else {
            console.error(`unexpected bank message: (${JSON.stringify(bank)})`)
            return
          }

          const govTokenInfo = useRecoilValue(
            cw20TokenInfo(govTokenAddress as string)
          )
          const microAmounts = amounts.map((coin) => {
            const microCoin = coin
            microCoin.amount = convertDenomToMicroDenomWithDecimals(
              coin.amount,
              govTokenInfo.decimals
            )
            microCoin.denom = convertDenomToContractReadableDenom(coin.denom)
            return microCoin
          }) as Coin[]

          ;(((microMessage as any).bank as any)[variant] as any).amount =
            microAmounts

          return microMessage
        }
        if (mapEntry.messageType === ProposalMessageType.Mint) {
          const mintMessage = JSON.parse(JSON.stringify(mapEntry.message))
          console.log(mintMessage)
          if (mintMessage?.mint?.amount) {
            mintMessage.mint.amount = convertDenomToMicroDenom(
              mintMessage.mint.amount
            )
          }
          return makeExecutableMintMessage(
            mintMessage,
            govTokenAddress as string
          )
        }
        return mapEntry.message
      })
    : []
  const proposal = draftProposal.proposal

  const msg: Record<string, unknown> = {
    title: proposal.title,
    description: proposal.description,
    msgs,
  }
  return msg as any
}

export const getMintRecipient = (mintMsg?: MessageMapEntry) => {
  return mintMsg?.message?.mint?.recipient
}
