import clsx from 'clsx'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'

import {
  ButtonLink,
  CosmosMessageDisplay,
  InfoLineCard,
  InputLabel,
} from '@dao-dao/stateless'
import { ProposalExecutionMetadata } from '@dao-dao/types'

export type ProposalExecutionMetadataRendererProps = {
  /**
   * The metadata. If undefined or not enabled, will not render.
   */
  metadata?: ProposalExecutionMetadata
  /**
   * Optional container class name.
   */
  className?: string
}

/**
 * Renders proposal execution metadata.
 */
export const ProposalExecutionMetadataRenderer = ({
  metadata,
  className,
}: ProposalExecutionMetadataRendererProps) => {
  const { t } = useTranslation()

  if (!metadata) {
    return null
  }

  const hasExtensionData = !!metadata?.gaiaMetaprotocolsExtensionData?.length

  return (
    <div className={clsx('flex flex-col gap-4', className)}>
      <InputLabel name={t('title.executionMetadata')} title />

      <div className="rounded-md overflow-hidden">
        {metadata.memo && (
          <InfoLineCard
            className="!rounded-none"
            label={t('title.memo')}
            tooltip={t('info.proposalExecutionMemoTooltip')}
            value={metadata.memo}
            valueClassName="!font-mono"
          />
        )}

        {hasExtensionData && (
          <div
            className={clsx(
              'flex flex-col gap-4 p-4 sm:gap-4 bg-background-secondary',
              !!metadata.memo && 'border-t border-border-secondary'
            )}
          >
            <InputLabel
              className="text-text-body"
              name={t('title.metaprotocolExtensionData')}
              primary
              tooltip={
                <>
                  See the{' '}
                  <ButtonLink
                    containerClassName="inline-block"
                    href="https://hub.cosmos.network/main/modules/metaprotocols"
                    variant="underline"
                  >
                    Cosmos Network docs
                  </ButtonLink>{' '}
                  for more information.
                </>
              }
            />

            <div className="flex flex-col gap-2">
              {metadata.gaiaMetaprotocolsExtensionData!.map(
                ({ protocolId, protocolVersion, data }, index) => {
                  let stringifiedData = data
                  try {
                    stringifiedData = JSON.stringify(JSON.parse(data), null, 2)
                  } catch {
                    // Leave as string if JSON parsing fails.
                  }

                  return (
                    <div
                      key={index}
                      className="flex flex-col bg-background-tertiary rounded-md"
                    >
                      <InfoLineCard
                        className="!rounded-none !bg-transparent !pb-2"
                        label={t('form.protocolId')}
                        value={protocolId}
                        valueClassName="!font-mono"
                      />

                      <InfoLineCard
                        className="!rounded-none !bg-transparent !py-2"
                        label={t('form.protocolVersion')}
                        value={protocolVersion}
                        valueClassName="!font-mono"
                      />

                      <InfoLineCard
                        className="!rounded-none !bg-transparent flex-col items-stretch !pt-2"
                        label={t('form.data')}
                        value={
                          <CosmosMessageDisplay
                            className="grow"
                            value={stringifiedData}
                          />
                        }
                      />
                    </div>
                  )
                }
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
