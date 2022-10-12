import { Coin, StdFee } from '@cosmjs/amino'
import {
  CosmWasmClient,
  ExecuteResult,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'

import {
  ActiveThreshold,
  ActiveThresholdResponse,
  DaoResponse,
  InfoResponse,
  IsActiveResponse,
  StakingContractResponse,
  TokenContractResponse,
  TotalPowerAtHeightResponse,
  VotingPowerAtHeightResponse,
} from '@dao-dao/tstypes/contracts/CwdVotingCw20Staked'

export interface CwdVotingCw20StakedReadOnlyInterface {
  contractAddress: string
  stakingContract: () => Promise<StakingContractResponse>
  dao: () => Promise<DaoResponse>
  activeThreshold: () => Promise<ActiveThresholdResponse>
  votingPowerAtHeight: ({
    address,
    height,
  }: {
    address: string
    height?: number
  }) => Promise<VotingPowerAtHeightResponse>
  totalPowerAtHeight: ({
    height,
  }: {
    height?: number
  }) => Promise<TotalPowerAtHeightResponse>
  info: () => Promise<InfoResponse>
  tokenContract: () => Promise<TokenContractResponse>
  isActive: () => Promise<IsActiveResponse>
}
export class CwdVotingCw20StakedQueryClient
  implements CwdVotingCw20StakedReadOnlyInterface
{
  client: CosmWasmClient
  contractAddress: string

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client
    this.contractAddress = contractAddress
    this.stakingContract = this.stakingContract.bind(this)
    this.dao = this.dao.bind(this)
    this.activeThreshold = this.activeThreshold.bind(this)
    this.votingPowerAtHeight = this.votingPowerAtHeight.bind(this)
    this.totalPowerAtHeight = this.totalPowerAtHeight.bind(this)
    this.info = this.info.bind(this)
    this.tokenContract = this.tokenContract.bind(this)
    this.isActive = this.isActive.bind(this)
  }

  stakingContract = async (): Promise<StakingContractResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      staking_contract: {},
    })
  }
  dao = async (): Promise<DaoResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      dao: {},
    })
  }
  activeThreshold = async (): Promise<ActiveThresholdResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      active_threshold: {},
    })
  }
  votingPowerAtHeight = async ({
    address,
    height,
  }: {
    address: string
    height?: number
  }): Promise<VotingPowerAtHeightResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      voting_power_at_height: {
        address,
        height,
      },
    })
  }
  totalPowerAtHeight = async ({
    height,
  }: {
    height?: number
  }): Promise<TotalPowerAtHeightResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      total_power_at_height: {
        height,
      },
    })
  }
  info = async (): Promise<InfoResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      info: {},
    })
  }
  tokenContract = async (): Promise<TokenContractResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      token_contract: {},
    })
  }
  isActive = async (): Promise<IsActiveResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      is_active: {},
    })
  }
}
export interface CwdVotingCw20StakedInterface
  extends CwdVotingCw20StakedReadOnlyInterface {
  contractAddress: string
  sender: string
  updateActiveThreshold: (
    {
      newThreshold,
    }: {
      newThreshold?: ActiveThreshold
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>
}
export class CwdVotingCw20StakedClient
  extends CwdVotingCw20StakedQueryClient
  implements CwdVotingCw20StakedInterface
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
    this.updateActiveThreshold = this.updateActiveThreshold.bind(this)
  }

  updateActiveThreshold = async (
    {
      newThreshold,
    }: {
      newThreshold?: ActiveThreshold
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_active_threshold: {
          new_threshold: newThreshold,
        },
      },
      fee,
      memo,
      funds
    )
  }
}
