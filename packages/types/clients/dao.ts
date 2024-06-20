import { Chain } from '@chain-registry/types'
import { QueryClient } from '@tanstack/react-query'

import { DaoInfo } from '../dao'
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
  get proposalModules(): readonly ProposalModuleBase[] {
    return []
  }

  /**
   * Get the proposal module with the given address.
   */
  getProposalModule(address: string): ProposalModuleBase | undefined {
    return this.proposalModules.find(
      (module) => module.info.address === address
    )
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
