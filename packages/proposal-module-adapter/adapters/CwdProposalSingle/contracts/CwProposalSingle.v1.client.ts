import { StdFee } from '@cosmjs/amino'
import {
  CosmWasmClient,
  ExecuteResult,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'

import {
  Coin,
  CosmosMsgForEmpty,
  Duration,
} from '@dao-dao/tstypes/contracts/common'
import {
  Threshold,
  Vote,
} from '@dao-dao/tstypes/contracts/CwdProposalSingle.common'
import {
  ConfigResponse,
  DepositInfo,
  InfoResponse,
  ListProposalsResponse,
  ListVotesResponse,
  ProposalCountResponse,
  ProposalHooksResponse,
  ProposalResponse,
  ReverseProposalsResponse,
  VoteHooksResponse,
  VoteResponse,
} from '@dao-dao/tstypes/contracts/CwProposalSingle.v1'

export interface CwProposalSingleV1ReadOnlyInterface {
  contractAddress: string
  config: () => Promise<ConfigResponse>
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
  }) => Promise<ListProposalsResponse>
  reverseProposals: ({
    limit,
    startBefore,
  }: {
    limit?: number
    startBefore?: number
  }) => Promise<ReverseProposalsResponse>
  proposalCount: () => Promise<ProposalCountResponse>
  // Modified since `vote` is duplicate enum.
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
  }) => Promise<ListVotesResponse>
  proposalHooks: () => Promise<ProposalHooksResponse>
  voteHooks: () => Promise<VoteHooksResponse>
  info: () => Promise<InfoResponse>
}
export class CwProposalSingleV1QueryClient
  implements CwProposalSingleV1ReadOnlyInterface
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
    // Modified since `vote` is duplicate enum.
    this.getVote = this.getVote.bind(this)
    this.listVotes = this.listVotes.bind(this)
    this.proposalHooks = this.proposalHooks.bind(this)
    this.voteHooks = this.voteHooks.bind(this)
    this.info = this.info.bind(this)
  }

  config = async (): Promise<ConfigResponse> => {
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
  }): Promise<ListProposalsResponse> => {
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
  }): Promise<ReverseProposalsResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      reverse_proposals: {
        limit,
        start_before: startBefore,
      },
    })
  }
  proposalCount = async (): Promise<ProposalCountResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      proposal_count: {},
    })
  }
  // Modified since `vote` is duplicate enum.
  getVote = async ({
    proposalId,
    voter,
  }: {
    proposalId: number
    voter: string
  }): Promise<VoteResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      vote: {
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
  }): Promise<ListVotesResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      list_votes: {
        limit,
        proposal_id: proposalId,
        start_after: startAfter,
      },
    })
  }
  proposalHooks = async (): Promise<ProposalHooksResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      proposal_hooks: {},
    })
  }
  voteHooks = async (): Promise<VoteHooksResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      vote_hooks: {},
    })
  }
  info = async (): Promise<InfoResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      info: {},
    })
  }
}
export interface CwProposalSingleV1Interface
  extends CwProposalSingleV1ReadOnlyInterface {
  contractAddress: string
  sender: string
  propose: (
    {
      description,
      msgs,
      title,
    }: {
      description: string
      msgs: CosmosMsgForEmpty[]
      title: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ) => Promise<ExecuteResult>
  vote: (
    {
      proposalId,
      vote,
    }: {
      proposalId: number
      vote: Vote
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ) => Promise<ExecuteResult>
  execute: (
    {
      proposalId,
    }: {
      proposalId: number
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ) => Promise<ExecuteResult>
  close: (
    {
      proposalId,
    }: {
      proposalId: number
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ) => Promise<ExecuteResult>
  updateConfig: (
    {
      allowRevoting,
      dao,
      depositInfo,
      maxVotingPeriod,
      onlyMembersExecute,
      threshold,
    }: {
      allowRevoting: boolean
      dao: string
      depositInfo?: DepositInfo
      maxVotingPeriod: Duration
      onlyMembersExecute: boolean
      threshold: Threshold
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ) => Promise<ExecuteResult>
  addProposalHook: (
    {
      address,
    }: {
      address: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ) => Promise<ExecuteResult>
  removeProposalHook: (
    {
      address,
    }: {
      address: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ) => Promise<ExecuteResult>
  addVoteHook: (
    {
      address,
    }: {
      address: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ) => Promise<ExecuteResult>
  removeVoteHook: (
    {
      address,
    }: {
      address: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ) => Promise<ExecuteResult>
}
export class CwProposalSingleV1Client
  extends CwProposalSingleV1QueryClient
  implements CwProposalSingleV1Interface
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
    this.close = this.close.bind(this)
    this.updateConfig = this.updateConfig.bind(this)
    this.addProposalHook = this.addProposalHook.bind(this)
    this.removeProposalHook = this.removeProposalHook.bind(this)
    this.addVoteHook = this.addVoteHook.bind(this)
    this.removeVoteHook = this.removeVoteHook.bind(this)
  }

  propose = async (
    {
      description,
      msgs,
      title,
    }: {
      description: string
      msgs: CosmosMsgForEmpty[]
      title: string
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        propose: {
          description,
          msgs,
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
      vote: Vote
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    funds?: readonly Coin[]
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
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    funds?: readonly Coin[]
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
  close = async (
    {
      proposalId,
    }: {
      proposalId: number
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    funds?: readonly Coin[]
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
      dao,
      depositInfo,
      maxVotingPeriod,
      onlyMembersExecute,
      threshold,
    }: {
      allowRevoting: boolean
      dao: string
      depositInfo?: DepositInfo
      maxVotingPeriod: Duration
      onlyMembersExecute: boolean
      threshold: Threshold
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_config: {
          allow_revoting: allowRevoting,
          dao,
          deposit_info: depositInfo,
          max_voting_period: maxVotingPeriod,
          only_members_execute: onlyMembersExecute,
          threshold,
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
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    funds?: readonly Coin[]
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
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    funds?: readonly Coin[]
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
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    funds?: readonly Coin[]
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
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    funds?: readonly Coin[]
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
