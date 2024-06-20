import { Chain } from '@chain-registry/types'
import { QueryClient } from '@tanstack/react-query'

import { chainQueries } from '@dao-dao/state/query'
import { DaoBase, DaoInfo } from '@dao-dao/types'
import {
  getChainForChainId,
  mustGetConfiguredChainConfig,
} from '@dao-dao/utils'

import { daoQueries } from '../../queries'

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
      daoQueries.info(this.queryClient, {
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
      daoQueries.info(this.queryClient, {
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

  async getVotingPower(address: string): Promise<string> {
    return (
      await this.queryClient.fetchQuery(
        chainQueries.nativeStakedBalance({
          chainId: this.options.chainId,
          address,
        })
      )
    ).amount
  }

  async getTotalVotingPower(): Promise<string> {
    return await this.queryClient.fetchQuery(
      chainQueries.totalNativeStakedBalance({
        chainId: this.options.chainId,
      })
    )
  }
}
