import { ComponentMeta, ComponentStory } from '@storybook/react'

import { WALLET_PROFILE_DATA } from '@dao-dao/storybook'
import {
  WalletActionsProviderDecorator,
  WalletProviderDecorator,
  makeDappLayoutDecorator,
} from '@dao-dao/storybook/decorators'
import { MeBalancesProps, MeTransactionBuilderProps } from '@dao-dao/types'

import {
  NftCardProps,
  ProfileHomeCard,
  ProfileHomeCardProps,
  TokenCardProps,
} from '../components'
import { Default as ProfileHomeCardStory } from '../components/profile/ProfileHomeCard.stories'
import { Me } from './Me'
import { Default as MeBalancesStory } from './MeBalances.stories'
import { Default as MeTransactionBuilderStory } from './MeTransactionBuilder.stories'

export default {
  title: 'DAO DAO / packages / stateless / pages / Me',
  component: Me,
  decorators: [
    WalletProviderDecorator,
    makeDappLayoutDecorator(),
    WalletActionsProviderDecorator,
  ],
} as ComponentMeta<typeof Me>

const Template: ComponentStory<typeof Me> = (args) => <Me {...args} />

export const Default = Template.bind({})
Default.args = {
  rightSidebarContent: (
    <ProfileHomeCard {...(ProfileHomeCardStory.args as ProfileHomeCardProps)} />
  ),
  MeBalances: () => (
    <MeBalancesStory
      {...(MeBalancesStory.args as MeBalancesProps<
        TokenCardProps,
        NftCardProps
      >)}
    />
  ),
  MeTransactionBuilder: () => (
    <MeTransactionBuilderStory
      {...(MeTransactionBuilderStory.args as MeTransactionBuilderProps)}
    />
  ),
  profileData: WALLET_PROFILE_DATA,
}
