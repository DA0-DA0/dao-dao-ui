import { FetchQueryOptions, skipToken } from '@tanstack/react-query'

import { daoVotingTokenStakedQueries } from '@dao-dao/state/query'
import { Coin, ModuleInstantiateInfo, WasmMsg } from '@dao-dao/types'
import {
  ActiveThreshold,
  Duration,
  InitialBalance,
  InstantiateMsg,
  TotalPowerAtHeightResponse,
  VotingPowerAtHeightResponse,
} from '@dao-dao/types/contracts/DaoVotingTokenStaked'
import {
  DAO_VOTING_TOKEN_STAKED_CONTRACT_NAMES,
  encodeJsonToBase64,
  mustGetSupportedChainConfig,
} from '@dao-dao/utils'

import { CwDao } from '../dao/CwDao'
import { VotingModuleBase } from './base'

export class TokenStakedVotingModule extends VotingModuleBase<CwDao> {
  static contractNames: readonly string[] =
    DAO_VOTING_TOKEN_STAKED_CONTRACT_NAMES

  /**
   * Generate the module instantiate info to plug into the DAO instantiate info
   * generator function.
   */
  static generateModuleInstantiateInfo(
    chainId: string,
    daoName: string,
    config: {
      activeThreshold?: ActiveThreshold
      unstakingDuration?: Duration
      token:
        | {
            /**
             * Use an existing native token, including IBC and token factory
             * tokens.
             */
            existing: {
              denom: string
            }
          }
        | {
            /**
             * Create a new native token, if token factory is supported.
             */
            new: {
              symbol: string
              decimals: number
              name: string
              initialBalances: InitialBalance[]
              initialDaoBalance?: string
              /**
               * Some chains have a token factory creation fee.
               */
              funds?: Coin[]
            }
          }
        | {
            /**
             * Use a trusted token factory contract.
             */
            factory: {
              address: string
              message: Record<string, unknown>
              funds?: Coin[]
            }
          }
    }
  ): ModuleInstantiateInfo {
    const { codeIds } = mustGetSupportedChainConfig(chainId)

    return {
      admin: { core_module: {} },
      code_id: codeIds.DaoVotingTokenStaked,
      label: `DAO_${daoName}_token-staked`,
      msg: encodeJsonToBase64({
        active_threshold: config.activeThreshold,
        token_info:
          'existing' in config.token
            ? {
                existing: {
                  denom: config.token.existing.denom,
                },
              }
            : 'new' in config.token
            ? {
                new: {
                  initial_balances: config.token.new.initialBalances,
                  initial_dao_balance: config.token.new.initialDaoBalance,
                  metadata: {
                    additional_denom_units: [
                      {
                        aliases: [],
                        denom: config.token.new.symbol,
                        exponent: config.token.new.decimals.toString(),
                      },
                    ],
                    description: `${daoName}'s Governance Token`,
                    display: config.token.new.symbol,
                    name: config.token.new.name,
                    symbol: config.token.new.symbol,
                  },
                  subdenom: config.token.new.symbol.toLowerCase(),
                  token_issuer_code_id: codeIds.CwTokenfactoryIssuerMain,
                },
              }
            : {
                factory: encodeJsonToBase64({
                  wasm: {
                    execute: {
                      contract_addr: config.token.factory.address,
                      funds: config.token.factory.funds || [],
                      msg: encodeJsonToBase64(config.token.factory.message),
                    },
                  } as WasmMsg,
                }),
              },
        unstaking_duration: config.unstakingDuration,
      } as InstantiateMsg),
      funds:
        ('new' in config.token && config.token.new.funds) ||
        ('factory' in config.token && config.token.factory.funds) ||
        [],
    }
  }

  getVotingPowerQuery(
    address?: string,
    height?: number
  ): FetchQueryOptions<VotingPowerAtHeightResponse> {
    // If no address, return query in loading state.
    if (!address) {
      return {
        queryKey: [],
        queryFn: skipToken,
      }
    }

    return daoVotingTokenStakedQueries.votingPowerAtHeight({
      chainId: this.dao.chainId,
      contractAddress: this.address,
      args: {
        address,
        height,
      },
    })
  }

  getTotalVotingPowerQuery(
    height?: number
  ): FetchQueryOptions<TotalPowerAtHeightResponse> {
    return daoVotingTokenStakedQueries.totalPowerAtHeight({
      chainId: this.dao.chainId,
      contractAddress: this.address,
      args: {
        height,
      },
    })
  }
}
