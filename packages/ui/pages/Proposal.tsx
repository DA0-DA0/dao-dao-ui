import clsx from 'clsx'
import { ComponentType, Fragment, ReactNode, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { CommonProposalInfo } from '@dao-dao/proposal-module-adapter'
import {
  BaseProposalStatusAndInfoProps,
  DaoInfo,
  LoadingData,
} from '@dao-dao/tstypes'
import { formatDate, getParentDaoBreadcrumbs } from '@dao-dao/utils'

import {
  CopyToClipboardUnderline,
  MarkdownPreview,
  useAppLayoutContext,
} from '../components'

export interface ProposalProps {
  proposalInfo: CommonProposalInfo
  voteTally: ReactNode
  votesCast: ReactNode
  ProposalStatusAndInfo: ComponentType<BaseProposalStatusAndInfoProps>
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
        className="mx-auto max-w-6xl"
      />

      {/* Undo container (in AppLayout) pt-10 on the top and pb-6 on the bottom so we can add those to our scrollable view instead. Also set height to full height of parent and some overflow to account for extended margins. */}
      <div className="relative mx-auto -mt-10 -mb-6 max-w-6xl h-[calc(100%+4rem)]">
        <div className="hidden absolute top-10 left-0 z-[2] w-[18rem] md:block">
          <ProposalStatusAndInfo inline={false} />
        </div>

        {/* Make entire pane scrollable, even space around and under status and info card on the side. */}
        <div className="overflow-y-auto absolute top-0 right-0 bottom-0 left-0 z-[1] pt-10 pb-6 h-full md:pl-[21rem] no-scrollbar">
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

            {!!createdAtEpoch && (
              <>
                {/* eslint-disable-next-line i18next/no-literal-string */}
                <p> – </p>
                <p>{formatDate(new Date(createdAtEpoch))}</p>
              </>
            )}
          </div>

          <MarkdownPreview className="max-w-full" markdown={description} />

          <div className="mt-9 mb-3">{actionDisplay}</div>

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
