import { Coin, Uint128 } from 'types/contracts/cw-plus'
import {
  MessageMap,
  MessageMapEntry,
  ProposalMessageType,
  messageSort,
} from './messageMap'
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
  proposal: Proposal,
  messageType?: ProposalMessageType
): string | undefined {
  const messages = proposalMessages(proposal, messageType)
  if (messages?.length) {
    return messages[0].id
  }
  return undefined
}

export function getMessage(
  proposal: Proposal,
  messageId: string
): MessageMapEntry | undefined {
  return proposal.messageMap[messageId]
}

export function getActiveMessageId(proposal: Proposal): string {
  return proposal.activeMessageId
}

export function getSpendAmount(spendMsg?: MessageMapEntry): string | undefined {
  if (
    spendMsg?.messageType === ProposalMessageType.Spend ||
    spendMsg?.messageType === ProposalMessageType.Mint
  ) {
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
  if (
    spendMsg?.messageType === ProposalMessageType.Spend ||
    spendMsg?.messageType === ProposalMessageType.Mint
  ) {
    const send = (spendMsg.message as any)?.bank?.send
    if (send) {
      return send?.to_address
    }
  }
  return undefined
}

export function getMintAmount(mintMessage?: MessageMapEntry): string | undefined {
  if (
    mintMessage?.messageType === ProposalMessageType.Mint
  ) {
    const amount = (mintMessage.message as any)?.mint.amount
    return amount
  }
  return undefined
}

export const getMintRecipient = getSpendRecipient

export function proposalMessages(
  proposal: Proposal,
  messageType?: ProposalMessageType // Optional filter
) {
  return sortedMessages(proposal.messageMap, messageType)
}

export function sortedMessages(
  messageMap: MessageMap,
  messageType?: ProposalMessageType
): MessageMapEntry[] {
  const messages = Object.values(messageMap).map((mapEntry) => {
    if (messageType && mapEntry.messageType == messageType) {
      return mapEntry
    }
    return mapEntry
  })
  messages.sort(messageSort)
  return messages
}
