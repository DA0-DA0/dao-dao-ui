import {
  CommonProposalInfo,
  IProposalModuleAdapterOptions,
} from '@dao-dao/types'
import { ProposalResponse } from '@dao-dao/types/contracts/DaoProposalMultiple'
import { getCosmWasmClientForChainId } from '@dao-dao/utils'

export const makeGetProposalInfo =
  ({
    chain: { chainId },
    proposalModule,
    proposalNumber,
    isApprovalProposal,
  }: IProposalModuleAdapterOptions) =>
  async (): Promise<CommonProposalInfo | undefined> => {
    // Get pre-propose approval proposal from pre propose module.
    if (isApprovalProposal && proposalModule.prePropose) {
      const approvalProposal = await proposalModule.getApprovalProposal({
        proposalId: proposalNumber,
      })

      if (!approvalProposal) {
        return
      }

      return {
        id: `${proposalModule.prefix}*${approvalProposal.approval_id}`,
        title: approvalProposal.msg.title,
        description: approvalProposal.msg.description,
        expiration: null,
        createdAtEpoch: approvalProposal.createdAt
          ? new Date(approvalProposal.createdAt).getTime()
          : null,
        createdByAddress: approvalProposal.proposer,
      }
    }

    let proposalResponse: ProposalResponse | undefined
    try {
      proposalResponse = await proposalModule.getProposal({
        proposalId: proposalNumber,
      })
    } catch (err) {
      // If proposal doesn't exist, handle just return undefined instead of
      // throwing an error. Rethrow all other errors.
      if (
        !(err instanceof Error) ||
        !err.message.includes('Proposal not found')
      ) {
        throw err
      }

      console.error(err)
    }

    if (!proposalResponse) {
      return
    }

    const { id, proposal, createdAt } = proposalResponse

    let createdAtEpoch: number | null = createdAt ? Date.parse(createdAt) : null
    // If indexer fails, fallback to querying block info from chain.
    if (!createdAtEpoch) {
      try {
        createdAtEpoch = new Date(
          (
            await (
              await getCosmWasmClientForChainId(chainId)
            ).getBlock(proposal.start_height)
          ).header.time
        ).getTime()
      } catch (err) {
        // Ignore error.
        console.error(err)
      }
    }

    return {
      id: `${proposalModule.prefix}${id}`,
      title: proposal.title,
      description: proposal.description,
      expiration: proposal.expiration,
      createdAtEpoch,
      createdByAddress: proposal.proposer,
    }
  }
