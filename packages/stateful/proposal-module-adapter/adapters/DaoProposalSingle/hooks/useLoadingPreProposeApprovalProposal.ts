import { useTranslation } from 'react-i18next'

import {
  DaoPreProposeApprovalSingleSelectors,
  DaoPreProposeApproverSelectors,
} from '@dao-dao/state/recoil'
import { useCachedLoading } from '@dao-dao/stateless'
import {
  LoadingData,
  PreProposeApprovalProposalWithMeteadata,
  PreProposeModuleType,
  ProposalTimestampInfo,
} from '@dao-dao/types'
import { Proposal as DaoPreProposeApprovalSingleProposal } from '@dao-dao/types/contracts/DaoPreProposeApprovalSingle'
import { formatDate, formatDateTimeTz } from '@dao-dao/utils'

import { daoCoreProposalModulesSelector } from '../../../../recoil'
import { useProposalModuleAdapterOptions } from '../../../react'

export const useLoadingPreProposeApprovalProposal =
  (): LoadingData<PreProposeApprovalProposalWithMeteadata> => {
    const { t } = useTranslation()
    const {
      chain: { chain_id: chainId },
      proposalModule: { prePropose },
      proposalNumber,
    } = useProposalModuleAdapterOptions()

    const loadingProposal = useCachedLoading(
      prePropose
        ? DaoPreProposeApprovalSingleSelectors.queryExtensionSelector({
            chainId,
            contractAddress: prePropose.address,
            params: [
              {
                msg: {
                  proposal: {
                    id: proposalNumber,
                  },
                },
              },
            ],
          })
        : undefined,
      undefined,
      (err) => console.error(err)
    ) as LoadingData<DaoPreProposeApprovalSingleProposal>

    // TODO(approver): turn this into one selector
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
    // Get approver proposal ID that was created to approve this pre-propose
    // proposal.
    const approverProposalNumber = useCachedLoading(
      usesApprover && prePropose.config.preProposeApproverContract
        ? DaoPreProposeApproverSelectors.queryExtensionSelector({
            chainId,
            contractAddress: prePropose.config.preProposeApproverContract,
            params: [
              {
                msg: {
                  approver_proposal_id_for_pre_propose_approval_id: {
                    id: proposalNumber,
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

    if (
      loadingProposal.loading ||
      !loadingProposal.data ||
      (usesApprover && !approverProposalId)
    ) {
      return { loading: true }
    }

    const { status, createdAt, completedAt } = loadingProposal.data

    const createdDate = typeof createdAt === 'string' && new Date(createdAt)
    const completedDate =
      typeof completedAt === 'string' && new Date(completedAt)

    const timestampDisplay: ProposalTimestampInfo['display'] | undefined =
      'pending' in status && createdDate
        ? {
            label: t('title.proposed'),
            tooltip: formatDateTimeTz(createdDate),
            content: formatDate(createdDate),
          }
        : completedDate
        ? {
            label:
              'rejected' in status ? t('title.denied') : t('title.accepted'),
            tooltip: formatDateTimeTz(completedDate),
            content: formatDate(completedDate),
          }
        : undefined

    return {
      loading: false,
      updating: loadingProposal.updating,
      data: {
        ...loadingProposal.data,
        timestampDisplay,
        approverProposalId,
      },
    }
  }
