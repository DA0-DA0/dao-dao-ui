import {
  cwProposalSingleV1Queries,
  daoProposalSingleV2Queries,
} from '@dao-dao/state/query'
import { ContractVersion, ProposalModuleBase } from '@dao-dao/types'
import { VoteInfo } from '@dao-dao/types/contracts/DaoProposalSingle.common'
import { DAO_PROPOSAL_SINGLE_CONTRACT_NAMES } from '@dao-dao/utils'

import { CwDao } from '../dao/CwDao'

export class SingleChoiceProposalModule extends ProposalModuleBase<
  CwDao,
  VoteInfo
> {
  static contractNames: readonly string[] = DAO_PROPOSAL_SINGLE_CONTRACT_NAMES

  async getVote(proposalId: number, address: string): Promise<VoteInfo | null> {
    const query =
      this.info.version === ContractVersion.V1
        ? cwProposalSingleV1Queries.vote
        : daoProposalSingleV2Queries.getVote

    return (
      (
        await this.queryClient.fetchQuery(
          query({
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
