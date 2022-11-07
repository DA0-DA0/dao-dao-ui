// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useWallet } from '@noahsaso/cosmodal'
import type { GetStaticPaths, NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import {
  constSelector,
  useRecoilValue,
  useRecoilValueLoadable,
  waitForAll,
} from 'recoil'

import { CwdCoreV2Selectors } from '@dao-dao/state'
import {
  DaoInfoBar,
  DaoPageWrapper,
  DaoPageWrapperProps,
  ProposalsTab,
  SubDaosTab,
  SuspenseLoader,
  TreasuryAndNftsTab,
  useEncodedCwdProposalSinglePrefill,
  usePinnedDaos,
  useVotingModule,
  useWalletProfile,
} from '@dao-dao/stateful'
import { useActionForKey } from '@dao-dao/stateful/actions'
import { matchAndLoadCommon } from '@dao-dao/stateful/proposal-module-adapter'
import { makeGetDaoStaticProps } from '@dao-dao/stateful/server'
import { useVotingModuleAdapter } from '@dao-dao/stateful/voting-module-adapter'
import {
  DaoHome,
  ProfileDisconnectedCard,
  ProfileMemberCard,
  ProfileNotMemberCard,
  useAppLayoutContext,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import { ActionKey } from '@dao-dao/types'
import { CheckedDepositInfo } from '@dao-dao/types/contracts/common'
import { SITE_URL } from '@dao-dao/utils'

const InnerDaoHome = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { connected } = useWallet()
  const { walletProfile, updateProfileName } = useWalletProfile()
  const { updateProfileNft } = useAppLayoutContext()

  const daoInfo = useDaoInfoContext()
  const {
    components: { MembersTab, ProfileCardMemberInfo },
  } = useVotingModuleAdapter()
  const { isMember } = useVotingModule(daoInfo.coreAddress, {
    fetchMembership: true,
  })

  // If no parent, fallback to current address since it's already loaded from
  // the above hook. We won't use this value unless there's a parent. It's
  // redundant but has no effect.
  const { isMember: isMemberOfParent } = useVotingModule(
    daoInfo.parentDao?.coreAddress ?? daoInfo.coreAddress,
    {
      fetchMembership: true,
    }
  )
  const parentDaosSubDaosLoadable = useRecoilValueLoadable(
    daoInfo.parentDao
      ? CwdCoreV2Selectors.listAllSubDaosSelector({
          contractAddress: daoInfo.parentDao.coreAddress,
        })
      : constSelector(undefined)
  )
  const manageSubDaosAction = useActionForKey(ActionKey.ManageSubDaos)
  // Prefill URL only valid if action exists.
  const prefillValid = !!manageSubDaosAction
  const encodedAddSubDaoProposalPrefill = useEncodedCwdProposalSinglePrefill(
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
  const proposalModuleDepositInfos = useRecoilValue(
    waitForAll(depositInfoSelectors)
  ).filter(Boolean) as CheckedDepositInfo[]

  const maxProposalModuleDeposit = Math.max(
    ...proposalModuleDepositInfos.map(({ amount }) => Number(amount)),
    0
  )

  const { isPinned, setPinned, setUnpinned } = usePinnedDaos()
  const pinned = isPinned(daoInfo.coreAddress)

  return (
    <DaoHome
      SuspenseLoader={SuspenseLoader}
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
              membershipInfo={
                <ProfileCardMemberInfo
                  deposit={
                    maxProposalModuleDeposit > 0
                      ? maxProposalModuleDeposit.toString()
                      : undefined
                  }
                />
              }
              showUpdateProfileNft={updateProfileNft.toggle}
              updateProfileName={updateProfileName}
              walletProfile={walletProfile}
            />
          ) : (
            <ProfileNotMemberCard
              daoName={daoInfo.name}
              established={new Date()}
              membershipInfo={
                <ProfileCardMemberInfo
                  deposit={
                    maxProposalModuleDeposit > 0
                      ? maxProposalModuleDeposit.toString()
                      : undefined
                  }
                />
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
