import { selectorFamily } from 'recoil'

import {
  ProposalResponse,
  ProposalTallyResponse,
  VoteInfo,
  VoteResponse,
} from '@dao-dao/types/contracts/cw3-dao'

import {
  contractProposalMapAtom,
  proposalsRequestIdAtom,
  proposalUpdateCountAtom,
} from 'atoms/proposals'
import { MessageMap, MessageMapEntry } from 'models/proposal/messageMap'
import {
  EmptyProposalResponse,
  EmptyProposalTallyResponse,
  EmptyThresholdResponse,
} from 'models/proposal/proposal'
import {
  ContractProposalMap,
  ExtendedProposalResponse,
  ProposalKey,
  ProposalMap,
  ProposalMapItem,
  ProposalMessageKey,
} from 'types/proposals'

import { cosmWasmClient } from './cosm'
import { daoSelector } from './daos'
import { sigSelector } from './multisigs'
import {
  walletAddress,
  walletStakedTokenBalanceAtHeightSelector,
} from './treasury'

export type ProposalIdInput = string | number

export type ProposalIdParamType = {
  proposal_id: number
}

export type ProposalSelectorParams = {
  contractAddress: string
  proposalId: ProposalIdInput
}

export type ProposalExecuteParams = {
  contractAddress: string
  proposalId: string | number
  walletAddress: string
}

export enum WalletVote {
  Yes = 'yes',
  No = 'no',
  Abstain = 'abstain',
  Veto = 'veto',
}
type WalletVoteValue = `${WalletVote}`

export const onChainProposalsSelector = selectorFamily<
  ProposalResponse[],
  {
    contractAddress: string
    startBefore: number
    limit: number
  }
>({
  key: 'onChainProposals',
  get:
    ({ contractAddress, startBefore, limit }) =>
    async ({ get }) => {
      // While this looks like a no-op, it forces a dependency on
      // the proposalRequestId, which can be incremented to force
      // a re-fetch after creating a new propossal.
      get(proposalsRequestIdAtom)

      const client = get(cosmWasmClient)
      const { proposals } = await client.queryContractSmart(contractAddress, {
        reverse_proposals: {
          ...(startBefore && { start_before: startBefore }),
          limit,
        },
      })
      return proposals
    },
})

export const proposalSelector = selectorFamily<
  ProposalResponse | undefined,
  { contractAddress: string; proposalId: string | number }
>({
  key: 'proposalSelector',
  get:
    ({
      contractAddress,
      proposalId,
    }: {
      contractAddress: string
      proposalId: string | number
    }) =>
    async ({ get }) => {
      if (typeof proposalId === 'string') {
        const draftProposal = get(
          draftProposalSelector({ contractAddress, proposalId })
        )
        if (draftProposal?.proposal) {
          return draftProposal?.proposal
        }
      }
      if (typeof proposalId === 'number') {
        get(proposalUpdateCountAtom({ contractAddress, proposalId }))
      }

      const client = get(cosmWasmClient)
      try {
        const proposal = await client.queryContractSmart(contractAddress, {
          proposal: { proposal_id: proposalId },
        })
        return proposal
      } catch (e) {
        console.error(e)
        return undefined
      }
    },
})

export const proposalStartBlockSelector = selectorFamily<
  number,
  { contractAddress: string; proposalId: number }
>({
  key: 'proposalStartBlockSelector',
  get:
    ({ contractAddress, proposalId }) =>
    async ({ get }) => {
      const client = get(cosmWasmClient)
      if (!client) {
        return 0
      }

      const events = await client.searchTx({
        tags: [
          { key: 'wasm._contract_address', value: contractAddress },
          { key: 'wasm.proposal_id', value: proposalId.toString() },
          { key: 'wasm.action', value: 'propose' },
        ],
      })

      if (events.length != 1) {
        return 0
      }

      const propose = events[0]
      return propose.height
    },
})

export const walletVoteSelector = selectorFamily<
  WalletVoteValue | undefined,
  { contractAddress: string; proposalId: number }
