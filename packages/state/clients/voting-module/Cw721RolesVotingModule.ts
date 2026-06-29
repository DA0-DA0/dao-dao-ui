import {
  UndefinedInitialDataOptions,
  UnusedSkipTokenOptions,
  queryOptions,
  skipToken,
} from '@tanstack/react-query'

import { GenericToken, ModuleInstantiateInfo, TokenType } from '@dao-dao/types'
import {
  DAO_VOTING_CW721_ROLES_CONTRACT_NAMES,
  encodeJsonToBase64,
  getCosmWasmClientForChainId,
  mustGetSupportedChainConfig,
} from '@dao-dao/utils'

import { cw721BaseQueries } from '../../query'
import { CwDao } from '../dao/CwDao'
import { VotingModuleBase } from './base'

type Cw721RolesInitialNft = {
  owner: string
  token_id: string
  token_uri?: string | null
  extension: {
    role?: string | null
    weight: number | string
  }
}

type InstantiateMsg = {
  nft_contract:
    | {
        existing: {
          address: string
        }
      }
    | {
        new: {
          code_id: number
          label: string
          name: string
          symbol: string
          initial_nfts: Cw721RolesInitialNft[]
          salt?: string | null
        }
      }
}

type ConfigResponse = {
  nft_address: string
}

type VotingPowerAtHeightResponse = {
  power: string
  height: number
}

type TotalPowerAtHeightResponse = {
  power: string
  height: number
}

const queryDaoVotingCw721Roles = async <Response>(
  chainId: string,
  contractAddress: string,
  query: Record<string, unknown>
): Promise<Response> =>
  (await getCosmWasmClientForChainId(chainId)).queryContractSmart(
    contractAddress,
    query
  )

export class Cw721RolesVotingModule extends VotingModuleBase<CwDao> {
  static contractNames: readonly string[] =
    DAO_VOTING_CW721_ROLES_CONTRACT_NAMES

  /**
   * Generate the module instantiate info to plug into the DAO instantiate info
   * generator function.
   */
  static generateModuleInstantiateInfo(
    chainId: string,
    config: {
      nft:
        | {
            /**
             * Use an existing cw721-roles collection.
             */
            existing: {
              address: string
            }
          }
        | {
            /**
             * Create a new cw721-roles collection.
             */
            new: {
              name: string
              symbol: string
              initialNfts: Cw721RolesInitialNft[]
              salt?: string | null
            }
          }
    }
  ): ModuleInstantiateInfo {
    const { codeIds } = mustGetSupportedChainConfig(chainId)
    if (!codeIds.DaoVotingCw721Roles) {
      throw new Error(
        'DaoVotingCw721Roles code ID not configured for chain ' + chainId
      )
    }
    if ('new' in config.nft && !codeIds.Cw721Roles) {
      throw new Error('Cw721Roles code ID not configured for chain ' + chainId)
    }

    return {
      admin: { core_module: {} },
      code_id: codeIds.DaoVotingCw721Roles,
      label: `dao-voting-cw721-roles_${Date.now()}`,
      msg: encodeJsonToBase64({
        nft_contract:
          'existing' in config.nft
            ? {
                existing: {
                  address: config.nft.existing.address,
                },
              }
            : {
                new: {
                  // Type-checked above.
                  code_id: codeIds.Cw721Roles!,
                  initial_nfts: config.nft.new.initialNfts,
                  label: config.nft.new.name,
                  name: config.nft.new.name,
                  salt: config.nft.new.salt,
                  symbol: config.nft.new.symbol,
                },
              },
      } as InstantiateMsg),
      funds: [],
    }
  }

  getVotingPowerQuery(
    address?: string,
    height?: number
  ): UndefinedInitialDataOptions<VotingPowerAtHeightResponse> {
    // If no address, return query in loading state.
    if (!address) {
      return {
        queryKey: [],
        queryFn: skipToken,
      }
    }

    return queryOptions<VotingPowerAtHeightResponse>({
      queryKey: [
        'cw721RolesVotingModule',
        'votingPowerAtHeight',
        {
          chainId: this.chainId,
          address: this.address,
          args: { address, height },
        },
      ],
      queryFn: () =>
        queryDaoVotingCw721Roles<VotingPowerAtHeightResponse>(
          this.chainId,
          this.address,
          {
            voting_power_at_height: {
              address,
              height,
            },
          }
        ),
    })
  }

  getTotalVotingPowerQuery(
    height?: number
  ): UndefinedInitialDataOptions<TotalPowerAtHeightResponse> {
    return queryOptions<TotalPowerAtHeightResponse>({
      queryKey: [
        'cw721RolesVotingModule',
        'totalPowerAtHeight',
        {
          chainId: this.chainId,
          address: this.address,
          args: { height },
        },
      ],
      queryFn: () =>
        queryDaoVotingCw721Roles<TotalPowerAtHeightResponse>(
          this.chainId,
          this.address,
          {
            total_power_at_height: {
              height,
            },
          }
        ),
    })
  }

  getGovernanceTokenQuery = (): UnusedSkipTokenOptions<GenericToken> => {
    return {
      queryKey: [
        'cw721RolesVotingModule',
        'governanceToken',
        {
          chainId: this.chainId,
          address: this.address,
        },
      ],
      queryFn: async (ctx) => {
        const { nft_address: collectionAddress } =
          await queryDaoVotingCw721Roles<ConfigResponse>(
            this.chainId,
            this.address,
            {
              config: {},
            }
          )

        const contractInfo = await ctx.client.fetchQuery(
          cw721BaseQueries.contractInfo({
            chainId: this.chainId,
            contractAddress: collectionAddress,
          })
        )

        return {
          chainId: this.chainId,
          type: TokenType.Cw721,
          denomOrAddress: collectionAddress,
          symbol: contractInfo.symbol,
          decimals: 0,
          source: {
            chainId: this.chainId,
            type: TokenType.Cw721,
            denomOrAddress: collectionAddress,
          },
        }
      },
    }
  }

  getHookCaller(): string {
    return this.address
  }

  async getHooks(): Promise<string[]> {
    // TODO(cw721-roles): wire this to generated dao-voting-cw721-roles hook
    // queries if/when the contract exposes voting-power hook management.
    return []
  }
}
