import { MessageMapEntry, ProposalMessageType } from './messageMap'
import { Proposal } from './proposal'
import { ProposalAction } from './proposalActions'
import { getActiveMessageId, sortedMessages } from './proposalSelectors'

function checkUpdated(updated: Proposal) {
  if (
    updated?.activeMessageId &&
    !updated.messageMap[updated.activeMessageId]
  ) {
    console.error(
      `bad active message in ${JSON.stringify(updated, undefined, 2)}`
    )
  }
  return updated
}
export function ProposalReducer(
  state: Proposal,
  action: ProposalAction
): Proposal {
  switch (action.type) {
    case 'setTitle':
      const updated = { ...state, title: action.title }
      return checkUpdated(updated)
    case 'setDescription':
      return checkUpdated({ ...state, description: action.description })
    case 'setActiveMessage': {
      if (state.messageMap[action.id]) {
        return checkUpdated({
          ...state,
          activeMessageId: action.id,
        })
      } else {
        return checkUpdated(state)
      }
    }
    case 'removeMessage': {
      const currentActiveMessageId = getActiveMessageId(state)
      let updatedActiveMessageId
      const messageMap = { ...state.messageMap }
      delete messageMap[action.id]
      if (action.id === currentActiveMessageId) {
        const newMessages = sortedMessages(messageMap)
        if (newMessages?.length) {
          updatedActiveMessageId = newMessages[0].id
        }
      }
      const updatedProposal: Proposal = {
        ...state,
        messageMap,
        activeMessageId: updatedActiveMessageId ?? currentActiveMessageId,
      }
      if (
        updatedProposal?.activeMessageId &&
        !updatedProposal.messageMap[updatedProposal.activeMessageId]
      ) {
        console.error(`stale active message id`)
      }
      return checkUpdated(updatedProposal)
    }
    case 'addMessage': {
      const message = action.message
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
      const msg: MessageMapEntry = {
        id,
        messageType,
        order: len + 1,
        message,
      }

      const updated = {
        ...state,
        activeMessageId: msg.id,
        nextId,
        messageMap: {
          ...state.messageMap,
          [id]: msg,
        },
      }
      return checkUpdated(updated)
    }
    case 'updatePendingMessage': {
      if (!action.message) {
        const pendingMessages = { ...state.pendingMessages }
        delete pendingMessages[action.id]
        return {
          ...state,
          pendingMessages,
        }
      }
      return {
        ...state,
        pendingMessages: {
          ...state.pendingMessages,
          [action.id]: action.message,
        },
      }
    }
    case 'updateMessage': {
      const oldEntry = state.messageMap[action.id]
      if (!oldEntry) {
        throw new Error(
          `Invalid update. No existing message found for ${action.id}`
        )
      }
      if (!action.message) {
        console.warn(`Nothing to update`)
        return state
      }
      const message = action.message ?? oldEntry?.message
      const updatedEntry: MessageMapEntry = {
        ...oldEntry,
        message,
      }
      const proposal: Proposal = {
        ...state,
        messageMap: {
          ...state.messageMap,
          [action.id]: updatedEntry,
        },
      }
      return checkUpdated(proposal)
    }
  }
}
