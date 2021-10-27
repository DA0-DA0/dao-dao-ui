import { MessageMapEntry, ProposalMessageType } from './messageMap'
import { Proposal } from './proposal'
import { ProposalAction } from './proposalActions'
import { topmostId } from './proposalSelectors'

export function ProposalReducer(
  state: Proposal,
  action: ProposalAction
): Proposal {
  switch (action.type) {
    case 'setTitle':
      return { ...state, title: action.title }
    case 'setDescription':
      return { ...state, description: action.description }
    case 'setActiveMessage': {
      return {
        ...state,
        activeMessages: {
          ...state.activeMessages,
          [action.messageType]: action.id,
        },
      }
    }
    case 'removeMessage': {
      const messageMap = { ...state.messageMap }
      const existingMessage = state.messageMap[action.id]
      const messageType = existingMessage.messageType
      let activeMessageId: string | undefined =
        state?.activeMessages[messageType]
      delete messageMap[action.id]
      let activeMessages = state.activeMessages
      if (action.id === activeMessageId) {
        activeMessageId = topmostId(messageMap, messageType)
        activeMessages = {
          ...activeMessages,
          [messageType]: activeMessageId,
        }
      }
      return { ...state, messageMap, activeMessages }
    }
    case 'addMessage': {
      const message = action.message
      let label = action.label
      let messageType = action.messageType
      const len = Object.keys(state.messageMap).length
      let msgType = 'custom'
      if ((message as any).bank) {
        msgType = 'bank'
      } else if ((message as any).wasm) {
        msgType = 'wasm'
      }
      const id = `${msgType}_${state.nextId}`
      const nextId = state.nextId + 1
      if (!messageType) {
        messageType = ProposalMessageType.Custom
        if (msgType === 'bank') {
          messageType = ProposalMessageType.Spend
        }
      }
      const activeMessages = {
        ...state.activeMessages,
        [messageType]: id,
      }
      const msg: MessageMapEntry = {
        id,
        messageType,
        order: len + 1,
        label: label || msgType,
        message,
      }

      const updated = {
        ...state,
        activeMessages,
        nextId,
        messageMap: {
          ...state.messageMap,
          [id]: msg,
        },
      }
      return updated
    }
    case 'updateMessage': {
      const oldEntry = state.messageMap[action.id]
      if (!oldEntry) {
        throw new Error(
          `Invalid update. No existing message found for ${action.id}`
        )
      }
      if (!(action.label || action.message)) {
        console.warn(`Nothing to update`)
        return state
      }
      const message = action.message ?? oldEntry?.message
      const label = action.label ?? oldEntry?.label
      const updatedEntry: MessageMapEntry = {
        ...oldEntry,
        message,
        label,
      }
      const proposal: Proposal = {
        ...state,
        messageMap: {
          ...state.messageMap,
          [action.id]: updatedEntry,
        },
      }
      return proposal
    }
  }
}
