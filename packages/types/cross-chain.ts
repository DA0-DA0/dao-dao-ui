import { PolytoneConnection } from './chain'
import { UnifiedCosmosMsg } from './contracts'
import { Event } from './contracts/PolytoneListener'

export type TxRelayState = {
  /**
   * Whether or not there are any cross-chain messages.
   */
  hasCrossChainMessages: boolean
  /**
   * The relay states for the decoded message packets.
   */
  states: {
    all: CrossChainPacketInfoState[]
    pending: (CrossChainPacketInfoStatePending & { index: number })[]
    relayed: (CrossChainPacketInfoStateRelayed & { index: number })[]
    errored: (CrossChainPacketInfoStateErrored & { index: number })[]
    timedOut: (CrossChainPacketInfoStateTimedOut & { index: number })[]
  }
  /**
   * Whether or not there are cross-chain messages that need to be self-relayed.
   * Most chains have relayers set up, so no need to self-relay on those chains.
   * After a few minutes if there are still messages that need to be relayed,
   * they can be self-relayed. This will be true when unrelayed messages exist
   * on a chain with no relayers or when there are still unrelayed messages
   * after a few minutes.
   */
  needsSelfRelay: boolean
  /**
   * Opens the execute and self-relay modal.
   */
  openSelfRelay: () => void
}

export type DecodedPolytoneMsgMatch = {
  match: true
  chainId: string
  polytoneConnection: PolytoneConnection
  // The first message, or empty object if none.
  msg: Record<string, any>
  // The first message, or undefined if none.
  cosmosMsg: UnifiedCosmosMsg | undefined
  // All messages.
  msgs: Record<string, any>[]
  cosmosMsgs: UnifiedCosmosMsg[]
  initiatorMsg: string
}

export type DecodedPolytoneMsgNoMatch = {
  match: false
}

export type DecodedPolytoneMsg =
  | DecodedPolytoneMsgNoMatch
  | DecodedPolytoneMsgMatch

export type DecodedIcaMsgMatch = {
  match: true
  chainId: string
  /**
   * Whether or not this is an ICA create or execute message.
   */
  type: 'create' | 'execute'
  /**
   * The first message, or undefined if none. Will be undefined if execute with
   * no messages and for create messages.
   */
  msgWithSender?: {
    sender: string
    msg: Record<string, any>
  }
  /**
   * The first Cosmos message, or undefined if none. Will be undefined if
   * execute with no messages and for create messages.
   */
  cosmosMsgWithSender?: {
    sender: string
    msg: UnifiedCosmosMsg
  }
  /**
   * All messages.
   */
  msgsWithSenders: {
    sender: string
    msg: Record<string, any>
  }[]
  /**
   * All Cosmos messages.
   */
  cosmosMsgsWithSenders: {
    sender: string
    msg: UnifiedCosmosMsg
  }[]
}

export type DecodedIcaMsgNoMatch = {
  match: false
}

export type DecodedIcaMsg = DecodedIcaMsgNoMatch | DecodedIcaMsgMatch

export enum CrossChainPacketInfoType {
  Polytone = 'polytone',
  Ica = 'ica',
}

export type PolytoneCrossChainPacketInfo = {
  type: CrossChainPacketInfoType.Polytone
  data: DecodedPolytoneMsgMatch
  sender: string
  srcConnection: string
  srcChannel: string
  srcPort: string
  dstConnection: string
  dstChannel: string
  dstPort: string
}

export type IcaCrossChainPacketInfo = {
  type: CrossChainPacketInfoType.Ica
  data: DecodedIcaMsgMatch
  sender: string
  srcConnection: string
  // Cannot determine srcChannel from decoded message.
  srcPort: string
  dstConnection: string
  // Cannot determine dstChannel from decoded message.
  dstPort: string
}

export type CrossChainPacketInfo =
  | PolytoneCrossChainPacketInfo
  | IcaCrossChainPacketInfo

export enum CrossChainPacketInfoStatus {
  Pending = 'pending',
  Relayed = 'relayed',
  Errored = 'errored',
  TimedOut = 'timedOut',
}

export type CrossChainPacketInfoStatePending = {
  status: CrossChainPacketInfoStatus.Pending
  packet: CrossChainPacketInfo
}

export type CrossChainPacketInfoStateRelayed = {
  status: CrossChainPacketInfoStatus.Relayed
  packet: CrossChainPacketInfo
  /**
   * The relayed transaction hashes, if found.
   */
  txHashes?: string[]
  /**
   * Execution events per message within the cross-chain packet.
   */
  msgResponses: {
    events: Event[]
  }[]
}

export type CrossChainPacketInfoStateErrored = {
  status: CrossChainPacketInfoStatus.Errored
  packet: CrossChainPacketInfo
  /**
   * The captured error string.
   */
  error: string
}

export type CrossChainPacketInfoStateTimedOut = {
  status: CrossChainPacketInfoStatus.TimedOut
  packet: CrossChainPacketInfo
}

export type CrossChainPacketInfoState =
  | CrossChainPacketInfoStatePending
  | CrossChainPacketInfoStateRelayed
  | CrossChainPacketInfoStateErrored
  | CrossChainPacketInfoStateTimedOut
