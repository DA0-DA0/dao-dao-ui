import { FetchQueryOptions, skipToken } from '@tanstack/react-query'

import { secretDaoVotingSnip20StakedQueries } from '@dao-dao/state/query'
import { SecretModuleInstantiateInfo } from '@dao-dao/types'
import {
  ActiveThreshold,
  InitialBalance,
  InstantiateMsg,
  TotalPowerAtHeightResponse,
  VotingPowerAtHeightResponse,
} from '@dao-dao/types/contracts/SecretDaoVotingSnip20Staked'
import {
  DAO_VOTING_CW20_STAKED_CONTRACT_NAMES,
  encodeJsonToBase64,
  mustGetSupportedChainConfig,
} from '@dao-dao/utils'

import { SecretCwDao } from '../dao'
import { VotingModuleBase } from './base'

export class SecretSnip20StakedVotingModule extends VotingModuleBase<SecretCwDao> {
  static contractNames: readonly string[] =
    DAO_VOTING_CW20_STAKED_CONTRACT_NAMES

  /**
   * Generate the module instantiate info to plug into the DAO instantiate info
   * generator function.
   */
  static generateModuleInstantiateInfo(
    chainId: string,
    daoName: string,
    config: {
      activeThreshold?: ActiveThreshold
      token:
        | {
            /**
             * Use an existing cw20 token.
             */
            existing: {
              address: string
              codeHash: string
              stakingContract:
                | {
                    /**
                     * Use an existing cw20 staking contract.
                     */
                    existing: {
                      address: string
                      codeHash: string
                    }
                  }
                | {
                    /**
                     * Create a new cw20 staking contract.
                     */
                    new: {
                      unstakingDuration?: Duration
                    }
                  }
            }
          }
        | {
            /**
             * Create a new cw20 token.
             */
            new: {
              symbol: string
              decimals: number
              name: string
              unstakingDuration?: Duration
              initialBalances: InitialBalance[]
              initialDaoBalance?: string
            }
          }
    }
  ): SecretModuleInstantiateInfo {
    const { codeIds, codeHashes } = mustGetSupportedChainConfig(chainId)
    if (
      !codeHashes ||
      !codeIds.DaoVotingCw20Staked ||
      !codeHashes.DaoVotingCw20Staked ||
      ((('existing' in config.token &&
        'new' in config.token.existing.stakingContract) ||
        'new' in config.token) &&
        (!codeIds.Cw20Stake || !codeHashes.Cw20Stake)) ||
      ('new' in config.token && (!codeIds.Cw20Base || !codeHashes.Cw20Base))
    ) {
      throw new Error('Codes not configured for chain ' + chainId)
    }

    return {
      admin: { core_module: {} },
      code_id: codeIds.DaoVotingCw20Staked,
      code_hash: codeHashes.DaoVotingCw20Staked,
      label: `DAO_${daoName}_snip20-staked`,
      msg: encodeJsonToBase64({
        active_threshold: config.activeThreshold,
        dao_code_hash: codeHashes.DaoCore,
        token_info:
          'existing' in config.token
            ? {
                existing: {
                  address: config.token.existing.address,
                  code_hash: config.token.existing.codeHash,
                  staking_contract:
                    'existing' in config.token.existing.stakingContract
                      ? {
                          existing: {
                            staking_contract_address:
                              config.token.existing.stakingContract.existing
                                .address,
                            staking_contract_code_hash:
                              config.token.existing.stakingContract.existing
                                .codeHash,
                          },
                        }
                      : {
                          new: {
                            label: `DAO_${daoName}_snip20-stake`,
                            // Type-checked above.
                            staking_code_hash: codeHashes.Cw20Stake!,
                            // Type-checked above.
                            staking_code_id: codeIds.Cw20Stake!,
                            unstaking_duration:
                              config.token.existing.stakingContract.new
                                .unstakingDuration,
                          },
                        },
                },
              }
            : {
                new: {
                  // Type-checked above.
                  code_hash: codeHashes.Cw20Base!,
                  // Type-checked above.
                  code_id: codeIds.Cw20Base!,
                  decimals: config.token.new.decimals,
                  initial_balances: config.token.new.initialBalances,
                  initial_dao_balance: config.token.new.initialDaoBalance,
                  label: config.token.new.name,
                  name: config.token.new.name,
                  // Type-checked above.
                  staking_code_hash: codeHashes.Cw20Stake!,
                  // Type-checked above.
                  staking_code_id: codeIds.Cw20Stake!,
                  symbol: config.token.new.symbol,
                  unstaking_duration: config.token.new.unstakingDuration,
                },
              },
      } as InstantiateMsg),
      funds: [],
    }
  }

  getVotingPowerQuery(
    address?: string,
    height?: number
  ): FetchQueryOptions<VotingPowerAtHeightResponse> {
    // If no address nor permit, return query in loading state.
    const permit = address && this.dao.getExistingPermit(address)
    if (!permit) {
      return {
        queryKey: [],
        queryFn: skipToken,
      }
    }

    return secretDaoVotingSnip20StakedQueries.votingPowerAtHeight({
      chainId: this.dao.chainId,
      contractAddress: this.address,
      args: {
        auth: { permit },
        height,
      },
    })
  }

  async getVotingPower(
    address?: string,
    height?: number,
    /**
     * Whether or not to prompt the wallet for a permit. If true,
     * `dao.registerOfflineSignerAminoGetter` must be called first.
     *
     * Defaults to false.
     */
    prompt = false
  ): Promise<string> {
    if (prompt && address) {
      // Load permit now which will be retrieved in getVotingPowerQuery.
      await this.dao.getPermit(address)
    }

    return (
      await this.queryClient.fetchQuery(
        this.getVotingPowerQuery(address, height)
      )
    ).power
  }

  getTotalVotingPowerQuery(
    height?: number
  ): FetchQueryOptions<TotalPowerAtHeightResponse> {
    return secretDaoVotingSnip20StakedQueries.totalPowerAtHeight({
      chainId: this.dao.chainId,
      contractAddress: this.address,
      args: {
        height,
      },
    })
  }
}
