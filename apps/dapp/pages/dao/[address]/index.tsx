// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useWallet } from '@noahsaso/cosmodal'
import axios from 'axios'
import { getAverageColor } from 'fast-average-color-node'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo } from 'react'
import { useRecoilValue, waitForAll } from 'recoil'

import {
  DaoInfoBar,
  DaoPageWrapper,
  DaoPageWrapperProps,
  useDaoInfoContext,
} from '@dao-dao/common'
import { makeGetDaoStaticProps } from '@dao-dao/common/server'
import { matchAndLoadCommon } from '@dao-dao/proposal-module-adapter'
import { usePinnedDaos, useVotingModule } from '@dao-dao/state'
import { CheckedDepositInfo } from '@dao-dao/state/clients/cw-proposal-single'
import {
  DaoHome,
  Loader,
  Logo,
  ProfileDisconnectedCard,
  ProfileMemberCard,
  ProfileNotMemberCard,
  useThemeContext,
} from '@dao-dao/ui'
import { SITE_URL } from '@dao-dao/utils'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'

import { ProposalsTab, SubDaosTab, TreasuryAndNftsTab } from '@/components'

// TODO: Add 'this is not DAO' if Error parsing into type query failure. Probably in static props.
const InnerDaoHome = () => {
  const {
    connected,
    address: walletAddress = '',
    name: walletName = '',
  } = useWallet()

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
              // TODO: Retrieve.
              established={new Date()}
              membershipInfo={
                <ProfileMemberCardMembershipInfo
                  deposit={
                    maxProposalModuleDeposit > 0
                      ? maxProposalModuleDeposit.toString()
                      : undefined
                  }
                />
              }
              // TODO: Retrieve.
              profileImgUrl={undefined}
              walletAddress={walletAddress}
              walletName={walletName}
            />
          ) : (
            <ProfileNotMemberCard
              daoName={daoInfo.name}
              established={new Date()}
              // TODO: Retrieve.
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
              // TODO: Retrieve.
              profileImgUrl={undefined}
              walletAddress={walletAddress}
              walletName={walletName}
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

interface DaoHomePageProps extends DaoPageWrapperProps {
  accentColor?: string
}

const DaoHomePage: NextPage<DaoHomePageProps> = ({
  accentColor,
  children: _,
  ...props
}) => {
  const { isReady, isFallback } = useRouter()

  const { setAccentColor, theme } = useThemeContext()

  // Only set the accent color if we have enough contrast.
  if (accentColor) {
    const rgb = accentColor
      .replace(/^rgba?\(|\s+|\)$/g, '')
      .split(',')
      .map(Number)
    const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000
    if (
      (theme === 'dark' && brightness < 100) ||
      (theme === 'light' && brightness > 255 - 100)
    ) {
      accentColor = undefined
    }
  }

  useEffect(() => {
    if (!isReady || isFallback) return

    setAccentColor(accentColor)
  }, [accentColor, setAccentColor, isReady, isFallback])

  return (
    <DaoPageWrapper {...props}>
      <InnerDaoHome />
    </DaoPageWrapper>
  )
}

export default DaoHomePage

// Fallback to loading screen if page has not yet been statically generated.
export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: true,
})

export const getStaticProps: GetStaticProps<DaoHomePageProps> =
  makeGetDaoStaticProps({
    getProps: async ({ coreAddress, config: { image_url } }) => {
      const url = `${SITE_URL}/dao/${coreAddress}`

      if (!image_url) {
        return { url }
      }

      try {
        const response = await axios.get(image_url, {
          responseType: 'arraybuffer',
        })
        const buffer = Buffer.from(response.data, 'binary')
        const result = await getAverageColor(buffer)

        return {
          url,
          additionalProps: { accentColor: result.rgb },
        }
      } catch (error) {
        // If fail to load image or get color, don't prevent page render.
        console.error(error)
      }
    },
  })
