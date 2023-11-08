import { Clear } from '@mui/icons-material'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { DaoTabId } from '@dao-dao/types'

import {
  IconButton,
  PageHeaderContent,
  RightSidebarContent,
  Tooltip,
} from '../components'

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
      <PageHeaderContent
        breadcrumbs={{
          homeTab: {
            id: DaoTabId.Proposals,
            sdaLabel: t('title.proposals'),
          },
          current: t('title.createProposal'),
        }}
        className="mx-auto max-w-5xl"
      />

      <div className="mx-auto flex max-w-5xl flex-col items-stretch gap-6">
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
