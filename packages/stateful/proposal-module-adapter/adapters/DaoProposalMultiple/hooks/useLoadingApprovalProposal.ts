import { useTranslation } from 'react-i18next'

import { proposalQueries } from '@dao-dao/state/query'
import {
  ApprovalProposalWithMetadata,
  LoadingData,
  PreProposeModuleType,
  ProposalTimestampInfo,
} from '@dao-dao/types'
import { MultipleChoiceApprovalProposal } from '@dao-dao/types/contracts/DaoPreProposeApprovalMultiple'
import { formatDate, formatDateTimeTz } from '@dao-dao/utils'

import {
  useQueryLoadingData,
  useQueryLoadingDataWithError,
} from '../../../../hooks'
import { useProposalModuleAdapterOptions } from '../../../react'

export const useLoadingApprovalProposal = (): LoadingData<
  ApprovalProposalWithMetadata<MultipleChoiceApprovalProposal>
> => {
  const { t } = useTranslation()
  const {
    chain: { chainId },
    proposalModule,
    proposalNumber,
  } = useProposalModuleAdapterOptions()

  const loadingProposal: LoadingData<
    MultipleChoiceApprovalProposal | undefined
  > = useQueryLoadingData(
    proposalModule.getApprovalProposalQuery({
      proposalId: proposalNumber,
    }),
    undefined
  )

  // Retrieve proposal ID in approver DAO if exists.
  const approverProposalId = useQueryLoadingDataWithError(
    proposalModule.prePropose?.type === PreProposeModuleType.Approval &&
      !!proposalModule.prePropose.config.preProposeApproverContract
      ? proposalQueries.approverIdForPreProposeApprovalId({
          chainId,
          preProposeAddress: proposalModule.prePropose.address,
          proposalNumber,
          isApprovalProposal: true,
          approver: proposalModule.prePropose.config.approver,
          preProposeApproverContract:
            proposalModule.prePropose.config.preProposeApproverContract,
        })
      : {
          queryKey: ['empty_string'],
          queryFn: () => '',
        }
  )

  if (
    loadingProposal.loading ||
    !loadingProposal.data ||
    approverProposalId.loading
  ) {
    return { loading: true }
  }

  const { status, createdAt, completedAt } = loadingProposal.data

  const createdDate = typeof createdAt === 'string' && new Date(createdAt)
  const completedDate = typeof completedAt === 'string' && new Date(completedAt)

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
      // On error, just return undefined so we still render the proposal.
      approverProposalId: approverProposalId.errored
        ? undefined
        : approverProposalId.data || undefined,
    },
  }
}
