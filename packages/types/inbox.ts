import { ProposalModule } from './dao'

export interface DaoWithOpenUnvotedProposals {
  coreAddress: string
  proposalModules: ProposalModule[]
  openUnvotedProposals:
    | {
        proposalModule: ProposalModule
        proposalNumber: number
      }[]
    | undefined
}

export interface UseInboxReturn {
  loading: boolean
  refetching: boolean
  daosWithOpenUnvotedProposals: DaoWithOpenUnvotedProposals[]
  proposalCount: number
  refetch: () => void
}
