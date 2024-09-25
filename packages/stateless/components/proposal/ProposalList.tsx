import { HowToVoteRounded } from '@mui/icons-material'
import clsx from 'clsx'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ProposalListProps } from '@dao-dao/types'

import { useInfiniteScroll } from '../../hooks'
import { Button } from '../buttons'
import { Collapsible } from '../Collapsible'
import { ErrorPage } from '../error'
import { SearchBar } from '../inputs'
import { LineLoaders } from '../LineLoader'
import { NoContent } from '../NoContent'
import { VetoableProposals } from './VetoableProposals'

export const ProposalList = <T extends { proposalId: string }>({
  openProposals,
  daosWithVetoableProposals,
  sections,
  error,
  createNewProposalHref,
  canLoadMore,
  loadMore,
  loadingMore,
  isMember,
  daoName,
  ProposalLine,
  DiscordNotifierConfigureModal,
  LinkWrapper,
  searchBarProps,
  showingSearchResults,
  className,
  hideTitle,
}: ProposalListProps<T>) => {
  const { t } = useTranslation()

  const proposalsExist =
    openProposals.length > 0 ||
    daosWithVetoableProposals.length > 0 ||
    sections.some((section) => section.proposals.length > 0)

  // Only show load more and infinite scroll if the last collapsible section is
  // open (probably history).
  const [lastCollapsibleSectionOpen, setLastCollapsibleSectionOpen] = useState(
    sections.length === 0 || !sections[sections.length - 1].defaultCollapsed
  )

  // Infinite scroll by loading more when scrolled near bottom.
  const { infiniteScrollRef } = useInfiniteScroll({
    loadMore,
    disabled: !lastCollapsibleSectionOpen || !canLoadMore || loadingMore,
  })

  return (
    <div className={className} ref={infiniteScrollRef}>
      {!hideTitle && (
        <div className="mb-6 flex flex-row items-center justify-between gap-6">
          <p className="title-text text-text-body">{t('title.proposals')}</p>

          {DiscordNotifierConfigureModal && <DiscordNotifierConfigureModal />}
        </div>
      )}

      {searchBarProps && (
        <SearchBar
          placeholder={t('info.searchProposalsPlaceholder')}
          {...searchBarProps}
          containerClassName={clsx(searchBarProps.className, '-mt-2 mb-8')}
        />
      )}

      {proposalsExist ? (
        <div className="flex flex-col gap-4 sm:gap-6">
          {openProposals.length > 0 && (
            <div className="space-y-1">
              {openProposals.map((props) => (
                <ProposalLine {...props} key={props.proposalId} />
              ))}
            </div>
          )}

          {daosWithVetoableProposals.length > 0 && (
            <VetoableProposals
              LinkWrapper={LinkWrapper}
              ProposalLine={ProposalLine}
              className="animate-fade-in"
              daoName={daoName}
              daosWithVetoableProposals={daosWithVetoableProposals}
            />
          )}

          {sections.length > 0 && (
            <div
              className={clsx(
                'space-y-4',
                openProposals.length + daosWithVetoableProposals.length === 0 &&
                  '-mt-3'
              )}
            >
              {sections.map(
                ({ title, proposals, total, defaultCollapsed }, index) =>
                  proposals.length > 0 && (
                    <Collapsible
                      key={index}
                      containerClassName="gap-3"
                      contentContainerClassName="space-y-1"
                      defaultCollapsed={defaultCollapsed}
                      label={`${title} • ${t('info.numProposals', {
                        count: total ?? proposals.length,
                      })}`}
                      labelClassName="text-text-secondary"
                      noContentIndent
                      onExpand={
                        index === sections.length - 1
                          ? setLastCollapsibleSectionOpen
                          : undefined
                      }
                    >
                      {proposals.map((props) => (
                        <ProposalLine {...props} key={props.proposalId} />
                      ))}
                    </Collapsible>
                  )
              )}
            </div>
          )}

          {(canLoadMore || loadingMore) && lastCollapsibleSectionOpen && (
            <div className="flex flex-row justify-end">
              <Button
                className="secondary"
                loading={loadingMore}
                onClick={loadMore}
              >
                {t('button.loadMore')}
              </Button>
            </div>
          )}
        </div>
      ) : // If loading but no proposals are loaded yet, show placeholders.
      loadingMore ? (
        <LineLoaders lines={20} type="proposal" />
      ) : error ? (
        <ErrorPage error={error} />
      ) : (
        <NoContent
          Icon={HowToVoteRounded}
          actionNudge={t('info.createFirstOneQuestion')}
          body={t('info.noProposalsFound')}
          buttonLabel={
            showingSearchResults ? undefined : t('button.newProposal')
          }
          href={
            isMember && !showingSearchResults
              ? createNewProposalHref
              : undefined
          }
        />
      )}
    </div>
  )
}
