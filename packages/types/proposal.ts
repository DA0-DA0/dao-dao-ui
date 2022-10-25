import { ProposalCardProps } from './components/ProposalCard'

export type ProposalCreatedCardProps = Omit<
  ProposalCardProps,
  'className' | 'onMouseOver' | 'onMouseLeave' | 'LinkWrapper'
>
