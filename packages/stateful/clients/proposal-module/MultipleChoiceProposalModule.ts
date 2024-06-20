import { daoProposalMultipleQueries } from '@dao-dao/state/query'
import { ProposalModuleBase } from '@dao-dao/types'
import { VoteInfo } from '@dao-dao/types/contracts/DaoProposalMultiple'
import { DAO_PROPOSAL_MULTIPLE_CONTRACT_NAMES } from '@dao-dao/utils'

import { CwDao } from '../dao/CwDao'

export class MultipleChoiceProposalModule extends ProposalModuleBase<
  CwDao,
  VoteInfo
> {
  static contractNames: readonly string[] = DAO_PROPOSAL_MULTIPLE_CONTRACT_NAMES

  async getVote(proposalId: number, address: string): Promise<VoteInfo | null> {
    return (
      (
        await this.queryClient.fetchQuery(
          daoProposalMultipleQueries.getVote({
            chainId: this.dao.chainId,
            contractAddress: this.info.address,
            args: {
              proposalId,
              voter: address,
            },
          })
        )
      ).vote || null
    )
  }
}
