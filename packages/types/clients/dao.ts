import { Chain } from '@chain-registry/types'
import { FetchQueryOptions } from '@tanstack/react-query'

import { Account } from '../account'
import { DaoCardLazyData } from '../components'
import {
  TotalPowerAtHeightResponse,
  VotingPowerAtHeightResponse,
} from '../contracts/DaoDaoCore'
import { DaoInfo, DaoSource } from '../dao'
import { ContractVersion } from '../features'
import { AmountWithTimestamp } from '../token'
import { IProposalModuleBase } from './proposal-module'
import { IVotingModuleBase } from './voting-module'

export interface IDaoBase {
  /**
   * DAO info object.
   */
  info: DaoInfo

  /**
   * Chain ID of the DAO.
   */
  chainId: string

  /**
   * Chain of the DAO.
   */
  chain: Chain

  /**
   * Core address of the DAO.
   */
  coreAddress: string

  /**
   * DAO source object.
   */
  source: DaoSource

  /**
   * Core contract version.
   */
  coreVersion: ContractVersion

  /**
   * Voting module for the DAO.
   */
  votingModule: IVotingModuleBase

  /**
   * Voting module for the DAO, or undefined if not implemented.
   */
  maybeVotingModule: IVotingModuleBase | undefined

  /**
   * Proposal modules for the DAO.
   */
  proposalModules: readonly IProposalModuleBase[]

  /**
   * DAO-controlled accounts.
   */
  accounts: readonly Account[]

  /**
   * DAO name.
   */
  name: string

  /**
   * DAO description.
   */
  description: string

  /**
   * DAO image URL.
   */
  imageUrl: string

  /**
   * Whether or not the client has been initialized. This only matters for some
   * functions, depending on the implementation.
   */
  initialized: boolean

  /**
   * Initialize the client. This only matters for some functions, depending on
   * the implementation.
   */
  init(): Promise<void>

  /**
   * Get the proposal module with the given address.
   */
  getProposalModule(address: string): IProposalModuleBase | undefined

  /**
   * Query options to fetch the voting power for a given address. Optionally
   * specify a block height. If undefined, the latest block height will be used.
   * If address is undefined, will return query in loading state.
   */
  getVotingPowerQuery(
    address?: string,
    height?: number
  ): Pick<
    FetchQueryOptions<VotingPowerAtHeightResponse>,
    'queryKey' | 'queryFn'
  >

  /**
   * Fetch the voting power for a given address. Optionally specify a block
   * height. If undefined, the latest block height will be used.
   */
  getVotingPower(address: string, height?: number): Promise<string>

  /**
   * Query options to fetch the total voting power. Optionally specify a block
   * height. If undefined, the latest block height will be used.
   */
  getTotalVotingPowerQuery(
    height?: number
  ): Pick<FetchQueryOptions<TotalPowerAtHeightResponse>, 'queryKey' | 'queryFn'>

  /**
   * Fetch the total voting power. Optional specify a block height. If
   * undefined, the latest block height will be used.
   */
  getTotalVotingPower(height?: number): Promise<string>

  /**
   * Fetch the lazy data for the DAO card.
   */
  getDaoCardLazyData(): Promise<DaoCardLazyData>

  /**
   * Fetch the number of proposals in the DAO.
   */
  getProposalCount(): Promise<number>

  /**
   * Query options to fetch the TVL.
   */
  tvlQuery: Pick<FetchQueryOptions<AmountWithTimestamp>, 'queryKey' | 'queryFn'>

  /**
   * Fetch the TVL.
   */
  getTvl(): Promise<AmountWithTimestamp>
}
