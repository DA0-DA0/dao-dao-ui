import { BankMsg, CosmosMsgFor_Empty_1 } from 'types/cw3'

const DAO_ADDRESS = process.env.NEXT_PUBLIC_DAO_CONTRACT_ADDRESS || ''
const DENOM = process.env.NEXT_PUBLIC_STAKING_DENOM || ''

export const TYPE_KEY = '@type'
export const BANK_SEND_TYPE = '/cosmos.bank.v1beta1.MsgSend'

export function makeBankMessage(
  amount: string,
  to_address: string,
  from_address = DAO_ADDRESS,
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

export function makeSpendMessage(
  amount: string,
  to_address: string,
  from_address = DAO_ADDRESS,
  denom = DENOM
): CosmosMsgFor_Empty_1 {
  const bank: BankMsg = makeBankMessage(amount, to_address, from_address, denom)
  return {
    bank,
  }
}

export interface MessageAction {
  label: string
  id: string
  action: () => void
  href: string
  enabled: () => boolean
}
