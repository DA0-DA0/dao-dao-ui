import { Refresh } from '@mui/icons-material'
import clsx from 'clsx'
import { ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { LoadingData } from '@dao-dao/types'
import { formatDate } from '@dao-dao/utils'

import { CopyToClipboardUnderline } from '../CopyToClipboard'
import { IconButton } from '../icon_buttons'
import { MarkdownRenderer } from '../MarkdownRenderer'

export interface ProposalContentDisplayProps {
  title: string
  description: string
  innerContentDisplay: ReactNode
  creator: {
    address: string
    name: LoadingData<string | null>
  }
  createdAt?: Date
  onRefresh?: () => void
  refreshing?: boolean
}

export const ProposalContentDisplay = ({
  title,
  description,
  innerContentDisplay,
  creator,
  createdAt,
  onRefresh,
  refreshing,
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
      <div className="mb-8 flex flex-row items-start justify-between gap-6">
        <p className="hero-text mb-8">{title}</p>

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
              // Perform one spin even if refresh completes immediately. It will
              // stop after 1 iteration if `refreshing` does not become true.
              setRefreshSpinning(true)
              onRefresh()
            }}
            variant="ghost"
          />
        )}
      </div>

      <div className="caption-text mb-4 flex flex-row items-center gap-1 font-mono">
        <CopyToClipboardUnderline
          className={clsx(
            '!caption-text',
            creator.name.loading && 'animate-pulse'
          )}
          // If name exists, use that. Otherwise, will fall back to
          // truncated address display.
          label={(!creator.name.loading && creator.name.data) || undefined}
          success={t('info.copiedAddressToClipboard')}
          tooltip={
            // If displaying name, show tooltip to copy address.
            !creator.name.loading && creator.name.data
              ? t('button.clickToCopyAddress')
              : undefined
          }
          value={creator.address}
        />

        {!!createdAt && (
          <>
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <p> – </p>
            <p>{formatDate(createdAt)}</p>
          </>
        )}
      </div>

      <MarkdownRenderer
        addAnchors
        className="max-w-full"
        markdown={description}
      />

      {innerContentDisplay && <div className="mt-9">{innerContentDisplay}</div>}
    </>
  )
}
