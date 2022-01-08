import { ExecuteResult, SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { ProposalResponse } from '@dao-dao/types/contracts/cw3-dao'
import { proposalsRequestIdAtom } from 'atoms/proposals'
import { selectorFamily } from 'recoil'
import { defaultExecuteFee } from 'util/fee'
import { cosmWasmClient } from './cosm'

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

function parsedProposalId(proposalId: ProposalIdInput): number {
  if (typeof proposalId === 'string') {
    proposalId = parseInt(proposalId)
  }
  return proposalId
}

function proposalIdParam(proposalId: ProposalIdInput): ProposalIdParamType {
  return { proposal_id: parsedProposalId(proposalId) }
}

function proposalParam(key: string, proposalId: ProposalIdInput) {
  return { [key]: proposalIdParam(proposalId) }
}

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
const queryProposal =
  <T>(key: string, keyedResult?: string) =>
  ({
    contractAddress,
    proposalId,
  }: ProposalSelectorParams): ((params: any) => Promise<T>) => {
    return async ({ get }) => {
      const client = get(cosmWasmClient)
      const result = await client.queryContractSmart(
        contractAddress,
        proposalParam(key, proposalId)
      )
      if (keyedResult) {
        return result[keyedResult]
      }
      return result
    }
  }

export const vote = (
  signingClient: SigningCosmWasmClient,
  { contractAddress, proposalId, walletAddress }: ProposalExecuteParams
): ((vote: 'yes' | 'no') => Promise<ExecuteResult>) => {
  return (vote: string) =>
    signingClient.execute(
      walletAddress,
      contractAddress,
      { vote: { proposal_id: parsedProposalId(proposalId), vote } },
      defaultExecuteFee
    )
}

export const voteSelector = selectorFamily<any, any>({
  key: 'vote',
  get: queryProposal('query_vote', 'vote'),
})

export const proposalSelector = selectorFamily<
  ProposalResponse,
  ProposalSelectorParams
>({
  key: 'proposal',
  get: queryProposal<ProposalResponse>('proposal'),
})

export const votesSelector = selectorFamily<any, ProposalSelectorParams>({
  key: 'listVotes',
  get: queryProposal('list_votes', 'votes'),
})

export const tallySelector = selectorFamily<any, ProposalSelectorParams>({
  key: 'tally',
  get: queryProposal('tally'),
})
