import { HowToVoteRounded } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  DaoWithDropdownVetoableProposalList,
  LinkWrapperProps,
} from '@dao-dao/types'

import { useInfiniteScroll } from '../../hooks'
import { Button } from '../buttons'
import { Collapsible } from '../Collapsible'
import { SearchBar, SearchBarProps } from '../inputs'
import { LineLoaders } from '../LineLoader'
import { NoContent } from '../NoContent'
import { VetoableProposals } from './VetoableProposals'

type ProposalSection<T extends { proposalId: string }> = {
  /**
   * The title of the section.
   */
  title: string
  /**
   * The list of proposals in the section.
   */
  proposals: T[]
  /**
   * The total number of proposals to display next to the title. This may be
   * more than the number of proposals in the list due to pagination.
   */
  total?: number
  /**
   * Whether or not the section is collapsed by default. Defaults to false.
   */
  defaultCollapsed?: boolean
}

export type ProposalListProps<T extends { proposalId: string }> = {
  /**
   * Open proposals are shown at the top of the list.
   */
  openProposals: T[]
  /**
   * DAOs with proposals that can be vetoed. Shown below open proposals.
   */
  daosWithVetoableProposals: DaoWithDropdownVetoableProposalList<T>[]
  /**
   * Proposal sections are shown below open and vetoable proposals.
   */
  sections: ProposalSection<T>[]
  /**
   * Link to create a new proposal.
   */
  createNewProposalHref?: string
  /**
   * Whether or not there are more proposals to load.
   */
  canLoadMore: boolean
  /**
   * Load more proposals.
   */
  loadMore: () => void
  /**
   * Whether or not more proposals are being loaded.
   */
  loadingMore: boolean
  /**
   * Whether or not the current wallet is a member of the DAO.
   */
  isMember: boolean
  /**
   * DAO name.
   */
  daoName: string

  ProposalLine: ComponentType<T>
  DiscordNotifierConfigureModal?: ComponentType | undefined
  LinkWrapper: ComponentType<LinkWrapperProps>

  /**
   * Optionally display a search bar.
   */
  searchBarProps?: SearchBarProps
  /**
   * Whether or not search results are showing.
   */
  showingSearchResults?: boolean
  /**
   * Optional class name.
   */
  className?: string
}

export const ProposalList = <T extends { proposalId: string }>({
  openProposals,
  daosWithVetoableProposals,
  sections,
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
    <div
      className={clsx('border-t border-border-secondary py-6', className)}
      ref={infiniteScrollRef}
    >
      <div className="mb-6 flex flex-row items-center justify-between gap-6">
        <p className="title-text text-text-body">{t('title.proposals')}</p>

        {DiscordNotifierConfigureModal && proposalsExist && (
          <DiscordNotifierConfigureModal />
        )}
      </div>

      {searchBarProps && (
        <SearchBar
          placeholder={t('info.searchProposalsPlaceholder')}
          {...searchBarProps}
          containerClassName={clsx(searchBarProps.className, '-mt-2 mb-8')}
        />
      )}

      {proposalsExist ? (
        <>
          {openProposals.length > 0 && (
            <div className="mb-4 space-y-1 sm:mb-6">
              {openProposals.map((props) => (
                <ProposalLine {...props} key={props.proposalId} />
              ))}
            </div>
          )}

          {daosWithVetoableProposals.length > 0 && (
            <VetoableProposals
              LinkWrapper={LinkWrapper}
              ProposalLine={ProposalLine}
              className="mb-4 animate-fade-in sm:mb-6"
              daoName={daoName}
              daosWithVetoableProposals={daosWithVetoableProposals}
            />
          )}

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

          {(canLoadMore || loadingMore) && lastCollapsibleSectionOpen && (
            <div className="mt-4 flex flex-row justify-end">
              <Button
                className="secondary"
                loading={loadingMore}
                onClick={loadMore}
              >
                {t('button.loadMore')}
              </Button>
            </div>
          )}
        </>
      ) : // If loading but no proposals are loaded yet, show placeholders.
      loadingMore ? (
        <LineLoaders lines={20} type="proposal" />
      ) : (
        <NoContent
          Icon={HowToVoteRounded}
          actionNudge={t('info.createFirstOneQuestion')}
          body={
            showingSearchResults
              ? t('info.noProposalsFound')
              : t('info.noProposalsToVoteOnYet')
          }
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
