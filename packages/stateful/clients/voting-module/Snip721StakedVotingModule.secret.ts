import { FetchQueryOptions, skipToken } from '@tanstack/react-query'

import { secretDaoVotingSnip721StakedQueries } from '@dao-dao/state/query'
import { SecretModuleInstantiateInfo } from '@dao-dao/types'
import {
  ActiveThreshold,
  Duration,
  InstantiateMsg,
  TotalPowerAtHeightResponse,
  VotingPowerAtHeightResponse,
} from '@dao-dao/types/contracts/SecretDaoVotingSnip721Staked'
import {
  DAO_VOTING_CW721_STAKED_CONTRACT_NAMES,
  encodeJsonToBase64,
  mustGetSupportedChainConfig,
} from '@dao-dao/utils'

import { SecretCwDao } from '../dao'
import { VotingModuleBase } from './base'

export class SecretSnip721StakedVotingModule extends VotingModuleBase<SecretCwDao> {
  static contractNames: readonly string[] =
    DAO_VOTING_CW721_STAKED_CONTRACT_NAMES

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
      nft: {
        /**
         * Use an existing cw721 collection.
         */
        existing: {
          address: string
          codeHash: string
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
      code_id: codeIds.DaoVotingCw721Staked,
      code_hash: codeHashes.DaoVotingCw721Staked,
      label: `DAO_${daoName.trim()}_snip721-staked`,
      msg: encodeJsonToBase64({
        active_threshold: config.activeThreshold,
        dao_code_hash: codeHashes.DaoCore,
        nft_contract: {
          existing: {
            address: config.nft.existing.address,
            code_hash: config.nft.existing.codeHash,
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

    return secretDaoVotingSnip721StakedQueries.votingPowerAtHeight({
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
     * `dao.registerSignAmino` must be called first.
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
    return secretDaoVotingSnip721StakedQueries.totalPowerAtHeight({
      chainId: this.dao.chainId,
      contractAddress: this.address,
      args: {
        height,
      },
    })
  }
}
