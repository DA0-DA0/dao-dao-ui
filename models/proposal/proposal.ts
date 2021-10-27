// Client-side proposal representation
import { MessageMap, ProposalMessageType } from './messageMap'

type ActiveMessageMap = Record<ProposalMessageType, string>

export type Proposal = {
  title: string
  description: string
  messageMap: MessageMap
  nextId: number
  // Which message is currently active for
  // each proposal message type.
  activeMessages: ActiveMessageMap
}

export const EmptyProposal: Proposal = {
  title: '',
  description: '',
  nextId: 0,
  messageMap: {},
  activeMessages: {} as ActiveMessageMap,
}
