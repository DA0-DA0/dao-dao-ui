import { Check, Clear, CopyAll } from '@mui/icons-material'
import { ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { IconButton, Tooltip } from '../components'

export type CreateProposalProps = {
  /**
   * The rendered new proposal form.
   */
  newProposal: ReactNode
  /**
   * Optionally show a button that copies a link to the current draft.
   */
  copyDraftLink?: () => void
  /**
   * Optionally show a button that clears the form.
   */
  clear?: () => void
}

export const CreateProposal = ({
  newProposal,
  copyDraftLink,
  clear,
}: CreateProposalProps) => {
  const { t } = useTranslation()

  const [copied, setCopied] = useState(false)
  // Clear copied after 2 seconds.
  useEffect(() => {
    const timeout = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timeout)
  }, [copied])

  return (
    <div className="flex min-h-full flex-col items-stretch gap-6">
      <div className="flex flex-row items-center justify-between gap-4">
        <p className="title-text text-text-body">{t('title.newProposal')}</p>

        <div className="flex flex-row items-center gap-2 justify-end">
          {copyDraftLink && (
            <Tooltip title={t('button.copyLinkToProposalDraft')}>
              <IconButton
                Icon={copied ? Check : CopyAll}
                circular
                onClick={() => {
                  copyDraftLink()
                  setCopied(true)
                }}
                variant="ghost"
              />
            </Tooltip>
          )}

          {clear && (
            <Tooltip title={t('button.clear')}>
              <IconButton
                Icon={Clear}
                circular
                onClick={clear}
                variant="ghost"
              />
            </Tooltip>
          )}
        </div>
      </div>

      {newProposal}
    </div>
  )
}
