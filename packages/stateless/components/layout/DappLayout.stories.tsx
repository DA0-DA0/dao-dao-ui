import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useMemo, useState } from 'react'

import { EMPTY_INBOX } from '@dao-dao/storybook/decorators'
import {
  DappLayoutProps,
  IAppLayoutContext,
  PageHeaderProps,
} from '@dao-dao/types'

import { ConnectWallet, ConnectWalletProps } from '../wallet'
import { Default as ConnectWalletStory } from '../wallet/ConnectWallet.stories'
import { DappLayout } from './DappLayout'
import { DappNavigationProps } from './DappNavigation'
import { Default as DappNavigatonStory } from './DappNavigation.stories'
import { PageHeader } from './PageHeader'
import { Default as PageHeaderStory } from './PageHeader.stories'
import { DefaultArgs as RightSidebarStoryArgs } from './RightSidebar.stories'

export default {
  title: 'DAO DAO / packages / stateless / components / layout / DappLayout',
  component: DappLayout,
  excludeStories: ['DefaultArgs'],
} as ComponentMeta<typeof DappLayout>

export const DefaultArgs: DappLayoutProps = {
  navigationProps: DappNavigatonStory.args as DappNavigationProps,
  children: (
    <div className="flex h-full flex-col px-6">
      <PageHeader {...(PageHeaderStory.args as PageHeaderProps)} />

      <div className="flex grow items-center justify-center">
        <p>App content</p>
      </div>
    </div>
  ),
  rightSidebarProps: RightSidebarStoryArgs,
  walletProfile: {
    loading: false,
    data: {
      nonce: 0,
      imageUrl: '/noah.jpg',
      name: 'wallet_name',
      nft: null,
    },
  },
  context: {
    responsiveNavigation: {
      enabled: true,
      toggle: () => alert('toggle nav'),
    },
    responsiveRightSidebar: {
      enabled: false,
      toggle: () => alert('toggle right'),
    },
    updateProfileNft: {
      visible: false,
      toggle: () => alert('toggle update'),
    },
    setRootCommandContextMaker: () => {},
    inbox: EMPTY_INBOX,
  },
  connect: () => alert('connect'),
  connected: true,
  connectWalletButton: (
    <ConnectWallet {...(ConnectWalletStory.args as ConnectWalletProps)} />
  ),
}

const Template: ComponentStory<typeof DappLayout> = (args) => {
  const [compact, setCompact] = useState(false)
  const [responsiveNavigationEnabled, setResponsiveNavigationEnabled] =
    useState(false)
  const [responsiveRightSidebarEnabled, setResponsiveRightSidebarEnabled] =
    useState(false)
  const [updateProfileVisible, setUpdateProfileVisible] = useState(false)

  const appLayoutContext: Omit<
    IAppLayoutContext,
    'RightSidebarContent' | 'PageHeader'
  > = useMemo(
    () => ({
      responsiveNavigation: {
        enabled: responsiveNavigationEnabled,
        toggle: () => setResponsiveNavigationEnabled((v) => !v),
      },
      responsiveRightSidebar: {
        enabled: responsiveRightSidebarEnabled,
        toggle: () => setResponsiveRightSidebarEnabled((v) => !v),
      },
      updateProfileNft: {
        visible: updateProfileVisible,
        toggle: () => setUpdateProfileVisible((v) => !v),
      },
      setRootCommandContextMaker: () => {},
      inbox: EMPTY_INBOX,
    }),
    [
      responsiveNavigationEnabled,
      responsiveRightSidebarEnabled,
      updateProfileVisible,
    ]
  )

  return (
    <DappLayout
      {...args}
      context={appLayoutContext}
      navigationProps={{
        ...args.navigationProps,
        compact,
        setCompact,
      }}
    />
  )
}

export const Default = Template.bind({})
Default.args = DefaultArgs
