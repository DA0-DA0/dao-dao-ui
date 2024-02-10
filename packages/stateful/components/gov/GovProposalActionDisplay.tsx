import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  ActionsRenderer,
  CosmosMessageDisplay,
  Loader,
} from '@dao-dao/stateless'
import {
  ActionAndData,
  GovProposalActionDisplayProps,
  GovProposalVersion,
} from '@dao-dao/types'
import {
  decodeMessages,
  decodeRawDataForDisplay,
  objectMatchesStructure,
} from '@dao-dao/utils'
import { CommunityPoolSpendProposal } from '@dao-dao/utils/protobuf/codegen/cosmos/distribution/v1beta1/distribution'
import { TextProposal } from '@dao-dao/utils/protobuf/codegen/cosmos/gov/v1beta1/gov'

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
        JSON.stringify(props.content.title + props.content.description)
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
        .map((action) => ({
          action,
          ...action.useDecodedCosmosMsg(message),
        }))
        .find(({ match }) => match)

      return (
        actionMatch && {
          action: actionMatch.action,
          data: actionMatch.data,
        }
      )
    })
    .filter(Boolean) as ActionAndData[]

  const decodedContent =
    content.version === GovProposalVersion.V1_BETA_1
      ? content.decodedContent
      : content.legacyContent[0]

  let decodedNonText =
    decodedContent && decodedContent.$typeUrl !== TextProposal.typeUrl
      ? decodeRawDataForDisplay({
          ...decodedContent,
          title: undefined,
          description: undefined,
        })
      : undefined
  if (
    objectMatchesStructure(decodedNonText, {
      typeUrl: {},
      value: {},
    }) &&
    decodedNonText.value instanceof Uint8Array &&
    decodedNonText.value.length > 1000
  ) {
    decodedNonText.value = '[TOO LARGE TO SHOW]'
  } else if (
    objectMatchesStructure(decodedNonText, {
      typeUrl: {},
      value: {
        wasmByteCode: {},
      },
    })
  ) {
    decodedNonText.value.wasmByteCode = '[TOO LARGE TO SHOW]'
  }

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
        ) : decodedNonText ? (
          <div className="space-y-3">
            <p className="text-text-tertiary">{t('title.rawData')}</p>

            <CosmosMessageDisplay
              value={JSON.stringify(decodedNonText, undefined, 2)}
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
