// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useWallet } from '@noahsaso/cosmodal'
import type { GetStaticPaths, NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValueLoadable, waitForAll } from 'recoil'

import { DaoCoreV2Selectors } from '@dao-dao/state'
import {
  DaoInfoBar,
  DaoPageWrapper,
  DaoPageWrapperProps,
  DiscordNotifierConfigureModal,
  LinkWrapper,
  ProfileDisconnectedCard,
  ProposalsTab,
  SubDaosTab,
  SuspenseLoader,
  TreasuryAndNftsTab,
  useEncodedDaoProposalSinglePrefill,
  useFollowingDaos,
  useMembership,
  useWalletInfo,
} from '@dao-dao/stateful'
import { useCoreActionForKey } from '@dao-dao/stateful/actions'
import { usePayrollAdapter } from '@dao-dao/stateful/payroll'
import { matchAndLoadCommon } from '@dao-dao/stateful/proposal-module-adapter'
import { makeGetDaoStaticProps } from '@dao-dao/stateful/server'
import { useVotingModuleAdapter } from '@dao-dao/stateful/voting-module-adapter'
import {
  DaoHome,
  Loader,
  ProfileMemberCard,
  ProfileNotMemberCard,
  useAppLayoutContext,
  useCachedLoadable,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import { CoreActionKey } from '@dao-dao/types'
import { CheckedDepositInfo } from '@dao-dao/types/contracts/common'
import { SITE_URL } from '@dao-dao/utils'

const InnerDaoHome = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { connected } = useWallet()
  const { walletProfile, updateProfileName } = useWalletInfo()
  const { updateProfileNft } = useAppLayoutContext()

  const daoInfo = useDaoInfoContext()
  const {
    components: { MembersTab, ProfileCardMemberInfo },
  } = useVotingModuleAdapter()
  const { isMember } = useMembership(daoInfo)

  // If no parent, fallback to current address since it's already loaded from
  // the above hook. We won't use this value unless there's a parent. It's
  // redundant but has no effect.
  const { isMember: isMemberOfParent } = useMembership(
    daoInfo.parentDao ?? daoInfo
  )
  const parentDaosSubDaosLoadable = useRecoilValueLoadable(
    daoInfo.parentDao
      ? DaoCoreV2Selectors.listAllSubDaosSelector({
          contractAddress: daoInfo.parentDao.coreAddress,
        })
      : constSelector(undefined)
  )
  const manageSubDaosAction = useCoreActionForKey(CoreActionKey.ManageSubDaos)
  // Prefill URL only valid if action exists.
  const prefillValid = !!manageSubDaosAction
  const encodedAddSubDaoProposalPrefill = useEncodedDaoProposalSinglePrefill(
    manageSubDaosAction
      ? {
          title: t('title.recognizeSubDao', {
            name: daoInfo.name,
          }),
          description: t('info.recognizeSubDaoDescription', {
            name: daoInfo.name,
          }),
          actions: [
            {
              action: manageSubDaosAction,
              data: {
                toAdd: [
                  {
                    addr: daoInfo.coreAddress,
                  },
                ],
                toRemove: [],
              },
            },
          ],
        }
      : { actions: [] }
  )
  const addSubDaoProposalPrefillHref =
    prefillValid && daoInfo.parentDao && encodedAddSubDaoProposalPrefill
      ? `/dao/${daoInfo.parentDao.coreAddress}/proposals/create?prefill=${encodedAddSubDaoProposalPrefill}`
      : undefined
  useEffect(() => {
    if (!addSubDaoProposalPrefillHref) {
      return
    }
    router.prefetch(addSubDaoProposalPrefillHref)
  }, [addSubDaoProposalPrefillHref, router])
  // Notify if parent has not yet added subDAO.
  useEffect(() => {
    if (
      daoInfo.parentDao &&
      parentDaosSubDaosLoadable.state === 'hasValue' &&
      parentDaosSubDaosLoadable.contents &&
      !parentDaosSubDaosLoadable.contents.some(
        ({ addr }) => addr === daoInfo.coreAddress
      )
    ) {
      if (isMemberOfParent && addSubDaoProposalPrefillHref) {
        toast(
          <p
            className="cursor-pointer transition-opacity hover:opacity-80 active:opacity-70"
            onClick={() => router.push(addSubDaoProposalPrefillHref)}
          >
            {t('info.subDaoNeedsAdding', {
              parent: daoInfo.parentDao.name,
              child: daoInfo.name,
            })}{' '}
            <span className="underline">
              {t('button.clickHereToProposeAdding')}
            </span>
          </p>
        )
      } else {
        toast.success(
          t('info.subDaoNeedsAdding', {
            parent: daoInfo.parentDao.name,
            child: daoInfo.name,
          })
        )
      }
    }
  }, [
    addSubDaoProposalPrefillHref,
    daoInfo.coreAddress,
    daoInfo.name,
    daoInfo.parentDao,
    encodedAddSubDaoProposalPrefill,
    isMemberOfParent,
    parentDaosSubDaosLoadable.contents,
    parentDaosSubDaosLoadable.state,
    router,
    t,
  ])

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

  const { isFollowing, setFollowing, setUnfollowing, updatingFollowing } =
    useFollowingDaos()
  const following = isFollowing(daoInfo.coreAddress)

  // Get payroll tab component, if exists.
  const PayrollTab = usePayrollAdapter()?.PayrollTab

  const [showConfigureModal, setShowConfigureModal] = useState(false)

  return (
    <>
      <DaoHome
        LinkWrapper={LinkWrapper}
        SuspenseLoader={SuspenseLoader}
        daoInfo={daoInfo}
        daoInfoBar={<DaoInfoBar />}
        following={following}
        membersTab={MembersTab && <MembersTab />}
        onConfigure={() => setShowConfigureModal(true)}
        onFollow={() =>
          following
            ? setUnfollowing(daoInfo.coreAddress)
            : setFollowing(daoInfo.coreAddress)
        }
        payrollTab={PayrollTab && <PayrollTab />}
        proposalsTab={<ProposalsTab />}
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
        subDaosTab={<SubDaosTab />}
        treasuryAndNftsTab={<TreasuryAndNftsTab />}
        updatingFollowing={updatingFollowing}
      />

      <DiscordNotifierConfigureModal
        onClose={() => setShowConfigureModal(false)}
        open={() => setShowConfigureModal(true)}
        visible={showConfigureModal}
      />
    </>
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
