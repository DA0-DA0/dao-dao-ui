import { ComponentType, ReactNode, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import {
  BaseProposalStatusAndInfoProps,
  CommonProposalInfo,
  DaoInfo,
  LoadingData,
} from '@dao-dao/types'
import { getParentDaoBreadcrumbs } from '@dao-dao/utils'

import { ProposalContentDisplay, useAppLayoutContext } from '../components'

export interface ProposalProps {
  proposalInfo: CommonProposalInfo
  voteTally: ReactNode
  votesCast: ReactNode
  ProposalStatusAndInfo: ComponentType<
    Pick<BaseProposalStatusAndInfoProps, 'inline'>
  >
  actionDisplay: ReactNode
  daoInfo: DaoInfo
  creator: {
    address: string
    name: LoadingData<string | null>
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
  const { RightSidebarContent, PageHeader } = useAppLayoutContext()

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
      <PageHeader
        breadcrumbs={{
          crumbs: [
            { href: '/home', label: 'Home' },
            ...getParentDaoBreadcrumbs(daoInfo.parentDao),
            { href: `/dao/${daoInfo.coreAddress}`, label: daoInfo.name },
          ],
          current: `${t('title.proposal')} ${id}`,
        }}
        className="mx-auto max-w-5xl"
      />

      {/* Undo container (in AppLayout) pt-10 on the top and pb-6 on the bottom so we can add those to our scrollable view instead. Also set height to full height of parent and some overflow to account for extended margins. */}
      <div className="relative mx-auto -mt-10 -mb-6 h-[calc(100%+4rem)] max-w-5xl">
        <div className="absolute top-10 left-0 z-[2] hidden w-[18rem] md:block">
          <ProposalStatusAndInfo inline={false} />
        </div>

        {/* Make entire pane scrollable, even space around and under status and info card on the side. */}
        <div className="no-scrollbar absolute top-0 right-0 bottom-0 left-0 z-[1] h-full overflow-y-auto pt-10 pb-6 md:pl-[21rem]">
          <div className="mb-3">
            <ProposalContentDisplay
              actionDisplay={actionDisplay}
              createdAt={
                createdAtEpoch !== null ? new Date(createdAtEpoch) : undefined
              }
              creator={creator}
              description={description}
              title={title}
            />
          </div>

          <div className="md:hidden">
            <ProposalStatusAndInfo inline />
          </div>

          <div className="mt-3">{voteTally}</div>

          <div className="mt-10">{votesCast}</div>
        </div>
      </div>
    </>
  )
}
