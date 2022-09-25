import { ComponentType, Fragment, ReactNode, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { CommonProposalInfo } from '@dao-dao/proposal-module-adapter'
import { BaseProposalStatusAndInfoProps, DaoInfo } from '@dao-dao/tstypes'
import { formatDate, getParentDaoBreadcrumbs } from '@dao-dao/utils'

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

      <div className="flex overflow-hidden flex-col items-stretch px-6 mx-auto max-w-5xl h-[100vh]">
        <PageHeader
          breadcrumbs={{
            crumbs: [
              { href: '/home', label: 'Home' },
              ...getParentDaoBreadcrumbs(daoInfo.parentDao),
              { href: `/dao/${daoInfo.coreAddress}`, label: daoInfo.name },
            ],
            current: `${t('title.proposal')} ${id}`,
          }}
        />

        <div className="overflow-hidden relative h-full">
          <div className="hidden absolute top-10 left-0 w-[18rem] md:block">
            <ProposalStatusAndInfo inline={false} />
          </div>

          <div className="overflow-y-auto absolute top-0 right-0 bottom-0 left-0 px-1 pt-10 pb-6 h-full md:pl-[21rem] no-scrollbar">
            <p className="mb-11 hero-text">{title}</p>

            <p className="mb-4 font-mono caption-text">
              {[
                creator.name,
                !!createdAtEpoch && formatDate(new Date(createdAtEpoch)),
              ]
                .filter(Boolean)
                // eslint-disable-next-line i18next/no-literal-string
                .join(' – ')}
            </p>

            <MarkdownPreview className="max-w-full" markdown={description} />

            <div className="mt-9 mb-3">{actionDisplay}</div>

            <div className="md:hidden">
              <ProposalStatusAndInfo inline />
            </div>

            <div className="mt-3">{voteTally}</div>

            <div className="mt-10">{votesCast}</div>
          </div>
        </div>
      </div>
    </>
  )
}
