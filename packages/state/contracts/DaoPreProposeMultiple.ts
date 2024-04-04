import { StdFee } from '@cosmjs/amino'
import {
  CosmWasmClient,
  ExecuteResult,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'

import {
  Binary,
  Coin,
  Empty,
  ProposalStatusEnum,
} from '@dao-dao/types/contracts/common'
import {
  Config,
  DaoResponse,
  DepositInfoResponse,
  ProposalModuleResponse,
  ProposeMessage,
  UncheckedDenom,
  UncheckedDepositInfo,
} from '@dao-dao/types/contracts/DaoPreProposeMultiple'
import { CHAIN_GAS_MULTIPLIER } from '@dao-dao/utils'

export interface DaoPreProposeMultipleReadOnlyInterface {
  contractAddress: string
  proposalModule: () => Promise<ProposalModuleResponse>
  dao: () => Promise<DaoResponse>
  config: () => Promise<Config>
  depositInfo: ({
    proposalId,
  }: {
    proposalId: number
  }) => Promise<DepositInfoResponse>
  queryExtension: ({ msg }: { msg: Empty }) => Promise<Binary>
}
export class DaoPreProposeMultipleQueryClient
  implements DaoPreProposeMultipleReadOnlyInterface
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
    this.queryExtension = this.queryExtension.bind(this)
  }

  proposalModule = async (): Promise<ProposalModuleResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      proposal_module: {},
    })
  }
  dao = async (): Promise<DaoResponse> => {
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
  queryExtension = async ({ msg }: { msg: Empty }): Promise<Binary> => {
    return this.client.queryContractSmart(this.contractAddress, {
      query_extension: {
        msg,
      },
    })
  }
}
export interface DaoPreProposeMultipleInterface
  extends DaoPreProposeMultipleReadOnlyInterface {
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
    funds?: Coin[]
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
    funds?: Coin[]
  ) => Promise<ExecuteResult>
  withdraw: (
    {
      denom,
    }: {
      denom?: UncheckedDenom
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>
  extension: (
    {
      msg,
    }: {
      msg: Empty
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>
  proposalCreatedHook: (
    {
      proposalId,
      proposer,
    }: {
      proposalId: number
      proposer: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>
  proposalCompletedHook: (
    {
      newStatus,
      proposalId,
    }: {
      newStatus: ProposalStatusEnum
      proposalId: number
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>
}
export class DaoPreProposeMultipleClient
  extends DaoPreProposeMultipleQueryClient
  implements DaoPreProposeMultipleInterface
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
    this.proposalCreatedHook = this.proposalCreatedHook.bind(this)
    this.proposalCompletedHook = this.proposalCompletedHook.bind(this)
  }

  propose = async (
    {
      msg,
    }: {
      msg: ProposeMessage
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
          msg,
        },
      },
      fee,
      memo,
      funds
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
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    funds?: Coin[]
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
      funds
    )
  }
  withdraw = async (
    {
      denom,
    }: {
      denom?: UncheckedDenom
    },
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    funds?: Coin[]
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
      funds
    )
  }
  extension = async (
    {
      msg,
    }: {
      msg: Empty
    },
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    funds?: Coin[]
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
      funds
    )
  }
  proposalCreatedHook = async (
    {
      proposalId,
      proposer,
    }: {
      proposalId: number
      proposer: string
    },
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        proposal_created_hook: {
          proposal_id: proposalId,
          proposer,
        },
      },
      fee,
      memo,
      funds
    )
  }
  proposalCompletedHook = async (
    {
      newStatus,
      proposalId,
    }: {
      newStatus: ProposalStatusEnum
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
        proposal_completed_hook: {
          new_status: newStatus,
          proposal_id: proposalId,
        },
      },
      fee,
      memo,
      funds
    )
  }
}
