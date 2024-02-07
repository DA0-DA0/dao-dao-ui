import {
  LineLoaders,
  GovProposalsTab as StatelessGovProposalsTab,
} from '@dao-dao/stateless'

import { GovActionsProvider } from '../../actions'
import { ButtonLink } from '../ButtonLink'
import { GovProposalList } from './GovProposalList'

export const GovProposalsTab = () => (
  <GovActionsProvider loader={<LineLoaders lines={20} type="proposal" />}>
    <StatelessGovProposalsTab
      ButtonLink={ButtonLink}
      ProposalList={GovProposalList}
    />
  </GovActionsProvider>
)
