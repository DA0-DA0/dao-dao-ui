import { toBase64, toAscii } from '@cosmjs/encoding'
import { convertDenomToHumanReadableDenom } from './conversion'
import {
  BankMsg,
  Coin,
  CosmosMsgFor_Empty,
  ExecuteMsg,
  InstantiateMsg as DaoInstantiateMsg,
  Cw20Coin,
  Duration,
  WasmMsg,
} from '@dao_dao/types/contracts/cw3-dao'
import { ExecuteMsg as MintExecuteMsg } from '@dao_dao/types/contracts/cw20-gov'
import { CW20_CODE_ID } from 'util/constants'

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

export function makeDaoInstantiateMessage(
  name: string,
  description: string,
  tokenName: string,
  tokenSymbol: string,
  owners: Cw20Coin[],
  percentage: string | number,
  max_voting_period: Duration,
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
        code_id: CW20_CODE_ID,
        label: tokenName,
        msg: {
          name: tokenName,
          symbol: tokenSymbol,
          decimals: 6,
          initial_balances: owners,
        },
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
