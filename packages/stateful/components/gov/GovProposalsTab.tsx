import { GovProposalsTab as StatelessGovProposalsTab } from '@dao-dao/stateless'

import { ButtonLink } from '../ButtonLink'
import { GovProposalList } from './GovProposalList'

export const GovProposalsTab = () => (
  <StatelessGovProposalsTab
    ButtonLink={ButtonLink}
    ProposalList={GovProposalList}
  />
)
