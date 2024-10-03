import { FetchQueryOptions } from '@tanstack/react-query'

import {
  TotalPowerAtHeightResponse,
  VotingPowerAtHeightResponse,
} from '../contracts/DaoDaoCore'
import { ContractVersion } from '../features'
import { GenericToken } from '../token'
import { IDaoBase } from './dao'

export interface IVotingModuleBase<Dao extends IDaoBase = IDaoBase> {
  /**
   * DAO this module belongs to.
   */
  dao: Dao

  /**
   * Chain ID of the voting module.
   */
  chainId: string

  /**
   * Address of the voting module.
   */
  address: string

  /**
   * Contract version.
   */
  version: ContractVersion

  /**
   * Contract name.
   */
  contractName: string

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
   * Fetch the total voting power. Optionally specify a block height. If
   * undefined, the latest block height will be used.
   */
  getTotalVotingPower(height?: number): Promise<string>

  /**
   * Query options to fetch the governance token used by this voting module. Not
   * all voting modules have a governance token.
   */
  getGovernanceTokenQuery?(): Pick<
    FetchQueryOptions<GenericToken>,
    'queryKey' | 'queryFn'
  >

  /**
   * Fetch the contract responsible for voting power change hooks. This may be
   * the voting module itself if it handles staking directly, or an underlying
   * contract that manages voting power, such as cw4-group or cw20-stake.
   */
  getHookCaller(): string | Promise<string>

  /**
   * Fetch the registered hooks.
   */
  getHooks(): Promise<string[]>
}
