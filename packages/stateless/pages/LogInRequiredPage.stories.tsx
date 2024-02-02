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
import { LogInRequiredPage } from './LogInRequiredPage'

export default {
  title: 'DAO DAO / packages / stateless / pages / LogInRequiredPage',
  component: LogInRequiredPage,
  decorators: [WalletProviderDecorator, makeDappLayoutDecorator()],
} as ComponentMeta<typeof LogInRequiredPage>

const Template: ComponentStory<typeof LogInRequiredPage> = (args) => (
  <LogInRequiredPage {...args} />
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
  connecting: false,
}
