import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  Loader,
  ProposalContentDisplay,
  WarningCard,
  useDaoInfoContext,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import {
  ApprovalProposalContextType,
  CommonProposalInfo,
  ProposalPrefill,
} from '@dao-dao/types'
import { keyFromPreProposeStatus } from '@dao-dao/utils'

import { useActionsForMatching } from '../../actions'
import { useEntity } from '../../hooks'
import { useProposalModuleAdapterContext } from '../../proposal-module-adapter'
import { EntityDisplay } from '../EntityDisplay'
import { IconButtonLink } from '../IconButtonLink'
import { SuspenseLoader } from '../SuspenseLoader'

export type DaoPreProposeApprovalProposalContentDisplayProps = {
  proposalInfo: CommonProposalInfo
}

export const DaoPreProposeApprovalProposalContentDisplay = ({
  proposalInfo,
}: DaoPreProposeApprovalProposalContentDisplayProps) => {
  const { t } = useTranslation()
  const { coreAddress } = useDaoInfoContext()
  const { getDaoProposalPath } = useDaoNavHelpers()
  const actionsForMatching = useActionsForMatching()
  const {
    id,
    adapter: {
      components: { PreProposeApprovalInnerContentDisplay },
      hooks: { useProposalRefreshers, useLoadingPreProposeApprovalProposal },
    },
  } = useProposalModuleAdapterContext()

  const loadingPreProposeApprovalProposal =
    useLoadingPreProposeApprovalProposal()

  const creatorAddress = proposalInfo.createdByAddress
  const loadingEntity = useEntity(creatorAddress)

  const { refreshProposal, refreshing } = useProposalRefreshers()

  // This gets passed down to the proposal module adapter's
  // ProposalInnerContentDisplay which is responsible for setting the duplicate
  // form data once it's loaded.
  const [duplicateFormData, setDuplicateFormData] =
    useState<ProposalPrefill<any>>()
  const prefill: ProposalPrefill<any> = {
    id,
    data: duplicateFormData,
  }
  // Don't set duplicate URL until form data is present. This ensures the
  // duplicate button remains hidden until the form data is loaded.
  const duplicateUrl = duplicateFormData
    ? getDaoProposalPath(coreAddress, 'create', {
        prefill: JSON.stringify(prefill),
      })
    : undefined

  if (!PreProposeApprovalInnerContentDisplay) {
    return <WarningCard content={t('error.unsupportedApprovalFailedRender')} />
  }

  if (
    loadingPreProposeApprovalProposal.loading ||
    !loadingPreProposeApprovalProposal.data
  ) {
    return <Loader />
  }

  return (
    <ProposalContentDisplay
      EntityDisplay={EntityDisplay}
      IconButtonLink={IconButtonLink}
      approvalContext={{
        type: ApprovalProposalContextType.Approval,
        status: keyFromPreProposeStatus(
          loadingPreProposeApprovalProposal.data.status
        ),
      }}
      createdAt={
        proposalInfo.createdAtEpoch !== null
          ? new Date(proposalInfo.createdAtEpoch)
          : undefined
      }
      creator={{
        address: creatorAddress,
        entity: loadingEntity,
      }}
      description={proposalInfo.description}
      duplicateUrl={duplicateUrl}
      innerContentDisplay={
        <SuspenseLoader fallback={<Loader />}>
          <PreProposeApprovalInnerContentDisplay
            actionsForMatching={actionsForMatching}
            setDuplicateFormData={setDuplicateFormData}
          />
        </SuspenseLoader>
      }
      onRefresh={refreshProposal}
      refreshing={refreshing}
      title={proposalInfo.title}
    />
  )
}
