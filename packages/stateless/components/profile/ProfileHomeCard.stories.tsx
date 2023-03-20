import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  WALLET_PROFILE_DATA,
  WALLET_PROFILE_DATA_LOADING,
} from '@dao-dao/storybook'

import { ProfileHomeCard } from './ProfileHomeCard'

export default {
  title:
    'DAO DAO / packages / stateless / components / profile / ProfileHomeCard',
  component: ProfileHomeCard,
} as ComponentMeta<typeof ProfileHomeCard>

const Template: ComponentStory<typeof ProfileHomeCard> = (args) => (
  <div className="max-w-xs">
    <ProfileHomeCard {...args} />
  </div>
)

export const Default = Template.bind({})
// Wallet details are used in other story files, like `SidebarWallet` and
// `makeDappLayoutDecorator`.
Default.args = {
  walletProfileData: WALLET_PROFILE_DATA,
  tokenSymbol: 'JUNO',
  inboxPendingCount: 5,
  lazyData: {
    loading: false,
    data: {
      unstakedBalance: 2400.111111,
      stakedBalance: 1603,
      dateBalancesFetched: new Date(),
    },
  },
  loadingStats: {
    loading: false,
    data: {
      proposalsCreated: 23,
      votesCast: 234,
    },
  },
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=93%3A18610',
  },
}

export const Loading = Template.bind({})
// Wallet details are used in other story files, like `SidebarWallet` and
// `makeDappLayoutDecorator`.
Loading.args = {
  ...Default.args,
  walletProfileData: WALLET_PROFILE_DATA_LOADING,
  lazyData: {
    loading: true,
  },
  loadingStats: {
    loading: true,
  },
}
