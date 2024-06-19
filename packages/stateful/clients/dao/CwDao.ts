import { QueryClient } from '@tanstack/react-query'

import { daoDaoCoreQueries } from '@dao-dao/state/query'
import { DaoBase } from '@dao-dao/stateless'
import { DaoInfo } from '@dao-dao/types'

import { daoQueries } from '../../queries'

export class CwDao extends DaoBase {
  protected _info: DaoInfo | undefined

  constructor(
    queryClient: QueryClient,
    protected readonly options: {
      chainId: string
      coreAddress: string
    }
  ) {
    super(queryClient)

    // Attempt immediate initialization if query is cached.
    this._info = this.queryClient.getQueryData(
      daoQueries.info(this.queryClient, {
        chainId: this.options.chainId,
        coreAddress: this.options.coreAddress,
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
        coreAddress: this.options.coreAddress,
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

  get coreAddress(): string {
    return this.options.coreAddress
  }

  async getVotingPower(address: string, height?: number): Promise<string> {
    return (
      await this.queryClient.fetchQuery(
        daoDaoCoreQueries.votingPowerAtHeight({
          chainId: this.options.chainId,
          contractAddress: this.options.coreAddress,
          args: {
            address,
            height,
          },
        })
      )
    ).power
  }

  async getTotalVotingPower(height?: number): Promise<string> {
    return (
      await this.queryClient.fetchQuery(
        daoDaoCoreQueries.totalPowerAtHeight({
          chainId: this.options.chainId,
          contractAddress: this.options.coreAddress,
          args: {
            height,
          },
        })
      )
    ).power
  }
}
