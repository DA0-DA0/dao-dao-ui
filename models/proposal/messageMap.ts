import {
  CosmosMsgFor_Empty,
  ExecuteMsg,
} from '@dao-dao/types/contracts/cw3-dao'
import { ExecuteMsg as DAOExecuteMsg } from '@dao-dao/types/contracts/cw20-gov'

export enum ProposalMessageType {
  Collect = 'collect',
  Custom = 'custom',
  Wasm = 'wasm',
  IBC = 'ibc',
  Mint = 'mint',
  Spend = 'spend',
  Text = 'text',
  All = 'all',
}

export type MessageMapEntry = {
  id: string
  messageType: ProposalMessageType
  order: number
  message: CosmosMsgFor_Empty | ExecuteMsg | DAOExecuteMsg
}

export type MessageMap = { [key: string]: MessageMapEntry }

export function messageSort(a: MessageMapEntry, b: MessageMapEntry): number {
  if (a.order > b.order) {
    return 1
  } else if (a.order < b.order) {
    return -1
  }
  return 0
}
