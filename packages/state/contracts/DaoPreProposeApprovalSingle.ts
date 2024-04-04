import { StdFee } from '@cosmjs/amino'
import {
  CosmWasmClient,
  ExecuteResult,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'

import { Addr, Coin, SecretAnyContractInfo } from '@dao-dao/types'
import {
  Config,
  DepositInfoResponse,
  ExecuteExt,
  HooksResponse,
  ProposeMessage,
  QueryExt,
  Status,
  UncheckedDenom,
  UncheckedDepositInfo,
} from '@dao-dao/types/contracts/DaoPreProposeApprovalSingle'

export interface DaoPreProposeApprovalSingleReadOnlyInterface {
  contractAddress: string
  proposalModule: () => Promise<Addr | SecretAnyContractInfo>
  dao: () => Promise<Addr | SecretAnyContractInfo>
  config: () => Promise<Config>
  depositInfo: ({
    proposalId,
  }: {
    proposalId: number
  }) => Promise<DepositInfoResponse>
  proposalSubmittedHooks: () => Promise<HooksResponse>
  queryExtension: ({ msg }: { msg: QueryExt }) => Promise<any>
}
export class DaoPreProposeApprovalSingleQueryClient
  implements DaoPreProposeApprovalSingleReadOnlyInterface
{
  client: CosmWasmClient
  contractAddress: string

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client
    this.contractAddress = contractAddress
    this.proposalModule = this.proposalModule.bind(this)
    this.dao = this.dao.bind(this)
    this.config = this.config.bind(this)
    this.depositInfo = this.depositInfo.bind(this)
    this.proposalSubmittedHooks = this.proposalSubmittedHooks.bind(this)
    this.queryExtension = this.queryExtension.bind(this)
  }

  proposalModule = async (): Promise<Addr | SecretAnyContractInfo> => {
    return this.client.queryContractSmart(this.contractAddress, {
      proposal_module: {},
    })
  }
  dao = async (): Promise<Addr | SecretAnyContractInfo> => {
    return this.client.queryContractSmart(this.contractAddress, {
      dao: {},
    })
  }
  config = async (): Promise<Config> => {
    return this.client.queryContractSmart(this.contractAddress, {
      config: {},
    })
  }
  depositInfo = async ({
    proposalId,
  }: {
    proposalId: number
  }): Promise<DepositInfoResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      deposit_info: {
        proposal_id: proposalId,
      },
    })
  }
  proposalSubmittedHooks = async (): Promise<HooksResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      proposal_submitted_hooks: {},
    })
  }
  queryExtension = async ({ msg }: { msg: QueryExt }): Promise<any> => {
    return this.client.queryContractSmart(this.contractAddress, {
      query_extension: {
        msg,
      },
    })
  }
}
export interface DaoPreProposeApprovalSingleInterface
  extends DaoPreProposeApprovalSingleReadOnlyInterface {
  contractAddress: string
  sender: string
  propose: (
    {
      msg,
    }: {
      msg: ProposeMessage
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  updateConfig: (
    {
      depositInfo,
      openProposalSubmission,
    }: {
      depositInfo?: UncheckedDepositInfo
      openProposalSubmission: boolean
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  withdraw: (
    {
      denom,
    }: {
      denom?: UncheckedDenom
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  extension: (
    {
      msg,
    }: {
      msg: ExecuteExt
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  addProposalSubmittedHook: (
    {
      address,
    }: {
      address: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  removeProposalSubmittedHook: (
    {
      address,
    }: {
      address: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  proposalCompletedHook: (
    {
      newStatus,
      proposalId,
    }: {
      newStatus: Status
      proposalId: number
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
}
export class DaoPreProposeApprovalSingleClient
  extends DaoPreProposeApprovalSingleQueryClient
  implements DaoPreProposeApprovalSingleInterface
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
    this.updateConfig = this.updateConfig.bind(this)
    this.withdraw = this.withdraw.bind(this)
    this.extension = this.extension.bind(this)
    this.addProposalSubmittedHook = this.addProposalSubmittedHook.bind(this)
    this.removeProposalSubmittedHook =
      this.removeProposalSubmittedHook.bind(this)
    this.proposalCompletedHook = this.proposalCompletedHook.bind(this)
  }

  propose = async (
    {
      msg,
    }: {
      msg: ProposeMessage
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        propose: {
          msg,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  updateConfig = async (
    {
      depositInfo,
      openProposalSubmission,
    }: {
      depositInfo?: UncheckedDepositInfo
      openProposalSubmission: boolean
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_config: {
          deposit_info: depositInfo,
          open_proposal_submission: openProposalSubmission,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  withdraw = async (
    {
      denom,
    }: {
      denom?: UncheckedDenom
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        withdraw: {
          denom,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  extension = async (
    {
      msg,
    }: {
      msg: ExecuteExt
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        extension: {
          msg,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  addProposalSubmittedHook = async (
    {
      address,
    }: {
      address: string
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        add_proposal_submitted_hook: {
          address,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  removeProposalSubmittedHook = async (
    {
      address,
    }: {
      address: string
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        remove_proposal_submitted_hook: {
          address,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  proposalCompletedHook = async (
    {
      newStatus,
      proposalId,
    }: {
      newStatus: Status
      proposalId: number
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        proposal_completed_hook: {
          new_status: newStatus,
          proposal_id: proposalId,
        },
      },
      fee,
      memo,
      _funds
    )
  }
}
