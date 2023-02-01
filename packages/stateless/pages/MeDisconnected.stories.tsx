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
import { MeDisconnected } from './MeDisconnected'

export default {
  title: 'DAO DAO / packages / stateless / pages / MeDisconnected',
  component: MeDisconnected,
  decorators: [WalletProviderDecorator, makeDappLayoutDecorator()],
} as ComponentMeta<typeof MeDisconnected>

const Template: ComponentStory<typeof MeDisconnected> = (args) => (
  <MeDisconnected {...args} />
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
