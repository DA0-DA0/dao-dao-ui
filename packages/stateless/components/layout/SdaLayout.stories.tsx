import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useMemo, useState } from 'react'

import {
  EMPTY_DAO_WEB_SOCKET,
  EMPTY_INBOX,
} from '@dao-dao/storybook/decorators'
import {
  DaoPageMode,
  IAppLayoutContext,
  PageHeaderProps,
  SdaLayoutProps,
  SdaNavigationProps,
} from '@dao-dao/types'

import { ConnectWallet, ConnectWalletProps } from '../wallet'
import { Default as ConnectWalletStory } from '../wallet/ConnectWallet.stories'
import { PageHeader } from './PageHeader'
import { Default as PageHeaderStory } from './PageHeader.stories'
import { DefaultArgs as RightSidebarStoryArgs } from './RightSidebar.stories'
import { SdaLayout } from './SdaLayout'
import { Default as SdaNavigationStory } from './SdaNavigation.stories'

export default {
  title: 'DAO DAO / packages / stateless / components / layout / SdaLayout',
  component: SdaLayout,
  excludeStories: ['DefaultArgs'],
} as ComponentMeta<typeof SdaLayout>

export const DefaultArgs: SdaLayoutProps = {
  navigationProps: SdaNavigationStory.args as SdaNavigationProps,
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
    mode: DaoPageMode.Sda,
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
    daoWebSocket: EMPTY_DAO_WEB_SOCKET,
  },
  connect: () => alert('connect'),
  connected: true,
  connectWalletButton: (
    <ConnectWallet {...(ConnectWalletStory.args as ConnectWalletProps)} />
  ),
}

const Template: ComponentStory<typeof SdaLayout> = (args) => {
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
      mode: DaoPageMode.Sda,
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
      daoWebSocket: EMPTY_DAO_WEB_SOCKET,
    }),
    [
      responsiveNavigationEnabled,
      responsiveRightSidebarEnabled,
      updateProfileVisible,
    ]
  )

  return (
    <SdaLayout
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
