import {
  UndefinedInitialDataOptions,
  UnusedSkipTokenOptions,
  skipToken,
} from '@tanstack/react-query'

import { GenericToken, ModuleInstantiateInfo, TokenType } from '@dao-dao/types'
import {
  ActiveThreshold,
  Duration,
  InstantiateMsg,
  TotalPowerAtHeightResponse,
  VotingPowerAtHeightResponse,
} from '@dao-dao/types/contracts/DaoVotingOnftStaked'
import {
  DAO_VOTING_ONFT_STAKED_CONTRACT_NAMES,
  encodeJsonToBase64,
  mustGetSupportedChainConfig,
} from '@dao-dao/utils'

import { daoVotingOnftStakedQueries, omniflixQueries } from '../../query'
import { CwDao } from '../dao/CwDao'
import { VotingModuleBase } from './base'

export class OnftStakedVotingModule extends VotingModuleBase<CwDao> {
  static contractNames: readonly string[] =
    DAO_VOTING_ONFT_STAKED_CONTRACT_NAMES

  /**
   * Generate the module instantiate info to plug into the DAO instantiate info
   * generator function.
   */
  static generateModuleInstantiateInfo(
    chainId: string,
    config: {
      activeThreshold?: ActiveThreshold | null
      unstakingDuration?: Duration | null
      onft: {
        /**
         * Use an existing ONFT collection.
         */
        existing: {
          id: string
        }
      }
    }
  ): ModuleInstantiateInfo {
    const { codeIds } = mustGetSupportedChainConfig(chainId)
    if (!codeIds.DaoVotingOnftStaked) {
      throw new Error('Codes not configured for chain ' + chainId)
    }

    return {
      admin: { core_module: {} },
      code_id: codeIds.DaoVotingOnftStaked,
      label: `dao-voting-onft-staked_${Date.now()}`,
      msg: encodeJsonToBase64({
        active_threshold: config.activeThreshold,
        onft_collection: {
          existing: {
            id: config.onft.existing.id,
          },
        },
        unstaking_duration: config.unstakingDuration,
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

    return daoVotingOnftStakedQueries.votingPowerAtHeight({
      chainId: this.chainId,
      contractAddress: this.address,
      args: {
        address,
        height,
      },
    })
  }

  getTotalVotingPowerQuery(
    height?: number
  ): UndefinedInitialDataOptions<TotalPowerAtHeightResponse> {
    return daoVotingOnftStakedQueries.totalPowerAtHeight({
      chainId: this.chainId,
      contractAddress: this.address,
      args: {
        height,
      },
    })
  }

  getGovernanceTokenQuery = (): UnusedSkipTokenOptions<GenericToken> => {
    return {
      queryKey: [
        'onftStakedVotingModule',
        'governanceToken',
        {
          chainId: this.chainId,
          address: this.address,
        },
      ],
      queryFn: async (ctx) => {
        const { onft_collection_id } = await ctx.client.fetchQuery(
          daoVotingOnftStakedQueries.config({
            chainId: this.chainId,
            contractAddress: this.address,
          })
        )

        const { symbol, previewUri } = await ctx.client.fetchQuery(
          omniflixQueries.onftCollectionInfo({
            chainId: this.chainId,
            id: onft_collection_id,
          })
        )

        return {
          chainId: this.chainId,
          type: TokenType.Onft,
          denomOrAddress: onft_collection_id,
          symbol,
          decimals: 0,
          imageUrl: previewUri,
          source: {
            chainId: this.chainId,
            type: TokenType.Onft,
            denomOrAddress: onft_collection_id,
          },
        }
      },
    }
  }

  getHookCaller(): string {
    return this.address
  }

  async getHooks(): Promise<string[]> {
    return (
      await this.queryClient.fetchQuery(
        daoVotingOnftStakedQueries.hooks({
          chainId: this.chainId,
          contractAddress: this.getHookCaller(),
        })
      )
    ).hooks
  }
}
