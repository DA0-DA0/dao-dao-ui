import { ProposalModule } from './dao'

export interface DaoWithOpenProposals {
  coreAddress: string
  proposalModules: ProposalModule[]
  openProposals: {
    proposalModule: ProposalModule
    proposalNumber: number
    voted?: boolean
  }[]
}

export interface UseInboxReturn {
  loading: boolean
  refetching: boolean
  daosWithOpenProposals: DaoWithOpenProposals[]
  proposalCount: number
  refetch: () => void
}
