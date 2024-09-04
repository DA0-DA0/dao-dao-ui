import { DataObject } from '@mui/icons-material'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  ActionsMatchAndRender,
  Button,
  CosmosMessageDisplay,
  Loader,
  RawActionsRenderer,
} from '@dao-dao/stateless'
import {
  GovProposalActionDisplayProps,
  GovProposalVersion,
} from '@dao-dao/types'
import { CommunityPoolSpendProposal } from '@dao-dao/types/protobuf/codegen/cosmos/distribution/v1beta1/distribution'
import { TextProposal } from '@dao-dao/types/protobuf/codegen/cosmos/gov/v1beta1/gov'
import { decodeRawDataForDisplay, objectMatchesStructure } from '@dao-dao/utils'

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
    <InnerGovProposalActionDisplay {...props} />
  </SuspenseLoader>
)

const InnerGovProposalActionDisplay = ({
  content,
  hideCopyLink,
}: GovProposalActionDisplayProps) => {
  const { t } = useTranslation()

  const [showRaw, setShowRaw] = useState(false)

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
        <div className="space-y-3">
          <ActionsMatchAndRender
            SuspenseLoader={SuspenseLoader}
            hideCopyLink={hideCopyLink}
            messages={content.decodedMessages}
            onCopyLink={() => toast.success(t('info.copiedLinkToClipboard'))}
          />

          <Button onClick={() => setShowRaw((s) => !s)} variant="ghost">
            <DataObject className="text-icon-secondary" />
            <p className="secondary-text">
              {showRaw ? t('button.hideRawData') : t('button.showRawData')}
            </p>
          </Button>

          {showRaw && (
            <RawActionsRenderer
              messages={
                content.version === GovProposalVersion.V1
                  ? content.decodedMessages
                  : []
              }
            />
          )}
        </div>
      ) : null}
    </>
  )
}
