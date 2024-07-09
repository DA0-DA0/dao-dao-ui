export type StatefulProposalLineProps = {
  // This may be shown in the inbox, outside of the context of a DAO or chain.
  chainId: string
  coreAddress: string
  proposalId: string
  proposalViewUrl: string
  onClick?: () => void
  isPreProposeProposal: boolean
}
