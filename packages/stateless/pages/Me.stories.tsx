import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  WalletProviderDecorator,
  makeActionsProviderDecorator,
  makeDappLayoutDecorator,
} from '@dao-dao/storybook/decorators'
import { ActionContextType, MeTransactionBuilderProps } from '@dao-dao/types'

import { ProfileHomeCard, ProfileHomeCardProps } from '../components'
import { Default as ProfileHomeCardStory } from '../components/profile/ProfileHomeCard.stories'
import { Me } from './Me'
import { Default as MeTransactionBuilderStory } from './MeTransactionBuilder.stories'

export default {
  title: 'DAO DAO / packages / stateless / pages / Me',
  component: Me,
  decorators: [
    WalletProviderDecorator,
    makeDappLayoutDecorator(),
    makeActionsProviderDecorator({
      address: 'junoWalletAddress',
      chainId: 'juno-1',
      bech32Prefix: 'juno',
      context: {
        type: ActionContextType.Wallet,
      },
    }),
  ],
} as ComponentMeta<typeof Me>

const Template: ComponentStory<typeof Me> = (args) => <Me {...args} />

export const Default = Template.bind({})
Default.args = {
  rightSidebarContent: (
    <ProfileHomeCard {...(ProfileHomeCardStory.args as ProfileHomeCardProps)} />
  ),
  MeTransactionBuilder: () => (
    <MeTransactionBuilderStory
      {...(MeTransactionBuilderStory.args as MeTransactionBuilderProps)}
    />
  ),
}
