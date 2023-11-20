import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ButtonLink, EntityDisplay } from '@dao-dao/stateful'
import { makeProps as makeTokenCardProps } from '@dao-dao/stateless/components/token/TokenCard.stories'
import { CHAIN_ID } from '@dao-dao/storybook'
import { DaoPageWrapperDecorator } from '@dao-dao/storybook/decorators/DaoPageWrapperDecorator'
import { EntityType, TokenType } from '@dao-dao/types'

import { VestingPaymentCard } from './VestingPaymentCard'

export default {
  title:
    'DAO DAO / packages / stateless / components / vesting / VestingPaymentCard',
  component: VestingPaymentCard,
  decorators: [DaoPageWrapperDecorator],
} as ComponentMeta<typeof VestingPaymentCard>

const Template: ComponentStory<typeof VestingPaymentCard> = (args) => (
  <VestingPaymentCard {...args} />
)

export const Default = Template.bind({})
Default.args = {
  title: 'Vesting Payment',
  description:
    'A vesting payment for a very real person. They are being paid for being... so real. And they are really good at being real. So they get paid. A lot. For being real. Too much actually.',
  recipient: 'junoAbc123',
  recipientEntity: {
    loading: false,
    data: {
      type: EntityType.Wallet,
      chainId: CHAIN_ID,
      address: 'junoAbc123',
      name: 'A Very Real Person',
      imageUrl: '/placeholders/1.svg',
    },
  },
  recipientIsWallet: true,
  ButtonLink,
  EntityDisplay,
  lazyInfo: makeTokenCardProps().lazyInfo,
  token: {
    chainId: CHAIN_ID,
    type: TokenType.Native,
    denomOrAddress: 'ujuno',
    symbol: 'JUNO',
    decimals: 6,
    imageUrl: undefined,
  },
  onWithdraw: () => alert('withdraw'),
  withdrawing: false,
  onClaim: () => alert('claim'),
  claiming: false,
  onManageStake: () => alert('manage stake'),
  onAddToken: () => alert('add token'),
  remainingBalanceVesting: 401239.5123,
  distributableAmount: 1942.7984,
  claimedAmount: 39.234,
  // Started 2 days ago.
  startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  // Ends in 7 days.
  endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  steps: [
    {
      // Started 2 days ago.
      timestamp: Date.now() - 1000 * 60 * 60 * 24 * 2,
      amount: 0,
    },
    {
      // Ends in 7 days.
      timestamp: Date.now() + 1000 * 60 * 60 * 24 * 7,
      amount: 403221.5447,
    },
  ],
}
