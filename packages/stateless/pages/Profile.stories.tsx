import { ComponentMeta, ComponentStory } from '@storybook/react'

import { WALLET_PROFILE_DATA } from '@dao-dao/storybook'
import {
  WalletActionsProviderDecorator,
  WalletProviderDecorator,
  makeDappLayoutDecorator,
} from '@dao-dao/storybook/decorators'

import { Profile } from './Profile'

export default {
  title: 'DAO DAO / packages / stateless / pages / Profile',
  component: Profile,
  decorators: [
    WalletProviderDecorator,
    makeDappLayoutDecorator(),
    WalletActionsProviderDecorator,
  ],
} as ComponentMeta<typeof Profile>

const Template: ComponentStory<typeof Profile> = (args) => <Profile {...args} />

export const Default = Template.bind({})
Default.args = {
  tabs: [],
  profileData: WALLET_PROFILE_DATA,
}
