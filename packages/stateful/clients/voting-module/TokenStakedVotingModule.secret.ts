import { FetchQueryOptions, skipToken } from '@tanstack/react-query'

import { secretDaoVotingTokenStakedQueries } from '@dao-dao/state/query'
import { SecretModuleInstantiateInfo } from '@dao-dao/types'
import {
  ActiveThreshold,
  Duration,
  InstantiateMsg,
  TotalPowerAtHeightResponse,
  VotingPowerAtHeightResponse,
} from '@dao-dao/types/contracts/SecretDaoVotingTokenStaked'
import {
  DAO_VOTING_TOKEN_STAKED_CONTRACT_NAMES,
  encodeJsonToBase64,
  mustGetSupportedChainConfig,
} from '@dao-dao/utils'

import { SecretCwDao } from '../dao'
import { VotingModuleBase } from './base'

export class SecretTokenStakedVotingModule extends VotingModuleBase<SecretCwDao> {
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
      activeThreshold?: ActiveThreshold | null
      unstakingDuration?: Duration | null
      token: {
        /**
         * Use an existing native token, including IBC and token factory
         * tokens.
         */
        existing: {
          denom: string
        }
      }
    }
  ): SecretModuleInstantiateInfo {
    const { codeIds, codeHashes } = mustGetSupportedChainConfig(chainId)
    if (!codeHashes) {
      throw new Error('Codes not configured for chain ' + chainId)
    }

    return {
      admin: { core_module: {} },
      code_id: codeIds.DaoVotingTokenStaked,
      code_hash: codeHashes.DaoVotingTokenStaked,
      label: `DAO_${daoName}_token-staked`,
      msg: encodeJsonToBase64({
        active_threshold: config.activeThreshold,
        dao_code_hash: codeHashes.DaoCore,
        token_info: {
          existing: {
            denom: config.token.existing.denom,
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
