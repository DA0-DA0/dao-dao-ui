import { UndefinedInitialDataOptions } from '@tanstack/react-query'

import {
  Account,
  AmountWithTimestamp,
  AnyChain,
  ContractVersion,
  DaoCardLazyData,
  DaoInfo,
  DaoModule,
  DaoSource,
  Feature,
  IDaoBase,
  IProposalModuleBase,
  IQueryClient,
  IVotingModuleBase,
  ModuleId,
  ModuleType,
} from '@dao-dao/types'
import {
  TotalPowerAtHeightResponse,
  VotingPowerAtHeightResponse,
} from '@dao-dao/types/contracts/DaoDaoCore'
import {
  getFilteredDaoItemsByPrefix,
  getModuleStorageItemKey,
  isFeatureSupportedByVersion,
} from '@dao-dao/utils'

import { daoQueries } from '../../query'

export abstract class DaoBase implements IDaoBase {
  constructor(protected readonly queryClient: IQueryClient) {}

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
  abstract get chain(): AnyChain

  /**
   * Core address of the DAO.
   */
  abstract get coreAddress(): string

  /**
   * DAO proposal save local storage key.
   */
  abstract get proposalSaveLocalStorageKey(): string

  /**
   * DAO source object.
   */
  get source(): DaoSource {
    return {
      chainId: this.chainId,
      coreAddress: this.coreAddress,
    }
  }

  /**
   * Core contract version.
   */
  get coreVersion(): ContractVersion {
    return this.info.coreVersion
  }

  /**
   * Voting module for the DAO.
   */
  get votingModule(): IVotingModuleBase {
    throw new Error('Not implemented')
  }

  /**
   * Voting module for the DAO, or undefined if not implemented.
   */
  get maybeVotingModule(): IVotingModuleBase | undefined {
    try {
      return this.votingModule
    } catch {
      return undefined
    }
  }

  /**
   * Proposal modules for the DAO.
   */
  get proposalModules(): readonly IProposalModuleBase[] {
    return []
  }

  /**
   * DAO-controlled accounts.
   */
  get accounts(): readonly Account[] {
    return this.info.accounts
  }

  /**
   * DAO name.
   */
  get name(): string {
    return this.info.name
  }

  /**
   * DAO description.
   */
  get description(): string {
    return this.info.description
  }

  /**
   * DAO image URL.
   */
  get imageUrl(): string {
    return this.info.imageUrl
  }

  /**
   * DAO banner image URL.
   */
  get bannerImageUrl(): string | undefined {
    return this.info.items['banner']
  }

  /**
   * DAO modules.
   */
  get modules(): readonly DaoModule[] {
    const proposalModules = this.proposalModules.map(
      ({ contractName, address }) => ({
        id: contractName,
        type: ModuleType.Proposal,
        values: {
          address,
        },
      })
    )

    const externalModules = getFilteredDaoItemsByPrefix(
      this.info.items,
      getModuleStorageItemKey('')
    )
      .map(([id, moduleJson]): DaoModule | undefined => {
        try {
          return {
            id,
            type: ModuleType.External,
            values: (moduleJson && JSON.parse(moduleJson)) || {},
          }
        } catch (err) {
          // Ignore module format error but log to console for debugging.
          console.error(`Invalid module JSON: ${moduleJson}`, err)
          return
        }
      })
      // Validate module structure.
      .filter((module): module is DaoModule => !!module)

    return [...proposalModules, ...externalModules]
  }

  /**
   * Check whether or not the DAO supports a given feature.
   */
  supports(feature: Feature): boolean {
    return isFeatureSupportedByVersion(feature, this.coreVersion)
  }

  /**
   * Get the proposal module with the given address.
   */
  getProposalModule(address: string): IProposalModuleBase | undefined {
    return this.proposalModules.find((module) => module.address === address)
  }

  /**
   * Whether or not a module is enabled.
   */
  isModuleEnabled(id: ModuleId): boolean {
    return !!this.info.items[getModuleStorageItemKey(id)]
  }

  /**
   * Get the module with the given ID.
   */
  getModule<Variables extends Record<string, unknown> = any>(
    id: ModuleId | string
  ): DaoModule<Variables> | undefined {
    return this.modules.find((module) => module.id === id)
  }

  /**
   * Query options to fetch the voting power for a given address. Optionally
   * specify a block height. If undefined, the latest block height will be used.
   * If address is undefined, will return query in loading state.
   */
  abstract getVotingPowerQuery(
    address?: string,
    height?: number
  ): UndefinedInitialDataOptions<VotingPowerAtHeightResponse>

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
  ): UndefinedInitialDataOptions<TotalPowerAtHeightResponse>

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

  /**
   * Fetch the lazy data for the DAO card.
   */
  async getDaoCardLazyData(): Promise<DaoCardLazyData> {
    const [{ amount: tvl }, proposalCount] = await Promise.all([
      this.getTvl(),
      this.getProposalCount(),
    ])

    return {
      proposalCount,
      tokenWithBalance: {
        balance: tvl,
        symbol: 'USD',
        decimals: 2,
      },
    }
  }

  /**
   * Fetch the number of proposals in the DAO.
   */
  abstract getProposalCount(): Promise<number>

  /**
   * Query options to fetch the TVL.
   */
  get tvlQuery(): UndefinedInitialDataOptions<AmountWithTimestamp> {
    return daoQueries.tvl({
      chainId: this.chainId,
      coreAddress: this.coreAddress,
    })
  }

  /**
   * Fetch the TVL.
   */
  getTvl(): Promise<AmountWithTimestamp> {
    return this.queryClient.fetchQuery(this.tvlQuery)
  }
}
