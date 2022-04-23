import { ProposalItem, ProposalItemType } from './ProposalItem'
import { ProposalStatus, ProposalVote } from '@/types/proposals'

export interface ProposalListProps {
  data: ProposalItemType[]
}

export function ProposalList({ data }: ProposalListProps) {
  return (
    <div className="space-y-1">
      {data.map((item) => (
        <ProposalItem key={`proposal-item-${item.id}`} data={item} />
      ))}
    </div>
  )
}

ProposalList.PLACEHOLDER_DATA = [
  {
    id: 1,
    status: ProposalStatus.Open,
    name: 'Raw DAO',
    description: 'Proposal testing',
    vote: ProposalVote.Undecided,
    votedYesPercent: 50,
    votedNoPercent: 50,
    endDate: '3 days left',
  },
  {
    id: 23,
    status: ProposalStatus.Passed,
    name: 'DJALSDJSALKDJSKLDASDSAA',
    description: 'DJASKLDJSADJKASDJKLASDJKLADJKLSADJKLA',
    vote: ProposalVote.Yes,
    votedYesPercent: 50,
    votedNoPercent: 50,
    endDate: '3 days left',
  },
  {
    id: 456,
    status: ProposalStatus.Approved,
    name: 'Raw DAO',
    description: 'Proposal testing',
    vote: ProposalVote.No,
    votedYesPercent: 50,
    votedNoPercent: 50,
    endDate: '3 days left',
  },
  {
    id: 7,
    status: ProposalStatus.Rejected,
    name: 'Raw DAO',
    description: 'Proposal testing',
    vote: ProposalVote.Abstain,
    votedYesPercent: 50,
    votedNoPercent: 50,
    endDate: '3 days left',
  },
]
