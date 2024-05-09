import { GovProposalLine, ProposalLine } from '../../../components'
import { OpenProposalsProposalLineProps } from './types'

export const OpenProposalsProposalLine = (
  props: OpenProposalsProposalLineProps
) =>
  props.type === 'gov' ? (
    <GovProposalLine {...props.props} />
  ) : (
    <ProposalLine {...props.props} />
  )
