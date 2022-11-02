// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useVotingModule } from '@dao-dao/state'
import { ButtonLink, ProposalList } from '@dao-dao/stateful'
import {
  ProposalsTab as StatelessProposalsTab,
  useDaoInfoContext,
} from '@dao-dao/stateless'

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
