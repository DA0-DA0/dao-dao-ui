// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import type { GetStaticPaths, NextPage } from 'next'
import { useMemo, useState } from 'react'

import {
  DaoPageWrapper,
  DaoPageWrapperProps,
  SuspenseLoader,
  useDaoInfoContext,
} from '@dao-dao/common'
import { makeGetDaoStaticProps } from '@dao-dao/common/server'
import {
  CwProposalSingleAdapter,
  matchAndLoadCommon,
  matchAdapter as matchProposalModuleAdapter,
} from '@dao-dao/proposal-module-adapter'
import { useVotingModule } from '@dao-dao/state'
import { CreateProposal, Loader, Logo, PageLoader } from '@dao-dao/ui'
import { SITE_URL } from '@dao-dao/utils'

import { ProfileNewProposalCard } from '@/components'

const InnerProposalCreate = () => {
  const daoInfo = useDaoInfoContext()
  const { isMember = false } = useVotingModule(daoInfo.coreAddress, {
    fetchMembership: true,
  })

  const [selectedProposalModule, setSelectedProposalModule] = useState(
    // Default to single choice proposal module or first otherwise.
    daoInfo.proposalModules.find(
      ({ contractName }) =>
        matchProposalModuleAdapter(contractName)?.id ===
        CwProposalSingleAdapter.id
    ) ?? daoInfo.proposalModules[0]
  )

  const SelectedNewProposal = useMemo(
    () =>
      matchAndLoadCommon(selectedProposalModule, {
        coreAddress: daoInfo.coreAddress,
        Loader,
        Logo,
      }).components.NewProposal,
    [daoInfo.coreAddress, selectedProposalModule]
  )

  return (
    <CreateProposal
      daoInfo={daoInfo}
      isMember={isMember}
      newProposal={
        // TODO: Display proposal created card or navigate on success.
        <SelectedNewProposal
          onCreateSuccess={(proposalId) => alert(proposalId)}
        />
      }
      proposalModule={selectedProposalModule}
      rightSidebarContent={
        <ProfileNewProposalCard proposalModule={selectedProposalModule} />
      }
      setProposalModule={setSelectedProposalModule}
    />
  )
}

const ProposalCreatePage: NextPage<DaoPageWrapperProps> = ({
  children: _,
  ...props
}) => (
  <DaoPageWrapper {...props}>
    <SuspenseLoader fallback={<PageLoader />}>
      <InnerProposalCreate />
    </SuspenseLoader>
  </DaoPageWrapper>
)

export default ProposalCreatePage

// Fallback to loading screen if page has not yet been statically
// generated.
export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: true,
})

export const getStaticProps = makeGetDaoStaticProps({
  getProps: ({ t, coreAddress }) => ({
    url: `${SITE_URL}/dao/${coreAddress}/proposals/create`,
    followingTitle: t('title.createAProposal'),
  }),
})
