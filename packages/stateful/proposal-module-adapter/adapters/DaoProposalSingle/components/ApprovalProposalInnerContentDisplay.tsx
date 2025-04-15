import { ActionCardLoader } from '@dao-dao/stateless'

import { SuspenseLoader } from '../../../../components'
import { useLoadingApprovalProposal } from '../hooks/useLoadingApprovalProposal'
import { ProposalMessagesDisplay } from './ProposalMessagesDisplay'

export const ApprovalProposalInnerContentDisplay = () => {
  const loadingProposal = useLoadingApprovalProposal()

  return (
    <SuspenseLoader
      fallback={<ActionCardLoader />}
      forceFallback={loadingProposal.loading}
    >
      {!loadingProposal.loading && (
        <ProposalMessagesDisplay messages={loadingProposal.data.msg.msgs} />
      )}
    </SuspenseLoader>
  )
}
