import { AnalyticsOutlined } from '@mui/icons-material'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  ActionsRenderer,
  Button,
  CosmosMessageDisplay,
  Loader,
} from '@dao-dao/stateless'
import {
  BasePreProposeApprovalInnerContentDisplayProps,
  CategorizedActionAndData,
  PreProposeApprovalProposalWithMeteadata,
} from '@dao-dao/types'
import { decodeMessages, decodeRawDataForDisplay } from '@dao-dao/utils'

import { SuspenseLoader } from '../../../../components'
import { useLoadingPreProposeApprovalProposal } from '../hooks/useLoadingPreProposeApprovalProposal'

export const PreProposeApprovalInnerContentDisplay = (
  props: BasePreProposeApprovalInnerContentDisplayProps
) => {
  const loadingProposal = useLoadingPreProposeApprovalProposal()

  return (
    <SuspenseLoader
      fallback={<Loader />}
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
  actionsForMatching,
  proposal,
  setSeenAllActionPages,
}: BasePreProposeApprovalInnerContentDisplayProps & {
  proposal: PreProposeApprovalProposalWithMeteadata
}) => {
  const { t } = useTranslation()
  const [showRaw, setShowRaw] = useState(false)

  const decodedMessages = useMemo(
    () => decodeMessages(proposal.msg.msgs),
    [proposal.msg.msgs]
  )
  const rawDecodedMessages = useMemo(
    () => JSON.stringify(decodedMessages.map(decodeRawDataForDisplay), null, 2),
    [decodedMessages]
  )

  // If no msgs, set seen all action pages to true so that the user can vote.
  const [markedSeen, setMarkedSeen] = useState(false)
  useEffect(() => {
    if (markedSeen) {
      return
    }

    if (setSeenAllActionPages && !decodedMessages.length) {
      setSeenAllActionPages()
      setMarkedSeen(true)
    }
  }, [decodedMessages.length, markedSeen, setSeenAllActionPages])

  // Call relevant action hooks in the same order every time.
  const actionData: CategorizedActionAndData[] = decodedMessages.map(
    (message) => {
      const actionMatch = actionsForMatching
        .map(({ category, action }) => ({
          category,
          action,
          ...action.useDecodedCosmosMsg(message),
        }))
        .find(({ match }) => match)

      // There should always be a match since custom matches all. This should
      // never happen as long as the Custom action exists.
      if (!actionMatch?.match) {
        throw new Error(t('error.loadingData'))
      }

      return {
        category: actionMatch.category,
        action: actionMatch.action,
        data: actionMatch.data,
      }
    }
  )

  return decodedMessages?.length ? (
    <div className="space-y-3">
      <ActionsRenderer
        SuspenseLoader={SuspenseLoader}
        actionData={actionData}
        onCopyLink={() => toast.success(t('info.copiedLinkToClipboard'))}
        setSeenAllActionPages={setSeenAllActionPages}
      />

      <Button onClick={() => setShowRaw((s) => !s)} variant="ghost">
        <AnalyticsOutlined className="text-icon-secondary" />
        <p className="secondary-text">
          {showRaw ? t('button.hideRawData') : t('button.showRawData')}
        </p>
      </Button>

      {showRaw && <CosmosMessageDisplay value={rawDecodedMessages} />}
    </div>
  ) : (
    <p className="caption-text italic">{t('info.noProposalActions')}</p>
  )
}
