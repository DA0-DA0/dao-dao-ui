import { useTranslation } from 'react-i18next'
import TimeAgo from 'react-timeago'

import {
  DaoPreProposeApprovalSingleSelectors,
  DaoPreProposeApproverSelectors,
  DaoProposalSingleCommonSelectors,
  blockHeightSelector,
  blocksPerYearSelector,
} from '@dao-dao/state'
import {
  useCachedLoadable,
  useCachedLoading,
  useTranslatedTimeDeltaFormatter,
} from '@dao-dao/stateless'
import {
  Feature,
  LoadingData,
  PreProposeModuleType,
  ProposalStatusEnum,
  ProposalTimestampInfo,
} from '@dao-dao/types'
import { Proposal as DaoPreProposeApprovalSingleProposal } from '@dao-dao/types/contracts/DaoPreProposeApprovalSingle'
import {
  convertExpirationToDate,
  formatDate,
  formatDateTimeTz,
  isFeatureSupportedByVersion,
} from '@dao-dao/utils'

import { daoCoreProposalModulesSelector } from '../../../../recoil'
import { useProposalModuleAdapterOptions } from '../../../react'
import { ProposalWithMetadata } from '../types'

// Returns a proposal wrapped in a LoadingData object to allow the UI to respond
// to its loading state.
export const useLoadingProposal = (): LoadingData<ProposalWithMetadata> => {
  const { t } = useTranslation()
  const {
    proposalModule: { address: proposalModuleAddress, version, prePropose },
    proposalNumber,
    chain: { chain_id: chainId },
  } = useProposalModuleAdapterOptions()

  const loadingProposalResponse = useCachedLoading(
    DaoProposalSingleCommonSelectors.proposalSelector({
      contractAddress: proposalModuleAddress,
      chainId,
      params: [
        {
          proposalId: proposalNumber,
        },
      ],
    }),
    undefined,
    (err) => console.error(err)
  )

  const timeAgoFormatter = useTranslatedTimeDeltaFormatter({ words: false })

  const blocksPerYearLoadable = useCachedLoadable(
    blocksPerYearSelector({
      chainId,
    })
  )
  const blockHeightLoadable = useCachedLoadable(
    blockHeightSelector({
      chainId,
    })
  )

  // TODO(approver): turn this into one selector
  //! If this is proposal was approved by another proposal via the
  //! pre-propose-approver setup.
  const usesApprover =
    prePropose?.type === PreProposeModuleType.Approval &&
    !!prePropose.config.preProposeApproverContract
  const approverDaoProposalModules = useCachedLoading(
    usesApprover
      ? daoCoreProposalModulesSelector({
          chainId,
          coreAddress: prePropose.config.approver,
        })
      : undefined,
    undefined
  )
  // Get prefix of proposal module with dao-pre-propose-approver attached so
  // we can link to the approver proposal.
  const approverDaoApproverProposalModulePrefix =
    approverDaoProposalModules.loading || !usesApprover
      ? undefined
      : approverDaoProposalModules.data?.find(
          (approverDaoProposalModule) =>
            approverDaoProposalModule.prePropose?.type ===
              PreProposeModuleType.Approver &&
            approverDaoProposalModule.prePropose.address ===
              prePropose.config.preProposeApproverContract
        )?.prefix
  // Get pre-propose proposal ID that was accepted to create this proposal.
  const preProposeApprovalProposalId = useCachedLoading(
    usesApprover
      ? DaoPreProposeApprovalSingleSelectors.queryExtensionSelector({
          chainId,
          contractAddress: prePropose.address,
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
      : undefined,
    undefined
  ) as LoadingData<number | undefined>
  // Get approver proposal ID that was created to approve the pre-propose
  // proposal.
  const approverProposalNumber = useCachedLoading(
    usesApprover &&
      prePropose.config.preProposeApproverContract &&
      !preProposeApprovalProposalId.loading &&
      preProposeApprovalProposalId.data
      ? DaoPreProposeApproverSelectors.queryExtensionSelector({
          chainId,
          contractAddress: prePropose.config.preProposeApproverContract,
          params: [
            {
              msg: {
                approver_proposal_id_for_pre_propose_approval_id: {
                  id: preProposeApprovalProposalId.data,
                },
              },
            },
          ],
        })
      : undefined,
    undefined
  ) as LoadingData<number | undefined>
  const approverProposalId =
    approverDaoApproverProposalModulePrefix &&
    !approverProposalNumber.loading &&
    approverProposalNumber.data
      ? `${approverDaoApproverProposalModulePrefix}${approverProposalNumber.data}`
      : undefined

  // TODO(approver): turn this into one selector
  //! If this is an approver proposal that approved another proposal.
  const approvedAnotherProposal =
    prePropose?.type === PreProposeModuleType.Approver &&
    !loadingProposalResponse.loading &&
    loadingProposalResponse.data?.proposal.status ===
      ProposalStatusEnum.Executed
  const approvalDaoProposalModules = useCachedLoading(
    approvedAnotherProposal
      ? daoCoreProposalModulesSelector({
          chainId,
          coreAddress: prePropose.config.approvalDao,
        })
      : undefined,
    undefined
  )
  // Get prefix of proposal module with dao-pre-propose-approval attached so we
  // can link to the created proposal.
  const approvalDaoApprovalProposalModulePrefix =
    approvalDaoProposalModules.loading || !approvedAnotherProposal
      ? undefined
      : approvalDaoProposalModules.data?.find(
          (approvalDaoProposalModule) =>
            approvalDaoProposalModule.prePropose?.type ===
              PreProposeModuleType.Approval &&
            approvalDaoProposalModule.prePropose.address ===
              prePropose.config.preProposeApprovalContract
        )?.prefix
  // Get pre-propose-approval proposal ID that was approved by this proposal.
  const approvalProposalNumber = useCachedLoading(
    approvedAnotherProposal
      ? DaoPreProposeApproverSelectors.queryExtensionSelector({
          chainId,
          contractAddress: prePropose.address,
          params: [
            {
              msg: {
                pre_propose_approval_id_for_approver_proposal_id: {
                  id: proposalNumber,
                },
              },
            },
          ],
        })
      : undefined,
    undefined
  ) as LoadingData<number | undefined>
  // Get completed pre-propose proposal ID so we can extract the created
  // proposal ID.
  const completedPreProposeApprovalProposal = useCachedLoading(
    approvedAnotherProposal &&
      !approvalProposalNumber.loading &&
      approvalProposalNumber.data
      ? DaoPreProposeApprovalSingleSelectors.queryExtensionSelector({
          chainId,
          contractAddress: prePropose.config.preProposeApprovalContract,
          params: [
            {
              msg: {
                completed_proposal: {
                  id: approvalProposalNumber.data,
                },
              },
            },
          ],
        })
      : undefined,
    undefined
  ) as LoadingData<DaoPreProposeApprovalSingleProposal | undefined>
  const approvedProposalId =
    approvalDaoApprovalProposalModulePrefix &&
    !completedPreProposeApprovalProposal.loading &&
    completedPreProposeApprovalProposal.data &&
    'approved' in completedPreProposeApprovalProposal.data.status
      ? `${approvalDaoApprovalProposalModulePrefix}${completedPreProposeApprovalProposal.data.status.approved.created_proposal_id}`
      : undefined

  if (
    loadingProposalResponse.loading ||
    !loadingProposalResponse.data ||
    blocksPerYearLoadable.state !== 'hasValue' ||
    blockHeightLoadable.state !== 'hasValue' ||
    (usesApprover && !approverProposalId) ||
    (approvedAnotherProposal && !approvedProposalId)
  ) {
    return { loading: true }
  }

  // Indexer may provide dates.
  const { proposal, completedAt, executedAt, closedAt } =
    loadingProposalResponse.data

  const expirationDate = convertExpirationToDate(
    blocksPerYearLoadable.contents,
    proposal.expiration,
    blockHeightLoadable.contents
  )

  const votingOpen =
    proposal.status === ProposalStatusEnum.Open ||
    (!!version &&
      // Voting up until expiration on finished proposals may be supported.
      isFeatureSupportedByVersion(Feature.VoteUntilExpiration, version) &&
      // `expirationDate` will be undefined if expiration is set to never, which
      // the contract does not allow, so this is just a type-check.
      !!expirationDate &&
      expirationDate.getTime() > Date.now())

  const completionDate =
    typeof completedAt === 'string' && new Date(completedAt)
  const executionDate = typeof executedAt === 'string' && new Date(executedAt)
  const closeDate = typeof closedAt === 'string' && new Date(closedAt)

  const dateDisplay: ProposalTimestampInfo['display'] | undefined = votingOpen
    ? expirationDate && expirationDate.getTime() > Date.now()
      ? {
          label: t('title.timeLeft'),
          tooltip: formatDateTimeTz(expirationDate),
          content: (
            <TimeAgo date={expirationDate} formatter={timeAgoFormatter} />
          ),
        }
      : undefined
    : executionDate
    ? {
        label: t('proposalStatusTitle.executed'),
        tooltip: formatDateTimeTz(executionDate),
        content: formatDate(executionDate),
      }
    : closeDate
    ? {
        label: t('proposalStatusTitle.closed'),
        tooltip: formatDateTimeTz(closeDate),
        content: formatDate(closeDate),
      }
    : completionDate
    ? {
        label: t('info.completed'),
        tooltip: formatDateTimeTz(completionDate),
        content: formatDate(completionDate),
      }
    : expirationDate
    ? {
        label:
          // If voting is closed, expiration should not be in the future, but
          // just in case...
          expirationDate.getTime() > Date.now()
            ? t('title.expires')
            : t('info.completed'),
        tooltip: formatDateTimeTz(expirationDate),
        content: formatDate(expirationDate),
      }
    : undefined

  const timestampInfo: ProposalTimestampInfo | undefined = expirationDate && {
    display: dateDisplay,
    expirationDate,
  }

  return {
    loading: false,
    updating:
      !loadingProposalResponse.loading && loadingProposalResponse.updating,
    data: {
      ...proposal,
      timestampInfo,
      votingOpen,
      executedAt:
        typeof executedAt === 'string' ? new Date(executedAt) : undefined,
      approverProposalId,
      approvedProposalId,
    },
  }
}
