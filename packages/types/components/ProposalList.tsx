export type StatefulProposalListProps = {
  /**
   * If defined, will be called when a proposal is clicked instead of navigating
   * to the proposal's page.
   */
  onClick?: (props: { proposalId: string }) => void
  /**
   * If true, hides vetoable proposals. Defaults to false.
   */
  hideVetoable?: boolean
}
