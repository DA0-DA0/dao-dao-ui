// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useMemo } from 'react'

import { SuspenseLoader, useDaoInfoContext } from '@dao-dao/common'
import { matchAndLoadCommon } from '@dao-dao/proposal-module-adapter'
import {
  HorizontalInfo,
  HorizontalInfoSection,
  Loader,
  Logo,
} from '@dao-dao/ui'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'

export const DaoThinInfo = () => (
  <SuspenseLoader
    fallback={
      <HorizontalInfo>
        <HorizontalInfoSection />
      </HorizontalInfo>
    }
  >
    <InnerDaoThinInfo />
  </SuspenseLoader>
)

const InnerDaoThinInfo = () => {
  const {
    components: { DaoThinInfoContent },
  } = useVotingModuleAdapter()
  const { coreAddress, proposalModules } = useDaoInfoContext()

  const useProposalCountHooks = useMemo(
    () =>
      proposalModules.map(
        (proposalModule) =>
          matchAndLoadCommon(proposalModule, {
            coreAddress,
            Loader,
            Logo,
          }).hooks.useProposalCount
      ),
    [coreAddress, proposalModules]
  )

  // Always called in the same order, so this is safe.
  const proposalCount = useProposalCountHooks.reduce(
    // eslint-disable-next-line react-hooks/rules-of-hooks
    (acc, useProposalCount) => acc + useProposalCount(),
    0
  )

  return <DaoThinInfoContent proposalCount={proposalCount} />
}
