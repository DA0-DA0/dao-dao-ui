import { selectorFamily } from 'recoil'

import { contractVersionSelector } from '@dao-dao/state'
import { ContractVersion, WithChainId } from '@dao-dao/tstypes'
import {
  ConfigResponse as ConfigV2Response,
  GetVoteResponse as GetVoteV2Response,
  ListVotesResponse as ListVotesV2Response,
  ProposalResponse as ProposalV2Response,
  ReverseProposalsResponse as ReverseProposalsV2Response,
} from '@dao-dao/tstypes/contracts/CwdProposalSingle.v2'
import {
  ConfigResponse as ConfigV1Response,
  VoteResponse as GetVoteV1Response,
  ListVotesResponse as ListVotesV1Response,
  ProposalResponse as ProposalV1Response,
  ReverseProposalsResponse as ReverseProposalsV1Response,
} from '@dao-dao/tstypes/contracts/CwProposalSingle.v1'

import {
  configSelector as configV2Selector,
  getVoteSelector as getVoteV2Selector,
  listVotesSelector as listVotesV2Selector,
  proposalSelector as proposalV2Selector,
  reverseProposalsSelector as reverseProposalsV2Selector,
} from './CwdProposalSingle.v2.recoil'
import {
  configSelector as configV1Selector,
  getVoteSelector as getVoteV1Selector,
  listVotesSelector as listVotesV1Selector,
  proposalSelector as proposalV1Selector,
  reverseProposalsSelector as reverseProposalsV1Selector,
} from './CwProposalSingle.v1.recoil'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const getVoteSelector = selectorFamily<
  GetVoteV1Response | GetVoteV2Response,
  QueryClientParams & {
    params: [
      {
        proposalId: number
        voter: string
      }
    ]
  }
>({
  key: 'cwdProposalSingleCommonGetVote',
  get:
    (params) =>
    async ({ get }) => {
      const proposalModuleVersion = get(
        contractVersionSelector({
          contractAddress: params.contractAddress,
          chainId: params.chainId,
        })
      )
      const selector =
        proposalModuleVersion === ContractVersion.V0_1_0
          ? getVoteV1Selector
          : getVoteV2Selector

      return get<GetVoteV1Response | GetVoteV2Response>(selector(params))
    },
})

export const listVotesSelector = selectorFamily<
  ListVotesV1Response | ListVotesV2Response,
  QueryClientParams & {
    params: [
      {
        limit?: number
        proposalId: number
        startAfter?: string
      }
    ]
  }
>({
  key: 'cwdProposalSingleCommonListVotes',
  get:
    (params) =>
    async ({ get }) => {
      const proposalModuleVersion = get(
        contractVersionSelector({
          contractAddress: params.contractAddress,
          chainId: params.chainId,
        })
      )
      const selector =
        proposalModuleVersion === ContractVersion.V0_1_0
          ? listVotesV1Selector
          : listVotesV2Selector

      return get<ListVotesV1Response | ListVotesV2Response>(selector(params))
    },
})

export const proposalSelector = selectorFamily<
  ProposalV1Response | ProposalV2Response,
  QueryClientParams & {
    params: [
      {
        proposalId: number
      }
    ]
  }
>({
  key: 'cwdProposalSingleCommonProposal',
  get:
    (params) =>
    async ({ get }) => {
      const proposalModuleVersion = get(
        contractVersionSelector({
          contractAddress: params.contractAddress,
          chainId: params.chainId,
        })
      )
      const selector =
        proposalModuleVersion === ContractVersion.V0_1_0
          ? proposalV1Selector
          : proposalV2Selector

      return get<ProposalV1Response | ProposalV2Response>(selector(params))
    },
})

export const configSelector = selectorFamily<
  ConfigV1Response | ConfigV2Response,
  QueryClientParams
>({
  key: 'cwdProposalSingleCommonConfig',
  get:
    (params) =>
    async ({ get }) => {
      const proposalModuleVersion = get(
        contractVersionSelector({
          contractAddress: params.contractAddress,
          chainId: params.chainId,
        })
      )
      const selector =
        proposalModuleVersion === ContractVersion.V0_1_0
          ? configV1Selector
          : configV2Selector

      return get<ConfigV1Response | ConfigV2Response>(selector(params))
    },
})

export const reverseProposalsSelector = selectorFamily<
  ReverseProposalsV1Response | ReverseProposalsV2Response,
  QueryClientParams & {
    params: [
      {
        limit?: number
        startBefore?: number
      }
    ]
  }
>({
  key: 'cwdProposalSingleCommonReverseProposals',
  get:
    (params) =>
    async ({ get }) => {
      const proposalModuleVersion = get(
        contractVersionSelector({
          contractAddress: params.contractAddress,
          chainId: params.chainId,
        })
      )
      const selector =
        proposalModuleVersion === ContractVersion.V0_1_0
          ? reverseProposalsV1Selector
          : reverseProposalsV2Selector

      return get<ReverseProposalsV1Response | ReverseProposalsV2Response>(
        selector(params)
      )
    },
})
