import { ProposalContentDisplay } from '@dao-dao/stateless'
import {
  GovProposalVersion,
  GovProposalWithDecodedContent,
} from '@dao-dao/types'
import { govProposalToDecodedContent } from '@dao-dao/utils'

import {
  useEntity,
  useLoadingGovProposal,
  useRefreshGovProposals,
} from '../../hooks'
import { EntityDisplay } from '../EntityDisplay'
import { IconButtonLink } from '../IconButtonLink'
import { GovProposalActionDisplay } from './GovProposalActionDisplay'

export type GovProposalContentDisplayProps = {
  proposal: GovProposalWithDecodedContent
}

export const GovProposalContentDisplay = ({
  proposal,
}: GovProposalContentDisplayProps) => {
  const proposerAddress =
    (proposal.version === GovProposalVersion.V1 &&
      proposal.proposal.proposer) ||
    ''
  const { entity } = useEntity(proposerAddress)

  const loadingProposal = useLoadingGovProposal(proposal.id.toString())
  const refreshProposal = useRefreshGovProposals()

  return (
    <ProposalContentDisplay
      EntityDisplay={EntityDisplay}
      IconButtonLink={IconButtonLink}
      createdAt={proposal.proposal.submitTime}
      creator={
        proposerAddress
          ? {
              address: proposerAddress,
              entity,
            }
          : undefined
      }
      description={proposal.description.replace(/\\n/g, '\n')}
      innerContentDisplay={
        <GovProposalActionDisplay
          content={govProposalToDecodedContent(proposal)}
        />
      }
      onRefresh={refreshProposal}
      refreshing={loadingProposal.loading || !!loadingProposal.updating}
      title={proposal.title}
    />
  )
}