>({
  key: 'walletHasVotedOnProposalStatusSelector',
  get:
    ({ contractAddress, proposalId }) =>
    async ({ get }) => {
      const client = get(cosmWasmClient)
      const wallet = get(walletAddress)
      if (!client || !wallet) {
        return undefined
      }

      get(proposalUpdateCountAtom({ contractAddress, proposalId }))

      const vote = (await client.queryContractSmart(contractAddress, {
        vote: { proposal_id: proposalId, voter: wallet },
      })) as VoteResponse
      if (!vote.vote) {
        return undefined
      }
      return vote.vote.vote
    },
})

export const proposalExecutionTXHashSelector = selectorFamily<
  string | null,
  { contractAddress: string; proposalId: number }
>({
  key: 'proposalTXHashSelector',
  get:
    ({ contractAddress, proposalId }) =>
    async ({ get }) => {
      // Refresh when new updates occur.
      get(proposalUpdateCountAtom({ contractAddress, proposalId }))

      const client = get(cosmWasmClient)
      const proposal = get(proposalSelector({ contractAddress, proposalId }))
      // No TX Hash if proposal not yet executed.
      if (!client || proposal?.status !== 'executed') return null

      const events = await client.searchTx({
        tags: [
          { key: 'wasm._contract_address', value: contractAddress },
          { key: 'wasm.proposal_id', value: proposalId.toString() },
          { key: 'wasm.action', value: 'execute' },
        ],
      })

      if (events.length > 1) {
        console.error('More than one execution', events)
      }

      return events.length > 0 ? events[0].hash : null
    },
})

export const proposalVotesSelector = selectorFamily<
  VoteInfo[],
  { contractAddress: string; proposalId: number; startAfter?: string }
>({
  key: 'proposalVotesSelector',
  get:
    ({
      contractAddress,
      proposalId,
      startAfter,
    }: {
      contractAddress: string
      proposalId: number
      startAfter?: string
    }) =>
    async ({ get }) => {
      get(proposalUpdateCountAtom({ contractAddress, proposalId }))
      try {
        const client = get(cosmWasmClient)
        const votes = await client.queryContractSmart(contractAddress, {
          list_votes: {
            proposal_id: proposalId,
            ...(startAfter && { start_after: startAfter }),
            limit: 30,
          },
        })
        return votes.votes
      } catch (e) {
        console.error(e)
        return []
      }
    },
})

export const proposalTallySelector = selectorFamily<
  ProposalTallyResponse,
  { contractAddress: string; proposalId: number }
>({
  key: 'proposalTallySelector',
  get:
    ({
      contractAddress,
      proposalId,
    }: {
      contractAddress: string
      proposalId: number
    }) =>
    async ({ get }) => {
      get(proposalUpdateCountAtom({ contractAddress, proposalId }))
      try {
        const client = get(cosmWasmClient)
        const tally = await client.queryContractSmart(contractAddress, {
          tally: { proposal_id: proposalId },
        })
        return tally
      } catch (e) {
        console.error(e)
        return {
          ...EmptyProposalTallyResponse,
        }
      }
    },
})

export const votingPowerAtHeightSelector = selectorFamily<
  number,
  { contractAddress: string; height: number; multisig: boolean }
>({
  key: 'votingPowerAtHeightSelector',
  get:
    ({ contractAddress, height, multisig }) =>
    async ({ get }) => {
      const client = get(cosmWasmClient)
      const wallet = get(walletAddress)

      if (!client || !wallet) {
        return 0
      }

      if (multisig) {
        const config = get(sigSelector(contractAddress))
        const group = config.group_address
        const member = await client.queryContractSmart(group, {
          member: {
            addr: wallet,
            at_height: height,
          },
        })
        if ('weight' in member) {
          return member.weight
        }
        return 0
      }
      const config = get(daoSelector(contractAddress))
      const stakingAddress = config.staking_contract
      const balance = get(
        walletStakedTokenBalanceAtHeightSelector({
          stakingAddress,
          height,
        })
      )
      return balance
    },
})

