import { AnalyticsOutlined } from '@mui/icons-material'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import useDeepCompareEffect from 'use-deep-compare-effect'

import {
  ActionsRenderer,
  Button,
  CosmosMessageDisplay,
  Loader,
} from '@dao-dao/stateless'
import {
  BaseProposalInnerContentDisplayProps,
  CategorizedActionAndData,
  CategorizedActionKeyAndData,
} from '@dao-dao/types'
import { Proposal } from '@dao-dao/types/contracts/CwProposalSingle.v1'
import { SingleChoiceProposal } from '@dao-dao/types/contracts/DaoProposalSingle.v2'
import { decodeMessages } from '@dao-dao/utils'

import { SuspenseLoader } from '../../../../components'
import { useLoadingProposal } from '../hooks'
import { NewProposalForm } from '../types'

export const ProposalInnerContentDisplay = (
  props: BaseProposalInnerContentDisplayProps<NewProposalForm>
) => {
  const loadingProposal = useLoadingProposal()

  return (
    <SuspenseLoader
      fallback={<Loader />}
      forceFallback={loadingProposal.loading}
    >
      {!loadingProposal.loading && (
        <InnerProposalInnerContentDisplay
          {...props}
          proposal={loadingProposal.data}
        />
      )}
    </SuspenseLoader>
  )
}

const InnerProposalInnerContentDisplay = ({
  setDuplicateFormData,
  actionsForMatching,
  proposal,
  setSeenAllActionPages,
}: BaseProposalInnerContentDisplayProps<NewProposalForm> & {
  proposal: Proposal | SingleChoiceProposal
}) => {
  const { t } = useTranslation()
  const [showRaw, setShowRaw] = useState(false)

  const decodedMessages = useMemo(
    () => decodeMessages(proposal.msgs),
    [proposal.msgs]
  )

  // If no msgs, set seen all action pages to true so that the user can vote.
  const [markedSeen, setMarkedSeen] = useState(false)
  useEffect(() => {
    if (markedSeen) {
      return
    }

    if (!decodedMessages.length) {
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

  const actionKeyAndData = actionData.map(
    ({ category, action, data }): CategorizedActionKeyAndData => ({
      categoryKey: category.key,
      actionKey: action.key,
      data,
    })
  )
  useDeepCompareEffect(() => {
    setDuplicateFormData({
      title: proposal.title,
      description: proposal.description,
      actionData: actionKeyAndData,
    })
  }, [
    actionKeyAndData,
    proposal.title,
    proposal.description,
    setDuplicateFormData,
  ])

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

      {showRaw && (
        <CosmosMessageDisplay
          value={JSON.stringify(decodedMessages, undefined, 2)}
        />
      )}
    </div>
  ) : null
}
