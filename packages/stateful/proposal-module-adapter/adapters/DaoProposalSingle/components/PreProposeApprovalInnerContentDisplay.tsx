import { DataObject } from '@mui/icons-material'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  ActionCardLoader,
  ActionsMatchAndRender,
  Button,
  RawActionsRenderer,
} from '@dao-dao/stateless'
import {
  BasePreProposeApprovalInnerContentDisplayProps,
  PreProposeApprovalProposalWithMeteadata,
} from '@dao-dao/types'

import { SuspenseLoader } from '../../../../components'
import { useLoadingPreProposeApprovalProposal } from '../hooks/useLoadingPreProposeApprovalProposal'

export const PreProposeApprovalInnerContentDisplay = (
  props: BasePreProposeApprovalInnerContentDisplayProps
) => {
  const loadingProposal = useLoadingPreProposeApprovalProposal()

  return (
    <SuspenseLoader
      fallback={<ActionCardLoader />}
      forceFallback={loadingProposal.loading}
    >
      {!loadingProposal.loading && (
        <InnerPreProposeApprovalInnerContentDisplay
          {...props}
          proposal={loadingProposal.data}
        />
      )}
    </SuspenseLoader>
  )
}

const InnerPreProposeApprovalInnerContentDisplay = ({
  proposal,
}: BasePreProposeApprovalInnerContentDisplayProps & {
  proposal: PreProposeApprovalProposalWithMeteadata
}) => {
  const { t } = useTranslation()
  const [showRaw, setShowRaw] = useState(false)

  return proposal.msg.msgs.length ? (
    <div className="space-y-3">
      <ActionsMatchAndRender
        SuspenseLoader={SuspenseLoader}
        messages={proposal.msg.msgs}
        onCopyLink={() => toast.success(t('info.copiedLinkToClipboard'))}
      />

      <Button onClick={() => setShowRaw((s) => !s)} variant="ghost">
        <DataObject className="text-icon-secondary" />
        <p className="secondary-text">
          {showRaw ? t('button.hideRawData') : t('button.showRawData')}
        </p>
      </Button>

      {showRaw && <RawActionsRenderer messages={proposal.msg.msgs} />}
    </div>
  ) : (
    <p className="caption-text italic">{t('info.noProposalActions')}</p>
  )
}
