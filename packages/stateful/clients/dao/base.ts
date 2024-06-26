import { Chain } from '@chain-registry/types'
import { FetchQueryOptions, QueryClient } from '@tanstack/react-query'

import {
  DaoInfo,
  IDaoBase,
  IProposalModuleBase,
  IVotingModuleBase,
} from '@dao-dao/types'
import {
  TotalPowerAtHeightResponse,
  VotingPowerAtHeightResponse,
} from '@dao-dao/types/contracts/DaoCore.v2'

export abstract class DaoBase implements IDaoBase {
  constructor(protected readonly queryClient: QueryClient) {}

  /**
   * Initialize the client. This only matters for some functions, depending on
   * the implementation.
   */
  abstract init(): Promise<void>

  /**
   * Whether or not the client has been initialized. This only matters for some
   * functions, depending on the implementation.
   */
  abstract get initialized(): boolean

  /**
   * DAO info object.
   */
  abstract get info(): DaoInfo

  /**
   * Chain ID of the DAO.
   */
  abstract get chainId(): string

  /**
   * Chain of the DAO.
   */
  abstract get chain(): Chain

  /**
   * Core address of the DAO.
   */
  abstract get coreAddress(): string

  /**
   * Proposal modules for the DAO.
   */
  get proposalModules(): readonly IProposalModuleBase[] {
    return []
  }

  /**
   * Voting module for the DAO.
   */
  get votingModule(): IVotingModuleBase {
    throw new Error('Not implemented')
  }

  /**
   * Get the proposal module with the given address.
   */
  getProposalModule(address: string): IProposalModuleBase | undefined {
    return this.proposalModules.find(
      (module) => module.info.address === address
    )
  }

  /**
   * Query options to fetch the voting power for a given address. Optionally
   * specify a block height. If undefined, the latest block height will be used.
   * If address is undefined, will return query in loading state.
   */
  abstract getVotingPowerQuery(
    address?: string,
    height?: number
  ): FetchQueryOptions<VotingPowerAtHeightResponse>

  /**
   * Fetch the voting power for a given address. Optionally specify a block
   * height. If undefined, the latest block height will be used.
   */
  async getVotingPower(
    ...params: Parameters<IDaoBase['getVotingPowerQuery']>
  ): Promise<string> {
    return (
      await this.queryClient.fetchQuery(this.getVotingPowerQuery(...params))
    ).power
  }

  /**
   * Query options to fetch the total voting power. Optionally specify a block
   * height. If undefined, the latest block height will be used.
   */
  abstract getTotalVotingPowerQuery(
    height?: number
  ): FetchQueryOptions<TotalPowerAtHeightResponse>

  /**
   * Fetch the total voting power. Optional specify a block height. If
   * undefined, the latest block height will be used.
   */
  async getTotalVotingPower(
    ...params: Parameters<IDaoBase['getTotalVotingPowerQuery']>
  ): Promise<string> {
    return (
      await this.queryClient.fetchQuery(
        this.getTotalVotingPowerQuery(...params)
      )
    ).power
  }
}
