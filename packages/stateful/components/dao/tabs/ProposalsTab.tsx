import {
  ProposalsTab as StatelessProposalsTab,
  useDaoInfoContext,
} from '@dao-dao/stateless'

import { ButtonLink } from '../../ButtonLink'
import { ProposalList } from '../../ProposalList'

export const ProposalsTab = () => {
  const daoInfo = useDaoInfoContext()

  return (
    <StatelessProposalsTab
      ButtonLink={ButtonLink}
      ProposalList={ProposalList}
      daoInfo={daoInfo}
    />
  )
}
