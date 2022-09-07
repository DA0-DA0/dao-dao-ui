import { BaseNewProposalProps } from '../../../../types'
import {
  NewProposal as StatelessNewProposal,
  NewProposalProps as StatelessNewProposalProps,
} from '../ui/NewProposal'

export type NewProposalProps = BaseNewProposalProps &
  Pick<StatelessNewProposalProps, 'options'>

export const NewProposal = ({
  onCreateSuccess,
  ...props
}: NewProposalProps) => {
  return <StatelessNewProposal {...props} />
}
