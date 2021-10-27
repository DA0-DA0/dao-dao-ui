import { Coin } from '../../types/cw3'
import { MessageMap, MessageMapEntry, ProposalMessageType } from './messageMap'
import { Proposal } from './proposal'

/// Returns the outgoing message for COSMOS
export function messageForProposal(proposal: Proposal) {
  const msgs = Object.values(proposal.messageMap).map((mapEntry) => {
    return mapEntry.message
  })
  const msg: Record<string, unknown> = {
    title: proposal.title,
    description: proposal.description,
    msgs,
  }
  return msg
}

/// If there's no active ID, this is the first one
/// for a given message type.
export function topmostId(
  messageMap: MessageMap,
  messageType: ProposalMessageType
): string | undefined {
  for (const entry of Object.values(messageMap)) {
    if (entry.messageType === messageType) {
      return entry?.id
    }
  }
  return undefined
}

export function getMessage(
  proposal: Proposal,
  messageId: string
): MessageMapEntry | undefined {
  return proposal.messageMap[messageId]
}

export function activeMessageId(
  proposal: Proposal,
  messageType: ProposalMessageType
) {
  return proposal.activeMessages[messageType]
}

export function getSpendAmount(spendMsg?: MessageMapEntry): string | undefined {
  if (spendMsg?.messageType === ProposalMessageType.Spend) {
    const coins = (spendMsg.message as any)?.bank?.send?.amount as Coin[]
    if (coins?.length) {
      return coins[0]?.amount
    }
  }
  return undefined
}

export function getSpendRecipient(
  spendMsg?: MessageMapEntry
): string | undefined {
  if (spendMsg?.messageType === ProposalMessageType.Spend) {
    const send = (spendMsg.message as any)?.bank?.send
    if (send) {
      return send?.to_address
    }
  }
  return undefined
}

export function proposalMessages(
  proposal: Proposal,
  messageType?: ProposalMessageType
) {
  return Object.values(proposal.messageMap).map((mapEntry) => {
    if (messageType && mapEntry.messageType == messageType) {
      return mapEntry
    }
    return mapEntry
  })
}
