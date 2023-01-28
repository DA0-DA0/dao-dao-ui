// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useWallet } from '@noahsaso/cosmodal'
import type { GetStaticPaths, NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { waitForAll } from 'recoil'

import {
  DiscordNotifierConfigureModal,
  ProfileDisconnectedCard,
  SuspenseLoader,
  useDaoTabs,
  useMembership,
  useWalletInfo,
} from '@dao-dao/stateful'
import { matchAndLoadCommon } from '@dao-dao/stateful/proposal-module-adapter'
import { makeGetDaoStaticProps } from '@dao-dao/stateful/server'
import { useVotingModuleAdapter } from '@dao-dao/stateful/voting-module-adapter'
import {
  DaoWrappedTab,
  Loader,
  ProfileMemberCard,
  ProfileNotMemberCard,
  useAppLayoutContext,
  useCachedLoadable,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import { DaoPageMode, DaoTabId } from '@dao-dao/types'
import { CheckedDepositInfo } from '@dao-dao/types/contracts/common'
import { SITE_URL, getDaoPath } from '@dao-dao/utils'

const DaoHomePage: NextPage = () => {
  const router = useRouter()
  const { connected } = useWallet()
  const { walletProfile, updateProfileName } = useWalletInfo()
  const { updateProfileNft } = useAppLayoutContext()

  const daoInfo = useDaoInfoContext()
  const {
    components: { ProfileCardMemberInfo },
  } = useVotingModuleAdapter()
  const { isMember } = useMembership(daoInfo)

  const depositInfoSelectors = useMemo(
    () =>
      daoInfo.proposalModules.map(
        (proposalModule) =>
          matchAndLoadCommon(proposalModule, {
            chainId: daoInfo.chainId,
            coreAddress: daoInfo.coreAddress,
          }).selectors.depositInfo
      ),
    [daoInfo.chainId, daoInfo.coreAddress, daoInfo.proposalModules]
  )
  const proposalModuleDepositInfosLoadable = useCachedLoadable(
    waitForAll(depositInfoSelectors)
  )

  const maxProposalModuleDeposit =
    proposalModuleDepositInfosLoadable.state !== 'hasValue'
      ? 0
      : Math.max(
          ...(
            proposalModuleDepositInfosLoadable.contents.filter(
              Boolean
            ) as CheckedDepositInfo[]
          ).map(({ amount }) => Number(amount)),
          0
        )

  const tabs = useDaoTabs({ includeSdaHome: true })
  const tab =
    tabs.find((tab) => tab.id === router.asPath.split('#')[1]) || tabs[0]

  return (
    <DaoWrappedTab
      DiscordNotifierConfigureModal={DiscordNotifierConfigureModal}
      SuspenseLoader={SuspenseLoader}
      rightSidebarContent={
        connected ? (
          // If membership not yet loaded, show loading skeleton.
          isMember === undefined ? (
            <ProfileDisconnectedCard className="animate-pulse" />
          ) : isMember ? (
            <ProfileMemberCard
              daoName={daoInfo.name}
              membershipInfo={
                <SuspenseLoader fallback={<Loader size={24} />}>
                  <ProfileCardMemberInfo
                    deposit={
                      maxProposalModuleDeposit > 0
                        ? maxProposalModuleDeposit.toString()
                        : undefined
                    }
                  />
                </SuspenseLoader>
              }
              showUpdateProfileNft={updateProfileNft.toggle}
              updateProfileName={updateProfileName}
              walletProfile={walletProfile}
            />
          ) : (
            <ProfileNotMemberCard
              daoName={daoInfo.name}
              membershipInfo={
                <SuspenseLoader fallback={<Loader size={24} />}>
                  <ProfileCardMemberInfo
                    deposit={
                      maxProposalModuleDeposit > 0
                        ? maxProposalModuleDeposit.toString()
                        : undefined
                    }
                  />
                </SuspenseLoader>
              }
              showUpdateProfileNft={updateProfileNft.toggle}
              updateProfileName={updateProfileName}
              walletProfile={walletProfile}
            />
          )
        ) : (
          <ProfileDisconnectedCard />
        )
      }
      showDiscordNotifierConfigureModal={
        // Only show notifier configure modal if the user is viewing the
        // proposals tab.
        tab.id === DaoTabId.Proposals
      }
      tab={tab}
    />
  )
}

export default DaoHomePage

// Fallback to loading screen if page has not yet been statically generated.
export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: true,
})

export const getStaticProps = makeGetDaoStaticProps({
  getProps: async ({ coreAddress }) => ({
    url: SITE_URL + getDaoPath(DaoPageMode.Sda, coreAddress),
  }),
})
