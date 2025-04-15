import {
  ApprovalProposalStatus,
  LineLoader,
  ProposalLine as StatelessProposalLine,
} from '@dao-dao/stateless'
import {
  ApprovalProposalContextType,
  ApprovalProposalWithMetadata,
  BaseProposalLineProps,
} from '@dao-dao/types'
import { MultipleChoiceApprovalProposal } from '@dao-dao/types/contracts/DaoPreProposeApprovalMultiple'
import { keyFromPreProposeStatus } from '@dao-dao/utils'

import { SuspenseLoader } from '../../../../components'
import { useProposalModuleAdapterOptions } from '../../../react'
import { useLoadingApprovalProposal } from '../hooks'

export const ApprovalProposalLine = (props: BaseProposalLineProps) => {
  const loadingProposal = useLoadingApprovalProposal()

  return (
    <SuspenseLoader
      fallback={<LineLoader type="proposal" />}
      forceFallback={loadingProposal.loading}
    >
      {!loadingProposal.loading && (
        <InnerApprovalProposalLine {...props} proposal={loadingProposal.data} />
      )}
    </SuspenseLoader>
  )
}

const InnerApprovalProposalLine = ({
  proposal,
  ...props
}: BaseProposalLineProps & {
  proposal: ApprovalProposalWithMetadata<MultipleChoiceApprovalProposal>
}) => {
  const {
    proposalModule: { prefix: proposalPrefix },
    proposalNumber,
  } = useProposalModuleAdapterOptions()

  return (
    <StatelessProposalLine
      Status={(props) => (
        <ApprovalProposalStatus {...props} status={proposal.status} />
      )}
      approvalContext={{
        type: ApprovalProposalContextType.Approval,
        status: keyFromPreProposeStatus(proposal.status),
      }}
      proposalNumber={proposalNumber}
      proposalPrefix={proposalPrefix + '*'}
      timestampDisplay={proposal.timestampDisplay}
      title={proposal.msg.title}
      vote={undefined}
      {...props}
    />
  )
}
