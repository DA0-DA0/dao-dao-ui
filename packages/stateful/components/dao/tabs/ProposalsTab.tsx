import {
  ProposalsTab as StatelessProposalsTab,
  useDaoInfoContext,
} from '@dao-dao/stateless'

import { useVotingModule } from '../../../hooks'
import { ButtonLink } from '../../ButtonLink'
import { ProposalList } from '../../ProposalList'

export const ProposalsTab = () => {
  const daoInfo = useDaoInfoContext()
  const { isMember = false } = useVotingModule(daoInfo.coreAddress, {
    fetchMembership: true,
  })

  return (
    <StatelessProposalsTab
      ButtonLink={ButtonLink}
      daoInfo={daoInfo}
      isMember={isMember}
      proposalList={<ProposalList />}
    />
  )
}
