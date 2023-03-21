import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { DaoTabId } from '@dao-dao/types'

import { PageHeaderContent, RightSidebarContent } from '../components'

export interface CreateProposalProps {
  newProposal: ReactNode
  rightSidebarContent: ReactNode
}

export const CreateProposal = ({
  newProposal,
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
        <p className="title-text text-text-body">{t('title.newProposal')}</p>

        {newProposal}
      </div>
    </>
  )
}
