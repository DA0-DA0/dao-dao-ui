import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { CommunityPoolSpendProposal } from '@dao-dao/protobuf/codegen/cosmos/distribution/v1beta1/distribution'
import { TextProposal } from '@dao-dao/protobuf/codegen/cosmos/gov/v1beta1/gov'
import {
  ActionsRenderer,
  CosmosMessageDisplay,
  Loader,
} from '@dao-dao/stateless'
import {
  CategorizedActionAndData,
  GovProposalActionDisplayProps,
  GovProposalVersion,
} from '@dao-dao/types'
import { decodeMessages, decodeRawMessagesForDisplay } from '@dao-dao/utils'

import { useActionsForMatching } from '../../actions'
import { PayEntityDisplay } from '../PayEntityDisplay'
import { SuspenseLoader } from '../SuspenseLoader'

// Decoded gov proposal content sometimes has BigInts.
// @ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString()
}

export const GovProposalActionDisplay = (
  props: GovProposalActionDisplayProps
) => (
  <SuspenseLoader fallback={<Loader />}>
    <InnerGovProposalActionDisplay
      key={
        // Make sure to re-render when the content changes, so the action hooks
        // are called the same number of times.
        JSON.stringify(props.content)
      }
      {...props}
    />
  </SuspenseLoader>
)

const InnerGovProposalActionDisplay = ({
  content,
  hideCopyLink,
}: GovProposalActionDisplayProps) => {
  const { t } = useTranslation()

  const actionsForMatching = useActionsForMatching()

  const decodedMessages = useMemo(
    () =>
      content.version === GovProposalVersion.V1_BETA_1
        ? []
        : decodeMessages(content.decodedMessages),
    [content]
  )

  // Call relevant action hooks in the same order every time.
  const actionData = decodedMessages
    .map((message) => {
      const actionMatch = actionsForMatching
        .map(({ category, action }) => ({
          category,
          action,
          ...action.useDecodedCosmosMsg(message),
        }))
        .find(({ match }) => match)

      return (
        actionMatch && {
          category: actionMatch.category,
          action: actionMatch.action,
          data: actionMatch.data,
        }
      )
    })
    .filter(Boolean) as CategorizedActionAndData[]

  const decodedContent =
    content.version === GovProposalVersion.V1_BETA_1
      ? content.decodedContent
      : content.legacyContent[0]

  return (
    <>
      {decodedContent &&
        (decodedContent.$typeUrl === CommunityPoolSpendProposal.typeUrl ? (
          <div className="space-y-3">
            <p className="text-text-tertiary">
              {t('govProposalType.CommunityPoolSpendProposal')}
            </p>

            <PayEntityDisplay
              coins={decodedContent.amount}
              recipient={decodedContent.recipient}
            />
          </div>
        ) : decodedContent.$typeUrl !== TextProposal.typeUrl ? (
          <div className="space-y-3">
            <p className="text-text-tertiary">{t('title.rawData')}</p>

            <CosmosMessageDisplay
              value={JSON.stringify(
                decodeRawMessagesForDisplay({
                  ...decodedContent,
                  title: undefined,
                  description: undefined,
                  wasmByteCode:
                    'wasmByteCode' in decodedContent &&
                    decodedContent.wasmByteCode
                      ? '[TOO LARGE TO SHOW]'
                      : undefined,
                }),
                undefined,
                2
              )}
            />
          </div>
        ) : null)}

      {content.version === GovProposalVersion.V1 &&
      content.decodedMessages?.length ? (
        <ActionsRenderer
          SuspenseLoader={SuspenseLoader}
          actionData={actionData}
          hideCopyLink={hideCopyLink}
          onCopyLink={() => toast.success(t('info.copiedLinkToClipboard'))}
        />
      ) : null}
    </>
  )
}
