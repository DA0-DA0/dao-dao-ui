import { CosmosMsgFor_Empty_1 } from '../../types/cw3'
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
  message: CosmosMsgFor_Empty_1
  messageType?: ProposalMessageType
  label?: string
  valid: boolean
}

export type ProposalUpdateMessage = {
  type: 'updateMessage'
  id: string
  message?: CosmosMsgFor_Empty_1
  label?: string
  valid: boolean
}

export type ProposalRemoveMessage = {
  type: 'removeMessage'
  id: string
}

export type ProposalSetActiveMessage = {
  type: 'setActiveMessage'
  id: string
  messageType: ProposalMessageType
}

export type ProposalAction =
  | ProposalSetTitle
  | ProposalSetDescription
  | ProposalAddMessage
  | ProposalRemoveMessage
  | ProposalUpdateMessage
  | ProposalSetActiveMessage
