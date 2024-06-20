import { secretDaoProposalSingleQueries } from '@dao-dao/state/query'
import { ProposalModuleBase } from '@dao-dao/types'
import { VoteInfo } from '@dao-dao/types/contracts/SecretDaoProposalSingle'
import { DAO_PROPOSAL_SINGLE_CONTRACT_NAMES } from '@dao-dao/utils'

import { SecretCwDao } from '../dao/SecretCwDao'

export class SecretSingleChoiceProposalModule extends ProposalModuleBase<
  SecretCwDao,
  VoteInfo
> {
  static contractNames: readonly string[] = DAO_PROPOSAL_SINGLE_CONTRACT_NAMES

  async getVote(
    proposalId: number,
    address: string,
    /**
     * Whether or not to prompt the wallet for a permit. If true,
     * `dao.registerOfflineSignerAminoGetter` must be called first.
     *
     * Defaults to false.
     */
    prompt = false
  ): Promise<VoteInfo | null> {
    const permit = prompt
      ? await this.dao.getPermit(address)
      : this.dao.getExistingPermit(address)

    if (!permit) {
      throw new Error('No permit found')
    }

    return (
      (
        await this.queryClient.fetchQuery(
          secretDaoProposalSingleQueries.getVote({
            chainId: this.dao.chainId,
            contractAddress: this.info.address,
            args: {
              proposalId,
              auth: {
                permit,
              },
            },
          })
        )
      ).vote || null
    )
  }
}
