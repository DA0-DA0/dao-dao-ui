// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useWallet } from '@noahsaso/cosmodal'
import type { GetStaticPaths, NextPage } from 'next'
import React, { useMemo } from 'react'
import { useRecoilValue, waitForAll } from 'recoil'

import {
  DaoInfoBar,
  DaoPageWrapper,
  DaoPageWrapperProps,
  useDaoInfoContext,
} from '@dao-dao/common'
import { makeGetDaoStaticProps } from '@dao-dao/common/server'
import { matchAndLoadCommon } from '@dao-dao/proposal-module-adapter'
import {
  usePinnedDaos,
  useVotingModule,
  useWalletProfile,
} from '@dao-dao/state'
import { CheckedDepositInfo } from '@dao-dao/state/clients/cw-proposal-single'
import {
  DaoHome,
  Loader,
  Logo,
  ProfileDisconnectedCard,
  ProfileMemberCard,
  ProfileNotMemberCard,
  useAppLayoutContext,
} from '@dao-dao/ui'
import { SITE_URL } from '@dao-dao/utils'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'

import { ProposalsTab, SubDaosTab, TreasuryAndNftsTab } from '@/components'

const InnerDaoHome = () => {
  const { connected } = useWallet()
  const { walletAddress = '', walletProfile } = useWalletProfile()
  const { updateProfile } = useAppLayoutContext()

  const daoInfo = useDaoInfoContext()
  const {
    components: {
      MembersTab,
      ProfileCardNotMemberInfo,
      ProfileMemberCardMembershipInfo,
    },
  } = useVotingModuleAdapter()
  const { isMember } = useVotingModule(daoInfo.coreAddress, {
    fetchMembership: true,
  })

  const depositInfoSelectors = useMemo(
    () =>
      daoInfo.proposalModules.map(
        (proposalModule) =>
          matchAndLoadCommon(proposalModule, {
            coreAddress: daoInfo.coreAddress,
            Loader,
            Logo,
          }).selectors.depositInfo
      ),
    [daoInfo.coreAddress, daoInfo.proposalModules]
  )
  const proposalModuleDepositInfos = useRecoilValue(
    waitForAll(depositInfoSelectors)
  ).filter(Boolean) as CheckedDepositInfo[]

  const maxProposalModuleDeposit = Math.max(
    ...proposalModuleDepositInfos.map(({ deposit }) => Number(deposit)),
    0
  )

  const { isPinned, setPinned, setUnpinned } = usePinnedDaos()
  const pinned = isPinned(daoInfo.coreAddress)

  return (
    <DaoHome
      daoInfo={daoInfo}
      daoInfoBar={<DaoInfoBar />}
      membersTab={MembersTab && <MembersTab />}
      onPin={() =>
        pinned
          ? setUnpinned(daoInfo.coreAddress)
          : setPinned(daoInfo.coreAddress)
      }
      pinned={pinned}
      proposalsTab={<ProposalsTab />}
      rightSidebarContent={
        connected ? (
          isMember ? (
            <ProfileMemberCard
              daoName={daoInfo.name}
              established={
                // TODO: Retrieve.
                new Date()
              }
              membershipInfo={
                <ProfileMemberCardMembershipInfo
                  deposit={
                    maxProposalModuleDeposit > 0
                      ? maxProposalModuleDeposit.toString()
                      : undefined
                  }
                />
              }
              showUpdateProfile={updateProfile.toggle}
              walletAddress={walletAddress}
              walletProfile={walletProfile}
            />
          ) : (
            <ProfileNotMemberCard
              daoName={daoInfo.name}
              established={new Date()}
              notMemberInfo={
                <ProfileCardNotMemberInfo
                  deposit={
                    maxProposalModuleDeposit > 0
                      ? maxProposalModuleDeposit.toString()
                      : undefined
                  }
                  proposalContext={false}
                />
              }
              showUpdateProfile={updateProfile.toggle}
              walletAddress={walletAddress}
              walletProfile={walletProfile}
            />
          )
        ) : (
          <ProfileDisconnectedCard />
        )
      }
      subDaosTab={<SubDaosTab />}
      treasuryAndNftsTab={<TreasuryAndNftsTab />}
    />
  )
}

const DaoHomePage: NextPage<DaoPageWrapperProps> = ({
  children: _,
  ...props
}) => (
  <DaoPageWrapper {...props}>
    <InnerDaoHome />
  </DaoPageWrapper>
)

export default DaoHomePage

// Fallback to loading screen if page has not yet been statically generated.
export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: true,
})

export const getStaticProps = makeGetDaoStaticProps({
  getProps: async ({ coreAddress }) => ({
    url: `${SITE_URL}/dao/${coreAddress}`,
  }),
})
