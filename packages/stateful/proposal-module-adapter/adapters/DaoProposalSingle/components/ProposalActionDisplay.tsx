import { AnalyticsOutlined, CopyAllOutlined } from '@mui/icons-material'
import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { Button, CosmosMessageDisplay, Loader } from '@dao-dao/stateless'
import { ActionAndData, BaseProposalActionDisplayProps } from '@dao-dao/types'
import { Proposal } from '@dao-dao/types/contracts/CwProposalSingle.v1'
import { SingleChoiceProposal } from '@dao-dao/types/contracts/DaoProposalSingle.v2'
import { decodeMessages } from '@dao-dao/utils'

import { ActionsRenderer } from '../../../../actions'
import { SuspenseLoader } from '../../../../components'
import { useProposalModuleAdapterContext } from '../../../react'
import { useLoadingProposal } from '../hooks'
import { NewProposalForm } from '../types'

export const ProposalActionDisplay = (
  props: BaseProposalActionDisplayProps<NewProposalForm>
) => {
  const loadingProposal = useLoadingProposal()

  return (
    <SuspenseLoader
      fallback={<Loader />}
      forceFallback={loadingProposal.loading}
    >
      {!loadingProposal.loading && (
        <InnerProposalActionDisplay
          {...props}
          proposal={loadingProposal.data}
        />
      )}
    </SuspenseLoader>
  )
}

const InnerProposalActionDisplay = ({
  onDuplicate,
  duplicateLoading,
  availableActions,
  proposal,
}: BaseProposalActionDisplayProps<NewProposalForm> & {
  proposal: Proposal | SingleChoiceProposal
}) => {
  const { t } = useTranslation()
  const [showRaw, setShowRaw] = useState(false)
  const { id: proposalModuleAdapterId } = useProposalModuleAdapterContext()

  const decodedMessages = useMemo(
    () => decodeMessages(proposal.msgs),
    [proposal]
  )

  // Call relevant action hooks in the same order every time.
  const actionData: ActionAndData[] = decodedMessages.map((message) => {
    const actionMatch = availableActions
      .map((action) => ({
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
      action: actionMatch.action,
      data: actionMatch.data,
    }
  })

  return decodedMessages?.length ? (
    <div className="space-y-3">
      <ActionsRenderer
        actionData={actionData}
        availableActions={availableActions}
        onCopyLink={() => toast.success(t('info.copiedLinkToClipboard'))}
      />

      <div className="flex flex-row items-center gap-7">
        <Button onClick={() => setShowRaw((s) => !s)} variant="ghost">
          <AnalyticsOutlined className="text-icon-secondary" />
          <p className="secondary-text">
            {showRaw ? t('button.hideRawData') : t('button.showRawData')}
          </p>
        </Button>

        <Button
          loading={duplicateLoading}
          onClick={() =>
            onDuplicate({
              id: proposalModuleAdapterId,
              data: {
                title: proposal.title,
                description: proposal.description,
                actionData: actionData.map(({ action: { key }, data }) => ({
                  key,
                  data,
                })),
              },
            })
          }
          variant="ghost"
        >
          <CopyAllOutlined className="text-icon-secondary" />
          <p className="secondary-text">{t('button.duplicate')}</p>
        </Button>
      </div>

      {showRaw && (
        <CosmosMessageDisplay
          value={JSON.stringify(decodedMessages, undefined, 2)}
        />
      )}
    </div>
  ) : null
}
