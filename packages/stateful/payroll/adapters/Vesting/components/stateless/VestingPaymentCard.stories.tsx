import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ButtonLink } from '@dao-dao/stateless'
import { makeProps as makeTokenCardProps } from '@dao-dao/stateless/components/token/TokenCard.stories'
import { DaoPageWrapperDecorator } from '@dao-dao/storybook/decorators/DaoPageWrapperDecorator'
import { EntityType } from '@dao-dao/types'

import { VestingPaymentCard } from './VestingPaymentCard'

export default {
  title:
    'DAO DAO / packages / stateful / payroll / adapters / Vesting / components / stateless / VestingPaymentCard',
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
    'A vesting payment for a very real person. They are being paid for being... so real.',
  recipient: 'junoAbc123',
  recipientEntity: {
    loading: false,
    data: {
      type: EntityType.Wallet,
      address: 'junoAbc123',
      name: 'A Very Real Person',
      imageUrl: '/placeholders/1.svg',
    },
  },
  recipientIsWallet: true,
  ButtonLink,
  lazyInfo: makeTokenCardProps().lazyInfo,
  tokenInfo: {
    denomOrAddress: 'ujuno',
    symbol: 'JUNO',
    decimals: 6,
  },
  hasStakingInfo: true,
  onWithdraw: () => alert('withdraw'),
  withdrawing: false,
  onClaim: () => alert('claim'),
  claiming: false,
  onAddToken: () => alert('add token'),
  initialVestedAmount: 401239.5123,
  withdrawableVestedAmount: 1942.7984,
}
