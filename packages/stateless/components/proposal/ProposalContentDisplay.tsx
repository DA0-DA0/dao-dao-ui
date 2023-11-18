import { CopyAllOutlined, InfoOutlined, Refresh } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  ApprovalProposalContext,
  ApprovalProposalContextType,
  Entity,
  IconButtonLinkProps,
  LoadingData,
  StatefulEntityDisplayProps,
} from '@dao-dao/types'
import { formatDate } from '@dao-dao/utils'

import { ApprovalBadge } from '../ApprovalBadge'
import { CopyToClipboardUnderline } from '../CopyToClipboard'
import { IconButton } from '../icon_buttons'
import { MarkdownRenderer } from '../MarkdownRenderer'
import { TextWithTooltipWhenTruncated } from '../tooltip'

export interface ProposalContentDisplayProps {
  title: string
  description: string
  innerContentDisplay: ReactNode
  creator?: {
    address: string
    entity: LoadingData<Entity>
  }
  createdAt?: Date
  onRefresh?: () => void
  refreshing?: boolean
  duplicateUrl?: string
  IconButtonLink?: ComponentType<IconButtonLinkProps>
  EntityDisplay?: ComponentType<StatefulEntityDisplayProps>
  approvalContext?: ApprovalProposalContext
}

export const ProposalContentDisplay = ({
  title,
  description,
  innerContentDisplay,
  creator,
  createdAt,
  onRefresh,
  refreshing,
  duplicateUrl,
  IconButtonLink,
  EntityDisplay,
  approvalContext,
}: ProposalContentDisplayProps) => {
  const { t } = useTranslation()

  const [refreshSpinning, setRefreshSpinning] = useState(false)
  // Start spinning refresh icon if refreshing sets to true. Turn off once the
  // iteration completes (in `onAnimationIteration` below).
  useEffect(() => {
    refreshing && setRefreshSpinning(true)
  }, [refreshing])

  return (
    <>
      <div className="mb-16 flex flex-row items-start justify-between gap-x-10 gap-y-2">
        <div className="flex grow flex-col gap-4">
          <div className="flex flex-row flex-wrap items-start gap-x-2 gap-y-1">
            {approvalContext && (
              <ApprovalBadge
                className="h-8"
                context={approvalContext}
                size="lg"
              />
            )}

            <TextWithTooltipWhenTruncated className="hero-text">
              {title}
            </TextWithTooltipWhenTruncated>
          </div>

          {approvalContext &&
            approvalContext.type === ApprovalProposalContextType.Approver && (
              <div className="flex min-w-0 flex-row items-start gap-1">
                <InfoOutlined className="!h-4 !w-4 text-icon-secondary" />
                <p className="secondary-text min-w-0">
                  {t('info.approverProposalExplanation', {
                    context: approvalContext.status,
                  })}
                </p>
              </div>
            )}
        </div>

        <div className="flex shrink-0 flex-row items-center gap-1">
          {IconButtonLink &&
            duplicateUrl &&
            (!approvalContext ||
              approvalContext.type ===
                ApprovalProposalContextType.Approval) && (
              <IconButtonLink
                Icon={CopyAllOutlined}
                href={duplicateUrl}
                variant="ghost"
              />
            )}

          {/* Refresh button that shows up after votes load or while votes are loading. */}
          {onRefresh && (
            <IconButton
              Icon={Refresh}
              circular
              className={clsx(refreshSpinning && 'animate-spin-medium')}
              // If spinning but no longer refreshing, stop after iteration.
              onAnimationIteration={
                refreshSpinning && !refreshing
                  ? () => setRefreshSpinning(false)
                  : undefined
              }
              onClick={() => {
                // Perform one spin even if refresh completes immediately. It
                // will stop after 1 iteration if `refreshing` does not become
                // true.
                setRefreshSpinning(true)
                onRefresh()
              }}
              variant="ghost"
            />
          )}
        </div>
      </div>

      <div
        className={clsx(
          approvalContext &&
            approvalContext.type === ApprovalProposalContextType.Approver &&
            'rounded-md border-2 border-dashed border-border-primary p-4'
        )}
      >
        <div className="caption-text mb-4 flex flex-row items-center gap-1 font-mono">
          {!!creator?.address && (
            <CopyToClipboardUnderline
              className={clsx(
                '!caption-text',
                creator.entity.loading && 'animate-pulse'
              )}
              // If name exists, use that. Otherwise, will fall back to truncated
              // address display.
              label={
                (!creator.entity.loading && creator.entity.data.name) ||
                undefined
              }
              success={t('info.copiedAddressToClipboard')}
              tooltip={
                // If displaying name, show tooltip to copy address.
                !creator.entity.loading && creator.entity.data.name
                  ? t('button.clickToCopyAddress')
                  : undefined
              }
              value={creator.address}
            />
          )}

          {!!createdAt && (
            <>
              {/* eslint-disable-next-line i18next/no-literal-string */}
              {!!creator?.address && <p> – </p>}
              <p>{formatDate(createdAt)}</p>
            </>
          )}
        </div>

        <MarkdownRenderer
          EntityDisplay={EntityDisplay}
          addAnchors
          className="max-w-full"
          markdown={description}
        />

        {innerContentDisplay && (
          <div className="mt-9">{innerContentDisplay}</div>
        )}
      </div>
    </>
  )
}
