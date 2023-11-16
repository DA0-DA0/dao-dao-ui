import {
  PreProposeProposalStatus,
  ProposalLineLoader,
  ProposalLine as StatelessProposalLine,
} from '@dao-dao/stateless'
import { BaseProposalLineProps } from '@dao-dao/types'

import { SuspenseLoader } from '../../../../components'
import { useProposalModuleAdapterOptions } from '../../../react'
import { useLoadingPreProposeProposal } from '../hooks'
import { PreProposeProposalWithMeteadata } from '../types'

export const PreProposeProposalLine = (props: BaseProposalLineProps) => {
  const loadingProposal = useLoadingPreProposeProposal()

  return (
    <SuspenseLoader
      fallback={<ProposalLineLoader />}
      forceFallback={loadingProposal.loading}
    >
      {!loadingProposal.loading && (
        <InnerProposalLine {...props} proposal={loadingProposal.data} />
      )}
    </SuspenseLoader>
  )
}

const InnerProposalLine = ({
  proposal,
  ...props
}: BaseProposalLineProps & {
  proposal: PreProposeProposalWithMeteadata
}) => {
  const {
    proposalModule: { prefix: proposalPrefix },
    proposalNumber,
  } = useProposalModuleAdapterOptions()

  return (
    <StatelessProposalLine
      Status={({ dimmed }) => (
        <PreProposeProposalStatus dimmed={dimmed} status={proposal.status} />
      )}
      proposalNumber={proposalNumber}
      proposalPrefix={proposalPrefix + '*'}
      timestampDisplay={proposal.timestampDisplay}
      title={proposal.msg.title}
      vote={undefined}
      votingOpen={false}
      {...props}
    />
  )
}
