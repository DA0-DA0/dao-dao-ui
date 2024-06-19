import { StdFee } from '@cosmjs/amino'
import {
  CosmWasmClient,
  ExecuteResult,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'

import {
  Addr,
  Coin,
  Duration,
  InfoResponse,
  Uint64,
} from '@dao-dao/types/contracts/common'
import {
  Config,
  HooksResponse,
  MultipleChoiceOptions,
  MultipleChoiceVote,
  PreProposeInfo,
  ProposalCreationPolicyResponse,
  ProposalListResponse,
  ProposalResponse,
  VoteListResponse,
  VoteResponse,
  VotingStrategy,
} from '@dao-dao/types/contracts/DaoProposalMultiple'
import { CHAIN_GAS_MULTIPLIER } from '@dao-dao/utils'

export interface DaoProposalMultipleReadOnlyInterface {
  contractAddress: string
  config: () => Promise<Config>
  proposal: ({
    proposalId,
  }: {
    proposalId: number
  }) => Promise<ProposalResponse>
  listProposals: ({
    limit,
    startAfter,
  }: {
    limit?: number
    startAfter?: number
  }) => Promise<ProposalListResponse>
  reverseProposals: ({
    limit,
    startBefore,
  }: {
    limit?: number
    startBefore?: number
  }) => Promise<ProposalListResponse>
  proposalCount: () => Promise<Uint64>
  getVote: ({
    proposalId,
    voter,
  }: {
    proposalId: number
    voter: string
  }) => Promise<VoteResponse>
  listVotes: ({
    limit,
    proposalId,
    startAfter,
  }: {
    limit?: number
    proposalId: number
    startAfter?: string
  }) => Promise<VoteListResponse>
  proposalCreationPolicy: () => Promise<ProposalCreationPolicyResponse>
  proposalHooks: () => Promise<HooksResponse>
  voteHooks: () => Promise<HooksResponse>
  dao: () => Promise<Addr>
  info: () => Promise<InfoResponse>
}
export class DaoProposalMultipleQueryClient
  implements DaoProposalMultipleReadOnlyInterface
{
  client: CosmWasmClient
  contractAddress: string

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client
    this.contractAddress = contractAddress
    this.config = this.config.bind(this)
    this.proposal = this.proposal.bind(this)
    this.listProposals = this.listProposals.bind(this)
    this.reverseProposals = this.reverseProposals.bind(this)
    this.proposalCount = this.proposalCount.bind(this)
    this.getVote = this.getVote.bind(this)
    this.listVotes = this.listVotes.bind(this)
    this.proposalCreationPolicy = this.proposalCreationPolicy.bind(this)
    this.proposalHooks = this.proposalHooks.bind(this)
    this.voteHooks = this.voteHooks.bind(this)
    this.dao = this.dao.bind(this)
    this.info = this.info.bind(this)
  }

  config = async (): Promise<Config> => {
    return this.client.queryContractSmart(this.contractAddress, {
      config: {},
    })
  }
  proposal = async ({
    proposalId,
  }: {
    proposalId: number
  }): Promise<ProposalResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      proposal: {
        proposal_id: proposalId,
      },
    })
  }
  listProposals = async ({
    limit,
    startAfter,
  }: {
    limit?: number
    startAfter?: number
  }): Promise<ProposalListResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      list_proposals: {
        limit,
        start_after: startAfter,
      },
    })
  }
  reverseProposals = async ({
    limit,
    startBefore,
  }: {
    limit?: number
    startBefore?: number
  }): Promise<ProposalListResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      reverse_proposals: {
        limit,
        start_before: startBefore,
      },
    })
  }
  proposalCount = async (): Promise<Uint64> => {
    return this.client.queryContractSmart(this.contractAddress, {
      proposal_count: {},
    })
  }
  getVote = async ({
    proposalId,
    voter,
  }: {
    proposalId: number
    voter: string
  }): Promise<VoteResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      get_vote: {
        proposal_id: proposalId,
        voter,
      },
    })
  }
  listVotes = async ({
    limit,
    proposalId,
    startAfter,
  }: {
    limit?: number
    proposalId: number
    startAfter?: string
  }): Promise<VoteListResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      list_votes: {
        limit,
        proposal_id: proposalId,
        start_after: startAfter,
      },
    })
  }
  proposalCreationPolicy =
    async (): Promise<ProposalCreationPolicyResponse> => {
      return this.client.queryContractSmart(this.contractAddress, {
        proposal_creation_policy: {},
      })
    }

  proposalHooks = async (): Promise<HooksResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      proposal_hooks: {},
    })
  }
  voteHooks = async (): Promise<HooksResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      vote_hooks: {},
    })
  }
  dao = async (): Promise<Addr> => {
    return this.client.queryContractSmart(this.contractAddress, {
      dao: {},
    })
  }
  info = async (): Promise<InfoResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      info: {},
    })
  }
}
export interface DaoProposalMultipleInterface
  extends DaoProposalMultipleReadOnlyInterface {
  contractAddress: string
  sender: string
  propose: (
    {
      choices,
      description,
      proposer,
      title,
    }: {
      choices: MultipleChoiceOptions
      description: string
      proposer?: string
      title: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>
  vote: (
    {
      proposalId,
      vote,
    }: {
      proposalId: number
      vote: MultipleChoiceVote
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>
  execute: (
    {
      proposalId,
    }: {
      proposalId: number
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>
  veto: (
    {
      proposalId,
    }: {
      proposalId: number
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>
  close: (
    {
      proposalId,
    }: {
      proposalId: number
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>
  updateConfig: (
    {
      allowRevoting,
      closeProposalOnExecutionFailure,
      dao,
      maxVotingPeriod,
      minVotingPeriod,
      onlyMembersExecute,
      votingStrategy,
    }: {
      allowRevoting: boolean
      closeProposalOnExecutionFailure: boolean
      dao: string
      maxVotingPeriod: Duration
      minVotingPeriod?: Duration
      onlyMembersExecute: boolean
      votingStrategy: VotingStrategy
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>
  updatePreProposeInfo: (
    {
      info,
    }: {
      info: PreProposeInfo
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>
  addProposalHook: (
    {
      address,
    }: {
      address: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>
  removeProposalHook: (
    {
      address,
    }: {
      address: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>
  addVoteHook: (
    {
      address,
    }: {
      address: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>
  removeVoteHook: (
    {
      address,
    }: {
      address: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>
}
export class DaoProposalMultipleClient
  extends DaoProposalMultipleQueryClient
  implements DaoProposalMultipleInterface
{
  client: SigningCosmWasmClient
  sender: string
  contractAddress: string

  constructor(
    client: SigningCosmWasmClient,
    sender: string,
    contractAddress: string
  ) {
    super(client, contractAddress)
    this.client = client
    this.sender = sender
    this.contractAddress = contractAddress
    this.propose = this.propose.bind(this)
    this.vote = this.vote.bind(this)
    this.execute = this.execute.bind(this)
    this.veto = this.veto.bind(this)
    this.close = this.close.bind(this)
    this.updateConfig = this.updateConfig.bind(this)
    this.updatePreProposeInfo = this.updatePreProposeInfo.bind(this)
    this.addProposalHook = this.addProposalHook.bind(this)
    this.removeProposalHook = this.removeProposalHook.bind(this)
    this.addVoteHook = this.addVoteHook.bind(this)
    this.removeVoteHook = this.removeVoteHook.bind(this)
  }

  propose = async (
    {
      choices,
      description,
      proposer,
      title,
    }: {
      choices: MultipleChoiceOptions
      description: string
      proposer?: string
      title: string
    },
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        propose: {
          choices,
          description,
          proposer,
          title,
        },
      },
      fee,
      memo,
      funds
    )
  }
  vote = async (
    {
      proposalId,
      vote,
    }: {
      proposalId: number
      vote: MultipleChoiceVote
    },
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        vote: {
          proposal_id: proposalId,
          vote,
        },
      },
      fee,
      memo,
      funds
    )
  }
  execute = async (
    {
      proposalId,
    }: {
      proposalId: number
    },
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        execute: {
          proposal_id: proposalId,
        },
      },
      fee,
      memo,
      funds
    )
  }
  veto = async (
    {
      proposalId,
    }: {
      proposalId: number
    },
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        veto: {
          proposal_id: proposalId,
        },
      },
      fee,
      memo,
      funds
    )
  }
  close = async (
    {
      proposalId,
    }: {
      proposalId: number
    },
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        close: {
          proposal_id: proposalId,
        },
      },
      fee,
      memo,
      funds
    )
  }
  updateConfig = async (
    {
      allowRevoting,
      closeProposalOnExecutionFailure,
      dao,
      maxVotingPeriod,
      minVotingPeriod,
      onlyMembersExecute,
      votingStrategy,
    }: {
      allowRevoting: boolean
      closeProposalOnExecutionFailure: boolean
      dao: string
      maxVotingPeriod: Duration
      minVotingPeriod?: Duration
      onlyMembersExecute: boolean
      votingStrategy: VotingStrategy
    },
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_config: {
          allow_revoting: allowRevoting,
          close_proposal_on_execution_failure: closeProposalOnExecutionFailure,
          dao,
          max_voting_period: maxVotingPeriod,
          min_voting_period: minVotingPeriod,
          only_members_execute: onlyMembersExecute,
          voting_strategy: votingStrategy,
        },
      },
      fee,
      memo,
      funds
    )
  }
  updatePreProposeInfo = async (
    {
      info,
    }: {
      info: PreProposeInfo
    },
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_pre_propose_info: {
          info,
        },
      },
      fee,
      memo,
      funds
    )
  }
  addProposalHook = async (
    {
      address,
    }: {
      address: string
    },
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        add_proposal_hook: {
          address,
        },
      },
      fee,
      memo,
      funds
    )
  }
  removeProposalHook = async (
    {
      address,
    }: {
      address: string
    },
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        remove_proposal_hook: {
          address,
        },
      },
      fee,
      memo,
      funds
    )
  }
  addVoteHook = async (
    {
      address,
    }: {
      address: string
    },
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        add_vote_hook: {
          address,
        },
      },
      fee,
      memo,
      funds
    )
  }
  removeVoteHook = async (
    {
      address,
    }: {
      address: string
    },
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        remove_vote_hook: {
          address,
        },
      },
      fee,
      memo,
      funds
    )
  }
}
