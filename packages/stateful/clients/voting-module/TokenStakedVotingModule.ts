import { FetchQueryOptions, skipToken } from '@tanstack/react-query'

import { daoVotingTokenStakedQueries } from '@dao-dao/state/query'
import {
  TotalPowerAtHeightResponse,
  VotingPowerAtHeightResponse,
} from '@dao-dao/types/contracts/DaoVotingTokenStaked'
import { DAO_VOTING_TOKEN_STAKED_CONTRACT_NAMES } from '@dao-dao/utils'

import { CwDao } from '../dao/CwDao'
import { VotingModuleBase } from './base'

export class TokenStakedVotingModule extends VotingModuleBase<CwDao> {
  static contractNames: readonly string[] =
    DAO_VOTING_TOKEN_STAKED_CONTRACT_NAMES

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
