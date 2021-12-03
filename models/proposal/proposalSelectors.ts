import { BankMsg, Coin, Uint128 } from '@dao_dao/types/contracts/cw3-dao'
import {
  MessageMap,
  MessageMapEntry,
  ProposalMessageType,
  messageSort,
} from './messageMap'
import { makeExecutableMintMessage } from '../../util/messagehelpers'
import { Proposal } from './proposal'
import {
  convertDenomToContractReadableDenom,
  convertDenomToMicroDenom,
} from '../../util/conversion'

/// Returns the outgoing message for COSMOS
export function messageForProposal(
  proposal: Proposal,
  contractAddress: string
) {
  const msgs = Object.values(proposal.messageMap).map((mapEntry) => {
    // Spend proposals are inputted in human readable form (ex:
    // junox). Contracts expect things in the micro form (ex: ujunox)
    // so we, painfully, do some conversions:
    if (mapEntry.messageType === ProposalMessageType.Spend) {
      let microMessage = mapEntry.message
      const bank = (microMessage as any).bank as BankMsg
      if (!bank) {
        return
      }

      let amounts: Coin[]
      let variant: string
      if ('send' in bank) {
        amounts = (bank as any).send.amount
        variant = 'send'
      } else if ('burn' in bank) {
        amounts = (bank as any).burn.amount
        variant = 'burn'
      } else {
        console.error(`unexpected bank message: (${JSON.stringify(bank)})`)
        return
      }

      const microAmounts = amounts.map((coin) => {
        const microCoin = coin
        microCoin.amount = convertDenomToMicroDenom(coin.amount)
        microCoin.denom = convertDenomToContractReadableDenom(coin.denom)
        return microCoin
      }) as Coin[]

      ;(((microMessage as any).bank as any)[variant] as any).amount =
        microAmounts

      return microMessage
    }
    if (mapEntry.messageType === ProposalMessageType.Mint) {
      return makeExecutableMintMessage(
        mapEntry.message as any,
        contractAddress
      ) as any
    }
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

export function getSpendAmount(
  spendMsg?: MessageMapEntry
): Uint128 | undefined {
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

export function getMintAmount(
  mintMessage?: MessageMapEntry
): Uint128 | undefined {
  if (mintMessage?.messageType === ProposalMessageType.Mint) {
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
