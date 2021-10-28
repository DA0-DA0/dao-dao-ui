import { CosmosMsgFor_Empty_1 } from '../../types/cw3'

export enum ProposalMessageType {
  Collect = 'collect',
  Custom = 'custom',
  IBC = 'ibc',
  Mint = 'mint',
  Spend = 'spend',
  Text = 'text',
}

export type MessageMapEntry = {
  id: string
  messageType: ProposalMessageType
  order: number
  label: string
  message: CosmosMsgFor_Empty_1
}

export type MessageMap = { [key: string]: MessageMapEntry }
