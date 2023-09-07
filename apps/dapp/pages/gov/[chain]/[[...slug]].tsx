// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import {
  AccountBalanceWalletOutlined,
  HowToVoteOutlined,
} from '@mui/icons-material'
import type { GetStaticPaths, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import { walletChainIdAtom } from '@dao-dao/state'
import {
  ChainSwitcher,
  GovCommunityPoolTab,
  GovInfoBar,
  GovPageWrapper,
  GovPageWrapperProps,
  GovProposalsTab,
  LinkWrapper,
  ProfileHomeCard,
  SuspenseLoader,
} from '@dao-dao/stateful'
import { makeGetGovStaticProps } from '@dao-dao/stateful/server'
import {
  DaoDappTabbedHome,
  useDaoInfoContext,
  useSupportedChainContext,
} from '@dao-dao/stateless'
import { ChainId, DaoTabId, DaoTabWithComponent } from '@dao-dao/types'
import {
  SITE_URL,
  getGovPath,
  getSupportedChainConfig,
  getSupportedChains,
} from '@dao-dao/utils'

const InnerGovHome = () => {
  const { t } = useTranslation()
  const { chainId, config } = useSupportedChainContext()
  const daoInfo = useDaoInfoContext()

  // Update wallet chain ID to the current chain.
  const setWalletChainId = useSetRecoilState(walletChainIdAtom)
  useEffect(() => setWalletChainId(chainId), [chainId, setWalletChainId])

  const router = useRouter()

  const tabs: DaoTabWithComponent[] = useRef([
    {
      id: DaoTabId.Proposals,
      label: t('title.proposals'),
      Component: GovProposalsTab,
      Icon: HowToVoteOutlined,
    },
    {
      id: DaoTabId.Treasury,
      label: t('title.communityPool'),
      Component: GovCommunityPoolTab,
      Icon: AccountBalanceWalletOutlined,
    },
  ]).current
  const firstTabId = tabs[0].id

  // Pre-fetch tabs.
  useEffect(() => {
    tabs.forEach((tab) => {
      router.prefetch(getGovPath(config.name, tab.id))
    })
  }, [config.name, router, tabs])

  const slug = (router.query.slug || []) as string[]
  useEffect(() => {
    // If no slug, redirect to first tab.
    if (slug.length === 0) {
      router.push(getGovPath(config.name, firstTabId), undefined, {
        shallow: true,
      })
    }
  }, [router, slug.length, firstTabId, config.name])

  const tabId =
    slug.length > 0 && tabs.some(({ id }) => id === slug[0])
      ? slug[0]
      : // If tab is invalid, default to first tab.
        firstTabId
  const onSelectTabId = (tabId: string) =>
    router.push(getGovPath(config.name, tabId), undefined, {
      shallow: true,
    })

  const [goingToChainId, setGoingToChainId] = useState<string>()
  // Pre-fetch other chains.
  useEffect(() => {
    getSupportedChains().forEach(({ name }) => {
      router.prefetch(getGovPath(name))
      tabs.map((tab) => router.prefetch(getGovPath(name, tab.id)))
    })
  }, [router, tabs])

  return (
    <DaoDappTabbedHome
      DaoInfoBar={GovInfoBar}
      LinkWrapper={LinkWrapper}
      SuspenseLoader={SuspenseLoader}
      breadcrumbsOverride={
        <ChainSwitcher
          excludeChainIds={[
            // TODO(neutron-gov): remove this once the gov page supports Neutron
            // Neutron does not use the native governance module.
            ChainId.NeutronMainnet,
          ]}
          loading={!!goingToChainId && goingToChainId !== chainId}
          onSelect={(chainId) => {
            router.push(
              getGovPath(
                getSupportedChainConfig(chainId)?.name || config.name,
                tabId
              )
            )
            setGoingToChainId(chainId)
          }}
        />
      }
      daoInfo={daoInfo}
      onSelectTabId={onSelectTabId}
      rightSidebarContent={<ProfileHomeCard />}
      selectedTabId={tabId}
      tabs={tabs}
    />
  )
}

const GovHomePage: NextPage<GovPageWrapperProps> = ({
  children: _,
  ...props
}) => (
  <GovPageWrapper {...props}>
    <InnerGovHome />
  </GovPageWrapper>
)

export default GovHomePage

// Fallback to loading screen if page has not yet been statically generated.
export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: true,
})

export const getStaticProps = makeGetGovStaticProps({
  getProps: async ({ chainName }) => ({
    url: SITE_URL + getGovPath(chainName),
  }),
})