export const draftProposalsSelector = selectorFamily<ProposalMap, string>({
  key: 'draftProposals',
  get:
    (contractAddress) =>
    ({ get }) => {
      return get(proposalMapSelector(contractAddress))
    },
  set:
    (contractAddress) =>
    ({ set }, newValue) => {
      set(proposalMapSelector(contractAddress), newValue)
    },
})

export const proposalsSelector = selectorFamily<
  ExtendedProposalResponse[],
  {
    contractAddress: string
    startBefore: number
    limit: number
  }
>({
  key: 'proposals',
  get:
    ({ contractAddress, startBefore, limit }) =>
    async ({ get }) => {
      let draftProposalItems: ExtendedProposalResponse[] = []
      // Add in draft proposals:
      const draftProposals = get(draftProposalsSelector(contractAddress))
      if (draftProposals) {
        draftProposalItems = Object.values(draftProposals).map((draft) => {
          const proposalResponse: ExtendedProposalResponse = {
            ...EmptyProposalResponse,
            ...draft.proposal,
            status: 'draft' as any,
            draftId: draft.id,
            threshold: { ...EmptyThresholdResponse },
            total_weight: 0,
          }
          return proposalResponse
        })
      }

      const onChainProposalList = get(
        onChainProposalsSelector({
          contractAddress,
          startBefore,
          limit,
        })
      )

      return (draftProposalItems ?? []).concat(onChainProposalList)
    },
})

export const proposalMapSelector = selectorFamily<ProposalMap, string>({
  key: 'proposalMap',
  get:
    (contractAddress) =>
    ({ get }) => {
      const contractProposalMap = get(contractProposalMapAtom)
      return contractProposalMap[contractAddress]
    },
  set:
    (contractAddress) =>
    ({ get, set }, newValue) => {
      const contractProposalMap = get(contractProposalMapAtom)
      const updatedMap: ContractProposalMap = {
        ...contractProposalMap,
        [contractAddress]: newValue,
      } as unknown as ContractProposalMap
      set(contractProposalMapAtom, updatedMap)
    },
})

export const draftProposalSelector = selectorFamily<
  ProposalMapItem | undefined,
  ProposalKey
>({
  key: 'draftProposal',
  get:
    ({ contractAddress, proposalId }) =>
    ({ get }) => {
      const draftProposals = get(proposalMapSelector(contractAddress))
      return draftProposals ? draftProposals[proposalId] : undefined
    },
  set:
    ({ contractAddress, proposalId }) =>
    ({ set, get }, newValue) => {
      if (newValue) {
        const draftProposals = get(proposalMapSelector(contractAddress))
        const updatedDraftProposals: ProposalMap = {
          ...draftProposals,
          [proposalId]: newValue as any,
        }
        set(proposalMapSelector(contractAddress), updatedDraftProposals)
      }
    },
})

export const draftProposalMessageSelector = selectorFamily<
  MessageMapEntry | undefined,
  ProposalMessageKey
>({
  key: 'draftProposalMessage',
  get:
    ({ contractAddress, proposalId, messageId }) =>
    ({ get }) => {
      const draftProposal = get(
        draftProposalSelector({ contractAddress, proposalId })
      )
      return draftProposal?.messages
        ? draftProposal.messages[messageId]
        : undefined
    },
  set:
    ({ contractAddress, proposalId, messageId }) =>
    ({ set, get }, newValue) => {
      if (!newValue) {
        return
      }
      const draftProposal = get(
        draftProposalSelector({ contractAddress, proposalId })
      )
      if (draftProposal) {
        const messages: MessageMap = {
          ...draftProposal?.messages,
          [messageId]: newValue,
        } as any
        const updatedProposal: ProposalMapItem = {
          ...draftProposal,
          messages,
        }
        set(
          draftProposalSelector({ contractAddress, proposalId }),
          updatedProposal
        )
      }
    },
})
