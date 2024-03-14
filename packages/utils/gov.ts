import {
  GOVERNANCE_PROPOSAL_TYPES,
  GovProposalDecodedContent,
  GovProposalVersion,
  GovProposalWithDecodedContent,
  GovernanceProposalActionData,
} from '@dao-dao/types'
import { Cosmos_govv1beta1Content_ToAmino } from '@dao-dao/types/protobuf/codegen/cosmos/gov/v1beta1/tx'

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
        title: proposal.title || proposal.legacyContent?.[0]?.title || '',
        description:
          proposal.description ||
          proposal.legacyContent?.[0]?.description ||
          '',
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
