import { ProposalCardProps } from './ui/ProposalCard'

export type ProposalCreatedCardProps = Omit<
  ProposalCardProps,
  'className' | 'onMouseOver' | 'onMouseLeave'
>
