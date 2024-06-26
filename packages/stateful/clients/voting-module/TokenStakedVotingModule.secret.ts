import { FetchQueryOptions, skipToken } from '@tanstack/react-query'

import { secretDaoVotingTokenStakedQueries } from '@dao-dao/state/query'
import {
  TotalPowerAtHeightResponse,
  VotingPowerAtHeightResponse,
} from '@dao-dao/types/contracts/DaoVotingCw4'
import { DAO_VOTING_TOKEN_STAKED_CONTRACT_NAMES } from '@dao-dao/utils'

import { SecretCwDao } from '../dao'
import { VotingModuleBase } from './base'

export class SecretTokenStakedVotingModule extends VotingModuleBase<SecretCwDao> {
  static contractNames: readonly string[] =
    DAO_VOTING_TOKEN_STAKED_CONTRACT_NAMES

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

    return secretDaoVotingTokenStakedQueries.votingPowerAtHeight({
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
    return secretDaoVotingTokenStakedQueries.totalPowerAtHeight({
      chainId: this.dao.chainId,
      contractAddress: this.address,
      args: {
        height,
      },
    })
  }
}
