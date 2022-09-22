import { ComponentType, Fragment, ReactNode, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { CommonProposalInfo } from '@dao-dao/proposal-module-adapter'
import { BaseProposalStatusAndInfoProps, DaoInfo } from '@dao-dao/tstypes'
import { formatDate } from '@dao-dao/utils'

import { MarkdownPreview, PageHeader, useAppLayoutContext } from '../components'

export interface ProposalProps {
  proposalInfo: CommonProposalInfo
  voteTally: ReactNode
  votesCast: ReactNode
  ProposalStatusAndInfo: ComponentType<BaseProposalStatusAndInfoProps>
  actionDisplay: ReactNode
  daoInfo: DaoInfo
  creator: {
    name: string
    address: string
  }
  rightSidebarContent: ReactNode
}

export const Proposal = ({
  proposalInfo: { id, title, description, createdAtEpoch },
  voteTally,
  votesCast,
  ProposalStatusAndInfo,
  actionDisplay,
  daoInfo,
  creator,
  rightSidebarContent,
}: ProposalProps) => {
  const { t } = useTranslation()
  const { RightSidebarContent } = useAppLayoutContext()

  // Scroll to hash manually if available since this component and thus the
  // desired target anchor text won't be ready right when the page renders.
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      // Ignore the '#' character at the beginning.
      const element = document.getElementById(window.location.hash.slice(1))
      if (!element) {
        return
      }

      // 24px offset so the element isn't touching the edge of the browser.
      const top = element.getBoundingClientRect().top + window.scrollY - 24
      window.scrollTo({
        top,
        behavior: 'smooth',
      })
    }
  }, [])

  return (
    <>
      <RightSidebarContent>{rightSidebarContent}</RightSidebarContent>

      <div className="flex flex-col gap-10 items-stretch px-6 mx-auto max-w-5xl">
        <PageHeader
          breadcrumbs={{
            crumbs: [
              { href: '/home', label: 'Home' },
              { href: `/dao/${daoInfo.coreAddress}`, label: daoInfo.name },
            ],
            current: `${t('title.proposal')} ${id}`,
          }}
        />

        <div className="grid grid-cols-1 gap-[3.5rem] md:grid-cols-[minmax(0,3fr),minmax(0,7fr)]">
          <ProposalStatusAndInfo inline={false} />

          <div>
            <p className="mb-11 hero-text">{title}</p>

            <p className="mb-4 font-mono caption-text">
              {creator.name}
              {!!createdAtEpoch && ` – ${formatDate(new Date(createdAtEpoch))}`}
            </p>

            <MarkdownPreview markdown={description} />

            {actionDisplay}

            <ProposalStatusAndInfo inline />

            {voteTally}

            <div className="mt-10">{votesCast}</div>
          </div>
        </div>
      </div>
    </>
  )
}
