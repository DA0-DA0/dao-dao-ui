import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  Loader,
  ProposalContentDisplay,
  StatusCard,
  useDao,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import {
  ApprovalProposalContextType,
  CommonProposalInfo,
  ProposalPrefill,
} from '@dao-dao/types'
import { encodeJsonToBase64, keyFromPreProposeStatus } from '@dao-dao/utils'

import { useEntity } from '../../hooks'
import { useProposalModuleAdapterContext } from '../../proposal-module-adapter'
import { EntityDisplay } from '../EntityDisplay'
import { IconButtonLink } from '../IconButtonLink'

export type DaoApprovalProposalContentDisplayProps = {
  proposalInfo: CommonProposalInfo
}

export const DaoApprovalProposalContentDisplay = ({
  proposalInfo,
}: DaoApprovalProposalContentDisplayProps) => {
  const { t } = useTranslation()
  const { coreAddress } = useDao()
  const { getDaoProposalPath } = useDaoNavHelpers()
  const {
    id,
    adapter: {
      components: { ApprovalProposalInnerContentDisplay },
      hooks: { useProposalRefreshers, useLoadingApprovalProposal },
    },
  } = useProposalModuleAdapterContext()

  const loadingApprovalProposal = useLoadingApprovalProposal()

  const creatorAddress = proposalInfo.createdByAddress
  const { entity } = useEntity(creatorAddress)

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
        prefill: encodeJsonToBase64(prefill),
      })
    : undefined

  if (!ApprovalProposalInnerContentDisplay) {
    return (
      <StatusCard
        content={t('error.unsupportedApprovalFailedRender')}
        style="warning"
      />
    )
  }

  if (loadingApprovalProposal.loading || !loadingApprovalProposal.data) {
    return <Loader />
  }

  return (
    <ProposalContentDisplay
      EntityDisplay={EntityDisplay}
      IconButtonLink={IconButtonLink}
      approvalContext={{
        type: ApprovalProposalContextType.Approval,
        status: keyFromPreProposeStatus(loadingApprovalProposal.data.status),
      }}
      createdAt={
        proposalInfo.createdAtEpoch !== null
          ? new Date(proposalInfo.createdAtEpoch)
          : undefined
      }
      creator={{
        address: creatorAddress,
        entity,
      }}
      description={proposalInfo.description}
      duplicateUrl={duplicateUrl}
      innerContentDisplay={
        <ApprovalProposalInnerContentDisplay
          setDuplicateFormData={setDuplicateFormData}
        />
      }
      onRefresh={refreshProposal}
      refreshing={refreshing}
      title={proposalInfo.title}
    />
  )
}
