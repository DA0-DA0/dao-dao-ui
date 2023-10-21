import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ChainSwitcher } from '@dao-dao/stateful'
import { WALLET_PROFILE_DATA } from '@dao-dao/storybook'
import {
  WalletActionsProviderDecorator,
  WalletProviderDecorator,
  makeDappLayoutDecorator,
} from '@dao-dao/storybook/decorators'
import {
  MeTransactionBuilderProps,
  TokenCardProps,
  WalletBalancesProps,
} from '@dao-dao/types'

import {
  NftCardProps,
  ProfileHomeCard,
  ProfileHomeCardProps,
} from '../components'
import { Default as ProfileHomeCardStory } from '../components/profile/ProfileHomeCard.stories'
import { Default as WalletBalancesStory } from '../components/wallet/WalletBalances.stories'
import { Me } from './Me'
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
    <WalletBalancesStory
      {...(WalletBalancesStory.args as WalletBalancesProps<
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
  MeDaos: () => <div />,
  profileData: WALLET_PROFILE_DATA,
  ChainSwitcher,
}
