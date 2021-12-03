// Client-side proposal representation
import {
  CosmosMsgFor_Empty,
  ExecuteMsg,
} from '@dao-dao/types/contracts/cw3-dao'
import { ExecuteMsg as DAOExecuteMsg } from '@dao-dao/types/contracts/cw20-gov'

import { labelForMessage } from '../../util/messagehelpers'
import { MessageMap } from './messageMap'

export const MEMO_MAX_LEN = 255

export type Proposal = {
  title: string
  description: string
  messageMap: MessageMap
  nextId: number
  // Which message is currently selected
  activeMessageId: string
  pendingMessages: {
    [key: string]: CosmosMsgFor_Empty | ExecuteMsg | DAOExecuteMsg
  }
}

export const EmptyProposal: Proposal = {
  title: '',
  description: '',
  nextId: 0,
  messageMap: {},
  activeMessageId: '',
  pendingMessages: {},
}

export function memoForProposal(proposal: Proposal): string {
  const messagesMemo = Object.values(proposal.messageMap)
    .map((msg) => labelForMessage(msg.message))
    .join(', ')
  return `${proposal.title}\n${proposal.description}\n\n${messagesMemo}`.slice(
    0,
    MEMO_MAX_LEN
  )
}
