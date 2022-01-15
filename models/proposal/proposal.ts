// Client-side proposal representation
import {
  CosmosMsgFor_Empty,
  ExecuteMsg,
  ProposalResponse,
} from '@dao-dao/types/contracts/cw3-dao'
import { ExecuteMsg as DAOExecuteMsg } from '@dao-dao/types/contracts/cw20-gov'
import {
  Proposal,
  ProposalTallyResponse,
  Status,
  Threshold,
  ThresholdResponse,
  Vote,
  Votes,
} from '@dao-dao/types/contracts/cw3-dao'

import { labelForMessage } from '../../util/messagehelpers'
import { MessageMap } from './messageMap'
import { ProposalMapItem } from 'types/proposals'

export const MEMO_MAX_LEN = 255

// export interface DraftProposal {
//   id: string
//   title: string
//   description: string
//   messageMap: MessageMap
//   nextId: number
//   // Which message is currently selected
//   activeMessageId: string
//   status: string
//   pendingMessages: {
//     [key: string]: CosmosMsgFor_Empty | ExecuteMsg | DAOExecuteMsg
//   }
// }

const EmptyThreshold: Threshold = {
  threshold_quorum: {
    quorum: '0',
    threshold: '0',
  },
}

const EmptyVotes: Votes = {
  abstain: '',
  yes: '',
  no: '',
  veto: '',
}

export const EmptyProposal: Proposal = {
  title: '',
  description: '',
  expires: {
    at_time: `${new Date()}`,
  },
  deposit: '',
  msgs: [],
  proposer: '',
  start_height: 0,
  status: 'open',
  threshold: { ...EmptyThreshold },
  total_weight: '',
  votes: { ...EmptyVotes },
}

export const EmptyProposalItem: ProposalMapItem = {
  proposal: EmptyProposal,
  id: -1,
  draft: true,
}

export const EmptyThresholdResponse: ThresholdResponse = {
  absolute_percentage: {
    percentage: '0',
    total_weight: '0',
  },
}

export const EmptyProposalTallyResponse: ProposalTallyResponse = {
  votes: [] as any,
  total_votes: '',
  threshold: EmptyThresholdResponse,
  status: 'pending',
  quorum: '',
  total_weight: '0',
}

export const EmptyProposalResponse: ProposalResponse = {
  ...EmptyProposal,
  id: -1,
  deposit_amount: '0',
  proposer: '',
  status: 'Draft' as Status,
  threshold: {...EmptyThresholdResponse},
  total_weight: '0'
}

export function memoForProposal(proposal: Proposal): string {
  const messagesMemo = proposal.msgs
    .map((msg) => labelForMessage(msg))
    .join(', ')
  return `${proposal.title}\n${proposal.description}\n\n${messagesMemo}`.slice(
    0,
    MEMO_MAX_LEN
  )
}
