import { GovProposalsTab as StatelessGovProposalsTab } from '@dao-dao/stateless'

import { GovActionsProvider } from '../../actions'
import { ButtonLink } from '../ButtonLink'
import { GovProposalList } from './GovProposalList'

export const GovProposalsTab = () => (
  <GovActionsProvider>
    <StatelessGovProposalsTab
      ButtonLink={ButtonLink}
      ProposalList={GovProposalList}
    />
  </GovActionsProvider>
)
