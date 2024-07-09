import { FetchQueryOptions } from '@tanstack/react-query'

import {
  TotalPowerAtHeightResponse,
  VotingPowerAtHeightResponse,
} from '../contracts/DaoDaoCore'
import { ContractVersion } from '../features'
import { IDaoBase } from './dao'

export interface IVotingModuleBase<Dao extends IDaoBase = IDaoBase> {
  /**
   * DAO this module belongs to.
   */
  dao: Dao

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
   * Fetch the total voting power. Optional specify a block height. If
   * undefined, the latest block height will be used.
   */
  getTotalVotingPower(height?: number): Promise<string>
}
