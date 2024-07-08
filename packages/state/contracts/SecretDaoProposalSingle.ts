/**
 * This file was automatically generated by @cosmwasm/ts-codegen@1.10.0.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run the @cosmwasm/ts-codegen generate command to regenerate this file.
 */

import {
  CosmWasmClient,
  ExecuteResult,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'

import {
  Addr,
  Auth,
  Coin,
  Config,
  CosmosMsgForEmpty,
  Duration,
  HooksResponse,
  InfoResponse,
  PreProposeInfo,
  ProposalCreationPolicy,
  ProposalListResponse,
  ProposalResponse,
  Threshold,
  Uint64,
  VetoConfig,
  Vote,
  VoteListResponse,
  VoteResponse,
} from '@dao-dao/types/contracts/SecretDaoProposalSingle'

export interface SecretDaoProposalSingleReadOnlyInterface {
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
  getVote: ({
    auth,
    proposalId,
  }: {
    auth: Auth
    proposalId: number
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
  proposalCount: () => Promise<number>
  proposalCreationPolicy: () => Promise<ProposalCreationPolicy>
  proposalHooks: () => Promise<HooksResponse>
  voteHooks: () => Promise<HooksResponse>
  dao: () => Promise<Addr>
  info: () => Promise<InfoResponse>
  nextProposalId: () => Promise<Uint64>
}
export class SecretDaoProposalSingleQueryClient
  implements SecretDaoProposalSingleReadOnlyInterface
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
    this.getVote = this.getVote.bind(this)
    this.listVotes = this.listVotes.bind(this)
    this.proposalCount = this.proposalCount.bind(this)
    this.proposalCreationPolicy = this.proposalCreationPolicy.bind(this)
    this.proposalHooks = this.proposalHooks.bind(this)
    this.voteHooks = this.voteHooks.bind(this)
    this.dao = this.dao.bind(this)
    this.info = this.info.bind(this)
    this.nextProposalId = this.nextProposalId.bind(this)
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
  getVote = async ({
    auth,
    proposalId,
  }: {
    auth: Auth
    proposalId: number
  }): Promise<VoteResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      get_vote: {
        auth,
        proposal_id: proposalId,
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
  proposalCount = async (): Promise<number> => {
    return this.client.queryContractSmart(this.contractAddress, {
      proposal_count: {},
    })
  }
  proposalCreationPolicy = async (): Promise<ProposalCreationPolicy> => {
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
  nextProposalId = async (): Promise<Uint64> => {
    return this.client.queryContractSmart(this.contractAddress, {
      next_proposal_id: {},
    })
  }
}
export interface SecretDaoProposalSingleInterface
  extends SecretDaoProposalSingleReadOnlyInterface {
  contractAddress: string
  sender: string
  propose: (
    {
      description,
      msgs,
      proposer,
      title,
    }: {
      description: string
      msgs: CosmosMsgForEmpty[]
      proposer?: string
      title: string
    },
    fee?: number,
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  vote: (
    {
      auth,
      proposalId,
      rationale,
      vote,
    }: {
      auth: Auth
      proposalId: number
      rationale?: string
      vote: Vote
    },
    fee?: number,
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  updateRationale: (
    {
      proposalId,
      rationale,
    }: {
      proposalId: number
      rationale?: string
    },
    fee?: number,
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  execute: (
    {
      auth,
      proposalId,
    }: {
      auth: Auth
      proposalId: number
    },
    fee?: number,
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  veto: (
    {
      proposalId,
    }: {
      proposalId: number
    },
    fee?: number,
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  close: (
    {
      proposalId,
    }: {
      proposalId: number
    },
    fee?: number,
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  updateConfig: (
    {
      allowRevoting,
      closeProposalOnExecutionFailure,
      maxVotingPeriod,
      minVotingPeriod,
      onlyMembersExecute,
      threshold,
      veto,
    }: {
      allowRevoting: boolean
      closeProposalOnExecutionFailure: boolean
      maxVotingPeriod: Duration
      minVotingPeriod?: Duration
      onlyMembersExecute: boolean
      threshold: Threshold
      veto?: VetoConfig
    },
    fee?: number,
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  updatePreProposeInfo: (
    {
      info,
    }: {
      info: PreProposeInfo
    },
    fee?: number,
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  addProposalHook: (
    {
      address,
      codeHash,
    }: {
      address: string
      codeHash: string
    },
    fee?: number,
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  removeProposalHook: (
    {
      address,
      codeHash,
    }: {
      address: string
      codeHash: string
    },
    fee?: number,
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  addVoteHook: (
    {
      address,
      codeHash,
    }: {
      address: string
      codeHash: string
    },
    fee?: number,
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  removeVoteHook: (
    {
      address,
      codeHash,
    }: {
      address: string
      codeHash: string
    },
    fee?: number,
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  updateDaoInfo: (
    {
      address,
      codeHash,
    }: {
      address: Addr
      codeHash: string
    },
    fee?: number,
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
}
export class SecretDaoProposalSingleClient
  extends SecretDaoProposalSingleQueryClient
  implements SecretDaoProposalSingleInterface
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
    this.updateRationale = this.updateRationale.bind(this)
    this.execute = this.execute.bind(this)
    this.veto = this.veto.bind(this)
    this.close = this.close.bind(this)
    this.updateConfig = this.updateConfig.bind(this)
    this.updatePreProposeInfo = this.updatePreProposeInfo.bind(this)
    this.addProposalHook = this.addProposalHook.bind(this)
    this.removeProposalHook = this.removeProposalHook.bind(this)
    this.addVoteHook = this.addVoteHook.bind(this)
    this.removeVoteHook = this.removeVoteHook.bind(this)
    this.updateDaoInfo = this.updateDaoInfo.bind(this)
  }
  propose = async (
    {
      description,
      msgs,
      proposer,
      title,
    }: {
      description: string
      msgs: CosmosMsgForEmpty[]
      proposer?: string
      title: string
    },
    fee: number = 500_000,
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        propose: {
          description,
          msgs,
          proposer,
          title,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  vote = async (
    {
      auth,
      proposalId,
      rationale,
      vote,
    }: {
      auth: Auth
      proposalId: number
      rationale?: string
      vote: Vote
    },
    fee: number = 500_000,
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        vote: {
          auth,
          proposal_id: proposalId,
          rationale,
          vote,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  updateRationale = async (
    {
      proposalId,
      rationale,
    }: {
      proposalId: number
      rationale?: string
    },
    fee: number = 500_000,
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_rationale: {
          proposal_id: proposalId,
          rationale,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  execute = async (
    {
      auth,
      proposalId,
    }: {
      auth: Auth
      proposalId: number
    },
    fee: number = 500_000,
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        execute: {
          auth,
          proposal_id: proposalId,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  veto = async (
    {
      proposalId,
    }: {
      proposalId: number
    },
    fee: number = 500_000,
    memo?: string,
    _funds?: Coin[]
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
      _funds
    )
  }
  close = async (
    {
      proposalId,
    }: {
      proposalId: number
    },
    fee: number = 500_000,
    memo?: string,
    _funds?: Coin[]
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
      _funds
    )
  }
  updateConfig = async (
    {
      allowRevoting,
      closeProposalOnExecutionFailure,
      maxVotingPeriod,
      minVotingPeriod,
      onlyMembersExecute,
      threshold,
      veto,
    }: {
      allowRevoting: boolean
      closeProposalOnExecutionFailure: boolean
      maxVotingPeriod: Duration
      minVotingPeriod?: Duration
      onlyMembersExecute: boolean
      threshold: Threshold
      veto?: VetoConfig
    },
    fee: number = 500_000,
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_config: {
          allow_revoting: allowRevoting,
          close_proposal_on_execution_failure: closeProposalOnExecutionFailure,
          max_voting_period: maxVotingPeriod,
          min_voting_period: minVotingPeriod,
          only_members_execute: onlyMembersExecute,
          threshold,
          veto,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  updatePreProposeInfo = async (
    {
      info,
    }: {
      info: PreProposeInfo
    },
    fee: number = 500_000,
    memo?: string,
    _funds?: Coin[]
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
      _funds
    )
  }
  addProposalHook = async (
    {
      address,
      codeHash,
    }: {
      address: string
      codeHash: string
    },
    fee: number = 500_000,
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        add_proposal_hook: {
          address,
          code_hash: codeHash,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  removeProposalHook = async (
    {
      address,
      codeHash,
    }: {
      address: string
      codeHash: string
    },
    fee: number = 500_000,
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        remove_proposal_hook: {
          address,
          code_hash: codeHash,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  addVoteHook = async (
    {
      address,
      codeHash,
    }: {
      address: string
      codeHash: string
    },
    fee: number = 500_000,
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        add_vote_hook: {
          address,
          code_hash: codeHash,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  removeVoteHook = async (
    {
      address,
      codeHash,
    }: {
      address: string
      codeHash: string
    },
    fee: number = 500_000,
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        remove_vote_hook: {
          address,
          code_hash: codeHash,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  updateDaoInfo = async (
    {
      address,
      codeHash,
    }: {
      address: Addr
      codeHash: string
    },
    fee: number = 500_000,
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_dao_info: {
          address,
          code_hash: codeHash,
        },
      },
      fee,
      memo,
      _funds
    )
  }
}