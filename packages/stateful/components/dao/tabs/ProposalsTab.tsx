import {
  ProposalsTab as StatelessProposalsTab,
  useDaoInfoContext,
} from '@dao-dao/stateless'

import { useMembership } from '../../../hooks'
import { ButtonLink } from '../../ButtonLink'
import { ProposalList } from '../../ProposalList'

export const ProposalsTab = () => {
  const daoInfo = useDaoInfoContext()
  const { isMember = false } = useMembership(daoInfo)

  return (
    <StatelessProposalsTab
      ButtonLink={ButtonLink}
      daoInfo={daoInfo}
      isMember={isMember}
      proposalList={<ProposalList />}
    />
  )
}
