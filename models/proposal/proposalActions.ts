import { CosmosMsgFor_Empty } from '@dao_dao/types/contracts/cw3-dao'
import { ExecuteMsg } from '@dao_dao/types/contracts/cw20-gov'

import { ProposalMessageType } from './messageMap'

export type ProposalSetTitle = {
  type: 'setTitle'
  title: string
}

export type ProposalSetDescription = {
  type: 'setDescription'
  description: string
}

export type ProposalAddMessage = {
  type: 'addMessage'
  message: CosmosMsgFor_Empty | ExecuteMsg
  messageType?: ProposalMessageType
}

export type ProposalUpdateMessage = {
  type: 'updateMessage'
  id: string
  message?: CosmosMsgFor_Empty | ExecuteMsg
}

export type ProposalUpdatePendingMessage = {
  type: 'updatePendingMessage'
  id: string
  message?: CosmosMsgFor_Empty | ExecuteMsg
}

export type ProposalRemoveMessage = {
  type: 'removeMessage'
  id: string
}

export type ProposalSetActiveMessage = {
  type: 'setActiveMessage'
  id: string
}

export type ProposalUpdateFromMessage = {
  type: 'updateFromMessage'
  message: any
}

export type ProposalAction =
  | ProposalSetTitle
  | ProposalSetDescription
  | ProposalAddMessage
  | ProposalRemoveMessage
  | ProposalUpdateMessage
  | ProposalSetActiveMessage
  | ProposalUpdatePendingMessage
  | ProposalUpdateFromMessage
