import { Chain } from '@chain-registry/types'
import {
  FetchQueryOptions,
  QueryClient,
  skipToken,
} from '@tanstack/react-query'

import { daoQueries } from '@dao-dao/state/query'
import { DaoBase, DaoInfo } from '@dao-dao/types'
import {
  TotalPowerAtHeightResponse,
  VotingPowerAtHeightResponse,
} from '@dao-dao/types/contracts/DaoCore.v2'
import {
  getChainForChainId,
  mustGetConfiguredChainConfig,
} from '@dao-dao/utils'

import { daoQueries as statefulDaoQueries } from '../../queries'

export class ChainXGovDao extends DaoBase {
  protected _info: DaoInfo | undefined

  constructor(
    queryClient: QueryClient,
    protected readonly options: {
      chainId: string
    }
  ) {
    super(queryClient)

    // Attempt immediate initialization if query is cached.
    this._info = this.queryClient.getQueryData(
      statefulDaoQueries.info(this.queryClient, {
        chainId: this.options.chainId,
        coreAddress: mustGetConfiguredChainConfig(this.options.chainId).name,
      }).queryKey
    )
  }

  async init() {
    if (this.initialized) {
      return
    }

    this._info = await this.queryClient.fetchQuery(
      statefulDaoQueries.info(this.queryClient, {
        chainId: this.options.chainId,
        coreAddress: mustGetConfiguredChainConfig(this.options.chainId).name,
      })
    )
  }

  get initialized() {
    return !!this._info
  }

  get info(): DaoInfo {
    if (!this._info) {
      throw new Error('Not initialized')
    }
    return this._info
  }

  get chainId(): string {
    return this.options.chainId
  }

  get chain(): Chain {
    return getChainForChainId(this.chainId)
  }

  get coreAddress(): string {
    return mustGetConfiguredChainConfig(this.options.chainId).name
  }

  getVotingPowerQuery(
    address?: string
  ): FetchQueryOptions<VotingPowerAtHeightResponse> {
    // If no address, return query in loading state.
    if (!address) {
      return {
        queryKey: [],
        queryFn: skipToken,
      }
    }

    return daoQueries.chainVotingPower(this.queryClient, {
      chainId: this.options.chainId,
      address,
    })
  }

  async getVotingPower(
    ...params: Parameters<ChainXGovDao['getVotingPowerQuery']>
  ): Promise<string> {
    return (
      await this.queryClient.fetchQuery(this.getVotingPowerQuery(...params))
    ).power
  }

  getTotalVotingPowerQuery(): FetchQueryOptions<TotalPowerAtHeightResponse> {
    return daoQueries.chainTotalPower(this.queryClient, {
      chainId: this.options.chainId,
    })
  }

  async getTotalVotingPower(
    ...params: Parameters<ChainXGovDao['getTotalVotingPowerQuery']>
  ): Promise<string> {
    return (
      await this.queryClient.fetchQuery(
        this.getTotalVotingPowerQuery(...params)
      )
    ).power
  }
}
