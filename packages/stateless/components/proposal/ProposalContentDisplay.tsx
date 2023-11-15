import { CopyAllOutlined, Refresh } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  Entity,
  IconButtonLinkProps,
  LoadingData,
  StatefulEntityDisplayProps,
} from '@dao-dao/types'
import { formatDate } from '@dao-dao/utils'

import { CopyToClipboardUnderline } from '../CopyToClipboard'
import { IconButton } from '../icon_buttons'
import { MarkdownRenderer } from '../MarkdownRenderer'
import { TooltipInfoIcon } from '../tooltip'

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
  // Whether or not this proposal is an approval proposal.
  approval: boolean
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
  approval,
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
      <div className="mb-8 flex flex-row flex-wrap items-start justify-between gap-x-6 gap-y-2">
        <div className="mb-8 flex shrink-0 flex-row items-center gap-2">
          {approval && (
            <div className="flex shrink-0 flex-row items-center gap-1 rounded-full bg-component-badge-primary p-1 pr-2">
              <TooltipInfoIcon
                circular
                size="sm"
                title={t('info.approvalProposalTooltip')}
              />
              <p className="title-text shrink-0">{t('title.approval')}</p>
            </div>
          )}

          <p className="hero-text shrink-0">{title}</p>
        </div>

        <div className="flex flex-row items-center gap-1">
          {IconButtonLink && duplicateUrl && !approval && (
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

      {/* TODO(approver): add more approver related stuff here, like a link */}

      <div
        className={clsx(
          approval && 'rounded-md border-dashed border-border-primary p-4'
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
