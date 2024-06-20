import { secretDaoProposalMultipleQueries } from '@dao-dao/state/query'
import { ProposalModuleBase } from '@dao-dao/stateless'
import { VoteInfo } from '@dao-dao/types/contracts/SecretDaoProposalMultiple'
import { DAO_PROPOSAL_MULTIPLE_CONTRACT_NAMES } from '@dao-dao/utils'

import { SecretCwDao } from '../dao/SecretCwDao'

export class SecretMultipleChoiceProposalModule extends ProposalModuleBase<
  SecretCwDao,
  VoteInfo
> {
  static contractNames: readonly string[] = DAO_PROPOSAL_MULTIPLE_CONTRACT_NAMES

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
          secretDaoProposalMultipleQueries.getVote({
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
