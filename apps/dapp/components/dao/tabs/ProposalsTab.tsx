// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { ProposalList, useDaoInfoContext } from '@dao-dao/common'
import { useVotingModule } from '@dao-dao/state'
import { ProposalsTab as StatelessProposalsTab } from '@dao-dao/ui'

export const ProposalsTab = () => {
  const daoInfo = useDaoInfoContext()
  const { isMember = false } = useVotingModule(daoInfo.coreAddress, {
    fetchMembership: true,
  })

  return (
    <StatelessProposalsTab
      daoInfo={daoInfo}
      isMember={isMember}
      // TODO: Display for different proposal modules? Or remove.
      proposalDeposit={undefined}
      proposalList={<ProposalList />}
    />
  )
}
