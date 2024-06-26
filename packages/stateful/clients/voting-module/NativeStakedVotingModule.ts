import { FetchQueryOptions, skipToken } from '@tanstack/react-query'

import { daoVotingNativeStakedQueries } from '@dao-dao/state/query'
import {
  TotalPowerAtHeightResponse,
  VotingPowerAtHeightResponse,
} from '@dao-dao/types/contracts/DaoVotingNativeStaked'
import { DAO_VOTING_NATIVE_STAKED_CONTRACT_NAMES } from '@dao-dao/utils'

import { CwDao } from '../dao/CwDao'
import { VotingModuleBase } from './base'

export class NativeStakedVotingModule extends VotingModuleBase<CwDao> {
  static contractNames: readonly string[] =
    DAO_VOTING_NATIVE_STAKED_CONTRACT_NAMES

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

    return daoVotingNativeStakedQueries.votingPowerAtHeight({
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
    return daoVotingNativeStakedQueries.totalPowerAtHeight({
      chainId: this.dao.chainId,
      contractAddress: this.address,
      args: {
        height,
      },
    })
  }
}
