import { ProposalModule } from '../dao'

export type StatefulProposalLineProps = {
  // This may be shown in the inbox, outside of the context of a DAO or chain.
  chainId: string
  coreAddress: string
  proposalModules: ProposalModule[]
  proposalId: string
  proposalViewUrl: string
  onClick?: () => void
  isPreProposeProposal: boolean
}

export type StatefulLazyProposalLineProps = Omit<
  StatefulProposalLineProps,
  'proposalModules' | 'proposalViewUrl'
>
