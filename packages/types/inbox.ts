import { ApolloError } from '@apollo/client/core'

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
  error: ApolloError | undefined
  daosWithOpenUnvotedProposals: DaoWithOpenUnvotedProposals[]
  proposalCount: number
  refetch: () => Promise<any>
}
