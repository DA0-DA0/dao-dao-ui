import { ComponentMeta, ComponentStory } from '@storybook/react'

import { WALLET_PROFILE_DATA } from '@dao-dao/storybook'
import {
  WalletActionsProviderDecorator,
  WalletProviderDecorator,
  makeDappLayoutDecorator,
} from '@dao-dao/storybook/decorators'
import { TokenCardProps, WalletBalancesProps } from '@dao-dao/types'

import { NftCardProps } from '../components'
import { Default as WalletBalancesStory } from '../components/wallet/WalletBalances.stories'
import { Me } from './Me'
import { MeTransactionBuilderProps } from './MeTransactionBuilder'
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
}
