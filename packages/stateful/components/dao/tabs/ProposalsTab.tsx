import {
  ProposalsTab as StatelessProposalsTab,
  useDaoInfo,
} from '@dao-dao/stateless'

import { ButtonLink } from '../../ButtonLink'
import { ProposalList } from '../../ProposalList'

export const ProposalsTab = () => {
  const daoInfo = useDaoInfo()

  return (
    <StatelessProposalsTab
      ButtonLink={ButtonLink}
      ProposalList={ProposalList}
      daoInfo={daoInfo}
    />
  )
}
