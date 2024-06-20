import { QueryClient } from '@tanstack/react-query'

import { DaoInfo } from '@dao-dao/types'

import { ProposalModuleBase } from './proposal-module'

export abstract class DaoBase {
  protected readonly queryClient: QueryClient

  constructor(queryClient: QueryClient) {
    this.queryClient = queryClient
  }

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
   * Get the DAO info object.
   */
  abstract get info(): DaoInfo

  /**
   * Get the chain ID of the DAO.
   */
  abstract get chainId(): string

  /**
   * Get the core address of the DAO.
   */
  abstract get coreAddress(): string

  /**
   * Get the proposal modules for the DAO.
   */
  get proposalModules(): readonly ProposalModuleBase[] {
    return []
  }

  /**
   * Fetch the voting power for a given address. Optionally specify a block
   * height. If undefined, the latest block height will be used.
   */
  abstract getVotingPower(address: string, height?: number): Promise<string>

  /**
   * Fetch the total voting power. Optional specify a block height. If
   * undefined, the latest block height will be used.
   */
  abstract getTotalVotingPower(height?: number): Promise<string>
}
