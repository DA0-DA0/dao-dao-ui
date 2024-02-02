import { Clear } from '@mui/icons-material'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { IconButton, RightSidebarContent, Tooltip } from '../components'

export type CreateProposalProps = {
  newProposal: ReactNode
  clear?: () => void
  rightSidebarContent: ReactNode
}

export const CreateProposal = ({
  newProposal,
  clear,
  rightSidebarContent,
}: CreateProposalProps) => {
  const { t } = useTranslation()

  return (
    <>
      <RightSidebarContent>{rightSidebarContent}</RightSidebarContent>

      <div className="mx-auto flex min-h-full max-w-5xl flex-col items-stretch gap-6">
        <div className="flex flex-row items-center justify-between gap-4">
          <p className="title-text text-text-body">{t('title.newProposal')}</p>

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

        {newProposal}
      </div>
    </>
  )
}
