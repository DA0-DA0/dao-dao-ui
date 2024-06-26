import { FetchQueryOptions, skipToken } from '@tanstack/react-query'

import { daoVotingCw4Queries } from '@dao-dao/state/query'
import {
  TotalPowerAtHeightResponse,
  VotingPowerAtHeightResponse,
} from '@dao-dao/types/contracts/DaoVotingCw4'
import { DAO_VOTING_CW4_CONTRACT_NAMES } from '@dao-dao/utils'

import { CwDao } from '../dao/CwDao'
import { VotingModuleBase } from './base'

export class Cw4VotingModule extends VotingModuleBase<CwDao> {
  static contractNames: readonly string[] = DAO_VOTING_CW4_CONTRACT_NAMES

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

    return daoVotingCw4Queries.votingPowerAtHeight({
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
    return daoVotingCw4Queries.totalPowerAtHeight({
      chainId: this.dao.chainId,
      contractAddress: this.address,
      args: {
        height,
      },
    })
  }
}
