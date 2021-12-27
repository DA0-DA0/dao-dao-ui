import { Proposal, ProposalResponse } from '@dao-dao/types/contracts/cw3-dao'
import {
  DefaultValue,
  selectorFamily,
  TransactionInterface_UNSTABLE,
  useRecoilTransaction_UNSTABLE,
} from 'recoil'
import { cosmWasmClient, cosmWasmSigningClient } from './cosm'
import { proposalsRequestIdAtom } from 'atoms/proposals'
import { defaultExecuteFee } from 'util/fee'

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
  }
>({
  key: 'onChainProposals',
  get:
    ({ contractAddress, startBefore }) =>
    async ({ get }) => {
      // While this looks like a no-op, it forces a dependency on
      // the proposalRequestId, which can be incremented to force
      // a re-fetch after creating a new propossal.
      get(proposalsRequestIdAtom)

      const client = get(cosmWasmClient)
      const { proposals } = await client.queryContractSmart(contractAddress, {
        reverse_proposals: {
          ...(startBefore && { start_before: startBefore }),
          limit: 10,
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

const executeProposal =
  <T>(key: string) =>
  (
    params: any,
    { contractAddress, proposalId, walletAddress }: ProposalExecuteParams
  ): ((params: any) => Promise<T>) => {
    return async ({ get }) => {
      const signingClient = get(cosmWasmSigningClient)
      const response = await signingClient.execute(
        walletAddress,
        contractAddress,
        { ...proposalIdParam(proposalId), ...params },
        defaultExecuteFee
      )
      return response
    }
  }

export const voteTransactionFn = (
  { get }: TransactionInterface_UNSTABLE,
  setTransactionHash: (hash: string) => void,
  { contractAddress, proposalId, walletAddress }: ProposalExecuteParams
) => {
  // const signingClient = get(cosmWasmSigningClient)
  return async (signingClient: any, vote: 'yes' | 'no') => {
    const result = await signingClient.execute(
      walletAddress,
      contractAddress,
      { vote: { proposal_id: parsedProposalId(proposalId), vote } },
      defaultExecuteFee
    )
    setTransactionHash(result.transactionHash)
    return result
  }
}

export const voteSelector = selectorFamily<any, any>({
  key: 'vote',
  get: queryProposal('query_vote', 'vote'),
  // set:
  //   ({ contractAddress, proposalId, walletAddress }: ProposalExecuteParams) =>
  //   async ({ set, get }, newValue: 'yes' | 'no' | DefaultValue) => {
  //     const signingClient = get(cosmWasmSigningClient)
  //     return await signingClient.execute(
  //       walletAddress,
  //       contractAddress,
  //       { ...proposalIdParam(proposalId), vote: { vote: newValue } },
  //       defaultExecuteFee
  //     )
  //   },
})
// const vote = async (vote: string) => {
//   setError('')
//   signingClient
//     ?.execute(
//       walletAddress,
//       contractAddress,
//       {
//         vote: { proposal_id: parseInt(proposalId), vote },
//       },
//       defaultExecuteFee
//     )
//     .then((response) => {
//       setTimestamp(new Date())
//       setTransactionHash(response.transactionHash)
//     })
//     .catch((err) => {
//       setLoading(false)
//       setError(err.message)
//     })
//}

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
