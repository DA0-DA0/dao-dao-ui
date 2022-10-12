import { Coin, StdFee } from '@cosmjs/amino'
import {
  CosmWasmClient,
  ExecuteResult,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'

import { Duration, Uint128 } from '@dao-dao/tstypes/contracts/common'
import {
  ClaimsResponse,
  DaoResponse,
  GetConfigResponse,
  InfoResponse,
  ListStakersResponse,
  TotalPowerAtHeightResponse,
  VotingPowerAtHeightResponse,
} from '@dao-dao/tstypes/contracts/CwdVotingNativeStaked'

export interface CwdVotingNativeStakedReadOnlyInterface {
  contractAddress: string
  dao: () => Promise<DaoResponse>
  getConfig: () => Promise<GetConfigResponse>
  claims: ({ address }: { address: string }) => Promise<ClaimsResponse>
  listStakers: ({
    limit,
    startAfter,
  }: {
    limit?: number
    startAfter?: string
  }) => Promise<ListStakersResponse>
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
}
export class CwdVotingNativeStakedQueryClient
  implements CwdVotingNativeStakedReadOnlyInterface
{
  client: CosmWasmClient
  contractAddress: string

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client
    this.contractAddress = contractAddress
    this.dao = this.dao.bind(this)
    this.getConfig = this.getConfig.bind(this)
    this.claims = this.claims.bind(this)
    this.listStakers = this.listStakers.bind(this)
    this.votingPowerAtHeight = this.votingPowerAtHeight.bind(this)
    this.totalPowerAtHeight = this.totalPowerAtHeight.bind(this)
    this.info = this.info.bind(this)
  }

  dao = async (): Promise<DaoResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      dao: {},
    })
  }
  getConfig = async (): Promise<GetConfigResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      get_config: {},
    })
  }
  claims = async ({
    address,
  }: {
    address: string
  }): Promise<ClaimsResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      claims: {
        address,
      },
    })
  }
  listStakers = async ({
    limit,
    startAfter,
  }: {
    limit?: number
    startAfter?: string
  }): Promise<ListStakersResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      list_stakers: {
        limit,
        start_after: startAfter,
      },
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
}
export interface CwdVotingNativeStakedInterface
  extends CwdVotingNativeStakedReadOnlyInterface {
  contractAddress: string
  sender: string
  stake: (
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>
  unstake: (
    {
      amount,
    }: {
      amount: Uint128
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>
  updateConfig: (
    {
      duration,
      manager,
      owner,
    }: {
      duration?: Duration
      manager?: string
      owner?: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>
  claim: (
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>
}
export class CwdVotingNativeStakedClient
  extends CwdVotingNativeStakedQueryClient
  implements CwdVotingNativeStakedInterface
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
    this.stake = this.stake.bind(this)
    this.unstake = this.unstake.bind(this)
    this.updateConfig = this.updateConfig.bind(this)
    this.claim = this.claim.bind(this)
  }

  stake = async (
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        stake: {},
      },
      fee,
      memo,
      funds
    )
  }
  unstake = async (
    {
      amount,
    }: {
      amount: Uint128
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        unstake: {
          amount,
        },
      },
      fee,
      memo,
      funds
    )
  }
  updateConfig = async (
    {
      duration,
      manager,
      owner,
    }: {
      duration?: Duration
      manager?: string
      owner?: string
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_config: {
          duration,
          manager,
          owner,
        },
      },
      fee,
      memo,
      funds
    )
  }
  claim = async (
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        claim: {},
      },
      fee,
      memo,
      funds
    )
  }
}
