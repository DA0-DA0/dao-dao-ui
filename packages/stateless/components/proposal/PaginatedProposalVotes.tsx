import { Pagination, PaginationProps } from '../Pagination'
import { ProposalVotes, ProposalVotesProps } from './ProposalVotes'

export type PaginatedProposalVotesProps<Vote extends unknown = any> = Omit<
  ProposalVotesProps<Vote>,
  'footer'
> & {
  pagination: Omit<PaginationProps, 'className'>
}

export const PaginatedProposalVotes = <Vote extends unknown = any>({
  pagination,
  ...props
}: PaginatedProposalVotesProps<Vote>) => (
  <ProposalVotes
    {...props}
    footer={
      pagination.total === 0 ||
      pagination.total <= pagination.pageSize ? undefined : (
        <Pagination className="mt-8 self-center" {...pagination} />
      )
    }
  />
)
