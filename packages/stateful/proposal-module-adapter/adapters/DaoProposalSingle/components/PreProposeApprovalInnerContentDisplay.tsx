import { AnalyticsOutlined } from '@mui/icons-material'
import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { DaoPreProposeApprovalSingleSelectors } from '@dao-dao/state/recoil'
import {
  ActionsRenderer,
  Button,
  CosmosMessageDisplay,
  Loader,
  useCachedLoading,
} from '@dao-dao/stateless'
import {
  BasePreProposeApprovalInnerContentDisplayProps,
  CategorizedActionAndData,
  LoadingData,
} from '@dao-dao/types'
import { Proposal as DaoPreProposeApprovalSingleProposal } from '@dao-dao/types/contracts/DaoPreProposeApprovalSingle'
import { decodeMessages, decodeRawDataForDisplay } from '@dao-dao/utils'

import { SuspenseLoader } from '../../../../components'
import { useProposalModuleAdapterOptions } from '../../../react'

export const PreProposeApprovalInnerContentDisplay = (
  props: BasePreProposeApprovalInnerContentDisplayProps
) => {
  const {
    chain: { chain_id: chainId },
    proposalModule,
    proposalNumber,
  } = useProposalModuleAdapterOptions()

  const loadingProposal = useCachedLoading(
    DaoPreProposeApprovalSingleSelectors.queryExtensionSelector({
      chainId,
      contractAddress: proposalModule.prePropose!.address,
      params: [
        {
          msg: {
            proposal: {
              id: proposalNumber,
            },
          },
        },
      ],
    }),
    undefined
  ) as LoadingData<DaoPreProposeApprovalSingleProposal | undefined>

  return (
    <SuspenseLoader
      fallback={<Loader />}
      forceFallback={loadingProposal.loading || !loadingProposal.data}
    >
      {!loadingProposal.loading && loadingProposal.data && (
        <InnerProposalInnerContentDisplay
          {...props}
          proposal={loadingProposal.data}
        />
      )}
    </SuspenseLoader>
  )
}

const InnerProposalInnerContentDisplay = ({
  actionsForMatching,
  proposal,
}: BasePreProposeApprovalInnerContentDisplayProps & {
  proposal: DaoPreProposeApprovalSingleProposal
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
      />

      <Button onClick={() => setShowRaw((s) => !s)} variant="ghost">
        <AnalyticsOutlined className="text-icon-secondary" />
        <p className="secondary-text">
          {showRaw ? t('button.hideRawData') : t('button.showRawData')}
        </p>
      </Button>

      {showRaw && <CosmosMessageDisplay value={rawDecodedMessages} />}
    </div>
  ) : null
}
