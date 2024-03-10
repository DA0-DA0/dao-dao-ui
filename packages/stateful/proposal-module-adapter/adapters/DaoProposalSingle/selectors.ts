import { RecoilValueReadOnly, selectorFamily, waitForAll } from 'recoil'

import {
  DaoPreProposeApprovalSingleSelectors,
  DaoPreProposeApproverSelectors,
} from '@dao-dao/state'
import { PreProposeModuleType, WithChainId } from '@dao-dao/types'
import { Proposal as DaoPreProposeApprovalSingleProposal } from '@dao-dao/types/contracts/DaoPreProposeApprovalSingle'

import { daoCoreProposalModulesSelector } from '../../../recoil'

/**
 * Given the pre-propose approval ID of a pending proposal that has its approver
 * set to a pre-propose-approver contract, retrieve the automatically-created
 * proposal's ID in the approver's DAO.
 */
export const approverIdForPreProposeApprovalIdSelector = selectorFamily<
  string,
  WithChainId<{
    // From proposal module (should be a dao-pre-propose-approval-single
    // contract)
    preProposeAddress: string
    // From proposal module
    proposalNumber: number
    // Whether or not this proposal number refers to a pre-propose-approval
    // proposal (as opposed to a proposal that was already approved and can be
    // voted on).
    isPreProposeApprovalProposal: boolean
    // From PreProposeModuleApprovalConfig
    approver: string
    // From PreProposeModuleApprovalConfig
    preProposeApproverContract: string
  }>
>({
  key: 'daoProposalSingleApproverIdForPreProposeApprovalId',
  get:
    ({
      chainId,
      preProposeAddress,
      proposalNumber,
      isPreProposeApprovalProposal,
      approver,
      preProposeApproverContract,
    }) =>
    ({ get }) => {
      const preProposeApprovalNumber = isPreProposeApprovalProposal
        ? proposalNumber
        : get(
            // Get pre-propose proposal ID that was accepted to create this
            // proposal.
            DaoPreProposeApprovalSingleSelectors.queryExtensionSelector({
              chainId,
              contractAddress: preProposeAddress,
              params: [
                {
                  msg: {
                    completed_proposal_id_for_created_proposal_id: {
                      id: proposalNumber,
                    },
                  },
                },
              ],
            })
          )
      const [approverDaoProposalModules, approverProposalNumber] = get(
        waitForAll([
          // Get approver DAO's proposal modules to extract the prefix.
          daoCoreProposalModulesSelector({
            chainId,
            coreAddress: approver,
          }),
          // Get approver proposal ID that was created to approve this
          // pre-propose proposal.
          DaoPreProposeApproverSelectors.queryExtensionSelector({
            chainId,
            contractAddress: preProposeApproverContract,
            params: [
              {
                msg: {
                  approver_proposal_id_for_pre_propose_approval_id: {
                    id: preProposeApprovalNumber,
                  },
                },
              },
            ],
          }) as RecoilValueReadOnly<number>,
        ])
      )

      // Get prefix of proposal module with dao-pre-propose-approver attached
      // so we can link to the approver proposal.
      const approverDaoApproverProposalModulePrefix =
        approverDaoProposalModules.find(
          (approverDaoProposalModule) =>
            approverDaoProposalModule.prePropose?.type ===
              PreProposeModuleType.Approver &&
            approverDaoProposalModule.prePropose.address ===
              preProposeApproverContract
        )?.prefix

      // The approver proposal module will not be found if it was disabled, so
      // error since we can't determine the prefix.
      if (!approverDaoApproverProposalModulePrefix) {
        throw new Error(
          `failed to find approver proposal module for ${approver}`
        )
      }

      return `${approverDaoApproverProposalModulePrefix}${approverProposalNumber}`
    },
})

/**
 * Given an approver's proposal that approved a pre-propose approval proposal,
 * retrieve the approved (completed) pre-propose approval proposal ID.
 */
export const approvedIdForPreProposeApproverIdSelector = selectorFamily<
  string,
  WithChainId<{
    // From proposal module (should be a dao-pre-propose-approver contract)
    preProposeAddress: string
    // From proposal module
    proposalNumber: number
    // From PreProposeModuleApproverConfig
    approvalDao: string
    // From PreProposeModuleApprovalConfig
    preProposeApprovalContract: string
  }>
>({
  key: 'daoProposalSingleApprovedIdForPreProposeApproverId',
  get:
    ({
      chainId,
      preProposeAddress,
      proposalNumber,
      approvalDao,
      preProposeApprovalContract,
    }) =>
    ({ get }) => {
      const [approvalDaoProposalModules, approvalProposalNumber] = get(
        waitForAll([
          // Get approval DAO's proposal modules to extract the prefix.
          daoCoreProposalModulesSelector({
            chainId,
            coreAddress: approvalDao,
          }),
          // Get pre-propose-approval proposal ID that was approved by this
          // proposal.
          DaoPreProposeApproverSelectors.queryExtensionSelector({
            chainId,
            contractAddress: preProposeAddress,
            params: [
              {
                msg: {
                  pre_propose_approval_id_for_approver_proposal_id: {
                    id: proposalNumber,
                  },
                },
              },
            ],
          }) as RecoilValueReadOnly<number>,
        ])
      )

      // Get prefix of proposal module with dao-pre-propose-approval attached so
      // we can link to the created proposal.
      const approvalDaoApprovalProposalModulePrefix =
        approvalDaoProposalModules.find(
          (approvalDaoProposalModule) =>
            approvalDaoProposalModule.prePropose?.type ===
              PreProposeModuleType.Approval &&
            approvalDaoProposalModule.prePropose.address ===
              preProposeApprovalContract
        )?.prefix

      // The approval proposal module will not be found if it was disabled, so
      // error since we can't determine the prefix.
      if (!approvalDaoApprovalProposalModulePrefix) {
        throw new Error(
          `failed to find approval proposal module for ${approvalDao}`
        )
      }

      // Get completed pre-propose proposal ID so we can extract the created
      // proposal ID.
      const completedPreProposeApprovalProposal: DaoPreProposeApprovalSingleProposal =
        get(
          DaoPreProposeApprovalSingleSelectors.queryExtensionSelector({
            chainId,
            contractAddress: preProposeApprovalContract,
            params: [
              {
                msg: {
                  completed_proposal: {
                    id: approvalProposalNumber,
                  },
                },
              },
            ],
          })
        )

      // Should never happen if the passed in approver proposal ID was executed
      // and the proposal was created. Type-check for below.
      if (!('approved' in completedPreProposeApprovalProposal.status)) {
        throw new Error(
          `pre-propose approval proposal ${approvalProposalNumber} was not approved`
        )
      }

      return `${approvalDaoApprovalProposalModulePrefix}${completedPreProposeApprovalProposal.status.approved.created_proposal_id}`
    },
})
