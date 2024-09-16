import { ComponentType } from 'react'

import { DaoWithDropdownVetoableProposalList } from '../dao'
import { LinkWrapperProps } from './LinkWrapper'
import { SearchBarProps } from './SearchBar'

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
   * Optionally show an error if proposals failed to load.
   */
  error?: Error
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
  /**
   * Optionally hide the title.
   */
  hideTitle?: boolean
}

export type StatefulProposalListProps = Pick<
  ProposalListProps<any>,
  'className' | 'hideTitle'
> & {
  /**
   * If defined, will be called when a proposal is clicked instead of navigating
   * to the proposal's page.
   */
  onClick?: (props: { proposalId: string }) => void
  /**
   * If true, hides vetoable proposals. Defaults to false.
   */
  hideVetoable?: boolean
  /**
   * If true, only shows executable proposals. Defaults to false.
   */
  onlyExecutable?: boolean
  /**
   * If true, hide the notifier button. Defaults to false.
   */
  hideNotifier?: boolean
}
