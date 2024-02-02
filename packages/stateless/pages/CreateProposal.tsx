import { Clear } from '@mui/icons-material'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { IconButton, Tooltip } from '../components'

export type CreateProposalProps = {
  newProposal: ReactNode
  clear?: () => void
}

export const CreateProposal = ({ newProposal, clear }: CreateProposalProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex min-h-full flex-col items-stretch gap-6">
      <div className="flex flex-row items-center justify-between gap-4">
        <p className="title-text text-text-body">{t('title.newProposal')}</p>

        {clear && (
          <Tooltip title={t('button.clear')}>
            <IconButton Icon={Clear} circular onClick={clear} variant="ghost" />
          </Tooltip>
        )}
      </div>

      {newProposal}
    </div>
  )
}
