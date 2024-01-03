import {
  VoteOption as CwVoteOption,
  GOVERNANCE_PROPOSAL_TYPES,
  GovProposalDecodedContent,
  GovProposalVersion,
  GovProposalWithDecodedContent,
  GovernanceProposalActionData,
} from '@dao-dao/types'

import { VoteOption as GovVoteOption } from './protobuf/codegen/cosmos/gov/v1/gov'
import { Cosmos_govv1beta1Content_ToAmino } from './protobuf/codegen/cosmos/gov/v1beta1/tx'

export const govProposalToDecodedContent = (
  proposal: GovProposalWithDecodedContent
): GovProposalDecodedContent =>
  proposal.version === GovProposalVersion.V1_BETA_1
    ? {
        version: proposal.version,
        title: proposal.title,
        description: proposal.description,
        decodedContent: proposal.decodedContent,
      }
    : {
        version: proposal.version,
        title: proposal.title,
        description: proposal.description,
        decodedMessages: proposal.decodedMessages,
        legacyContent: proposal.legacyContent,
      }

/**
 * Utility function to convert governance proposal action data to the decoded
 * proposal content type, which gracefully handles both v1beta1 and v1 gov
 * proposal types. This is used when rendering both existing governance
 * proposals and previewing new proposals before submitting.
 *
 * @param data Data from the governance proposal action.
 * @returns Decoded governance proposal content.
 */
export const govProposalActionDataToDecodedContent = (
  data: GovernanceProposalActionData
): GovProposalDecodedContent =>
  data.version === GovProposalVersion.V1_BETA_1 || data.useV1LegacyContent
    ? {
        version: GovProposalVersion.V1_BETA_1,
        title: data.title,
        description: data.description,
        decodedContent:
          // Decode if necessary.
          'value' in data.legacyContent &&
          data.legacyContent.value instanceof Uint8Array
            ? GOVERNANCE_PROPOSAL_TYPES.find(
                ({ typeUrl }) => typeUrl === data.legacyContent.typeUrl
              )?.fromProtoMsg(data.legacyContent) ||
              (Cosmos_govv1beta1Content_ToAmino(data.legacyContent) as any)
            : data.legacyContent,
      }
    : {
        version: data.version,
        title: data.title,
        description: data.description,
        decodedMessages: data.msgs,
        legacyContent: [],
      }

export const cwVoteOptionToGovVoteOption = (
  cwVote: CwVoteOption
): GovVoteOption =>
  cwVote === 'yes'
    ? GovVoteOption.VOTE_OPTION_YES
    : cwVote === 'no'
    ? GovVoteOption.VOTE_OPTION_NO
    : cwVote === 'abstain'
    ? GovVoteOption.VOTE_OPTION_ABSTAIN
    : cwVote === 'no_with_veto'
    ? GovVoteOption.VOTE_OPTION_NO_WITH_VETO
    : GovVoteOption.VOTE_OPTION_UNSPECIFIED

export const govVoteOptionToCwVoteOption = (
  govVote: GovVoteOption
): CwVoteOption => {
  const cwVote: CwVoteOption | undefined =
    govVote === GovVoteOption.VOTE_OPTION_YES
      ? 'yes'
      : govVote === GovVoteOption.VOTE_OPTION_NO
      ? 'no'
      : govVote === GovVoteOption.VOTE_OPTION_ABSTAIN
      ? 'abstain'
      : govVote === GovVoteOption.VOTE_OPTION_NO_WITH_VETO
      ? 'no_with_veto'
      : undefined
  if (!cwVote) {
    throw new Error('Invalid vote option')
  }

  return cwVote
}
