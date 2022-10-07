import clsx from 'clsx'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { LoadingData } from '@dao-dao/tstypes'
import { formatDate } from '@dao-dao/utils'

import { CopyToClipboardUnderline } from '../CopyToClipboard'
import { MarkdownPreview } from '../MarkdownPreview'

export interface ProposalContentDisplayProps {
  title: string
  description: string
  actionDisplay: ReactNode
  creator: {
    address: string
    name: LoadingData<string | null>
  }
  createdAt?: Date
}

export const ProposalContentDisplay = ({
  title,
  description,
  actionDisplay,
  creator,
  createdAt,
}: ProposalContentDisplayProps) => {
  const { t } = useTranslation()

  return (
    <>
      <p className="mb-11 hero-text">{title}</p>

      <div className="flex flex-row gap-1 items-center mb-4 font-mono caption-text">
        <CopyToClipboardUnderline
          className={clsx(
            '!caption-text',
            creator.name.loading && 'animate-pulse'
          )}
          // If name exists, use that. Otherwise, will fall back to
          // truncated address display.
          label={(!creator.name.loading && creator.name.data) || undefined}
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

      <MarkdownPreview className="max-w-full" markdown={description} />

      {actionDisplay && <div className="mt-9">{actionDisplay}</div>}
    </>
  )
}
