import {
  UndefinedInitialDataOptions,
  UnusedSkipTokenOptions,
  skipToken,
} from '@tanstack/react-query'

import { GenericToken, TokenType } from '@dao-dao/types'
import {
  TotalPowerAtHeightResponse,
  VotingPowerAtHeightResponse,
} from '@dao-dao/types/contracts/DaoVotingNativeStaked'
import { DAO_VOTING_NATIVE_STAKED_CONTRACT_NAMES } from '@dao-dao/utils'

import { daoVotingNativeStakedQueries, tokenQueries } from '../../query'
import { CwDao } from '../dao/CwDao'
import { VotingModuleBase } from './base'

export class NativeStakedVotingModule extends VotingModuleBase<CwDao> {
  static contractNames: readonly string[] =
    DAO_VOTING_NATIVE_STAKED_CONTRACT_NAMES

  /**
   * Generate the module instantiate info to plug into the DAO instantiate info
   * generator function.
   *
   * @deprecated Use `TokenStakedVotingModule` instead.
   */
  static generateModuleInstantiateInfo() {
    throw new Error('Deprecated. Use TokenStakedVotingModule instead.')
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

    return daoVotingNativeStakedQueries.votingPowerAtHeight({
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
    return daoVotingNativeStakedQueries.totalPowerAtHeight({
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
        'nativeStakedVotingModule',
        'governanceToken',
        {
          chainId: this.chainId,
          address: this.address,
        },
      ],
      queryFn: async (ctx) => {
        const { denom } = await ctx.client.fetchQuery(
          daoVotingNativeStakedQueries.getConfig({
            chainId: this.chainId,
            contractAddress: this.address,
          })
        )

        const token = await ctx.client.fetchQuery(
          tokenQueries.info({
            chainId: this.chainId,
            type: TokenType.Native,
            denomOrAddress: denom,
          })
        )

        return token
      },
    }
  }

  getHookCaller(): string {
    return this.address
  }

  getHooks(): Promise<string[]> {
    throw new Error('Not implemented')
  }
}
