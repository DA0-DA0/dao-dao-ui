import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  WalletProviderDecorator,
  makeDappLayoutDecorator,
} from '@dao-dao/storybook/decorators'

import {
  ConnectWallet,
  ConnectWalletProps,
  ProfileDisconnectedCard,
  ProfileDisconnectedCardProps,
} from '../components'
import { Default as ProfileDisconnectedCardStory } from '../components/profile/ProfileDisconnectedCard.stories'
import { Default as ConnectWalletStory } from '../components/wallet/ConnectWallet.stories'
import { WalletDisconnected } from './WalletDisconnected'

export default {
  title: 'DAO DAO / packages / stateless / pages / WalletDisconnected',
  component: WalletDisconnected,
  decorators: [WalletProviderDecorator, makeDappLayoutDecorator()],
} as ComponentMeta<typeof WalletDisconnected>

const Template: ComponentStory<typeof WalletDisconnected> = (args) => (
  <WalletDisconnected {...args} />
)

export const Default = Template.bind({})
Default.args = {
  rightSidebarContent: (
    <ProfileDisconnectedCard
      {...(ProfileDisconnectedCardStory.args as ProfileDisconnectedCardProps)}
    />
  ),
  connectWalletButton: (
    <ConnectWallet {...(ConnectWalletStory.args as ConnectWalletProps)} />
  ),
  autoConnecting: false,
}
