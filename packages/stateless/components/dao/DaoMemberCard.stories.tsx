import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CHAIN_ID } from '@dao-dao/storybook'
import { EntityType, TokenType } from '@dao-dao/types'
import { DaoMemberCardProps } from '@dao-dao/types/components/DaoMemberCard'

import { ButtonLink } from '../buttons'
import { DaoMemberCard } from './DaoMemberCard'

export default {
  title: 'DAO DAO / packages / stateless / components / dao / DaoMemberCard',
  component: DaoMemberCard,
  excludeStories: ['makeProps'],
} as ComponentMeta<typeof DaoMemberCard>

const Template: ComponentStory<typeof DaoMemberCard> = (args) => (
  <div className="max-w-xs">
    <DaoMemberCard {...args} />
  </div>
)

export const makeProps = (): DaoMemberCardProps => ({
  address: 'juno1abczhsdyechxcjz90y',
  // Random number between 0 and 100,000 with 6 decimals.
  balanceLabel: 'Staked',
  balance: {
    loading: false,
    data: {
      amount: Math.floor(Math.random() * (100000 * 1e6) + 1e6) / 1e6,
      token: {
        chainId: CHAIN_ID,
        type: TokenType.Native,
        denomOrAddress: 'udao',
        decimals: 6,
        symbol: 'DAO',
        imageUrl: 'https://daodao.zone/daodao.png',
        source: {
          chainId: CHAIN_ID,
          type: TokenType.Native,
          denomOrAddress: 'udao',
        },
      },
    },
  },
  // Random number between 0 and 31 with 2 decimals.
  votingPowerPercent: {
    loading: false,
    data: Math.floor(Math.random() * (30 * 1e2) + 1e2) / 1e2,
  },
  loadingEntity: {
    loading: false,
    data: {
      type: EntityType.Wallet,
      chainId: CHAIN_ID,
      address: 'walletPerson',
      name: 'wallet Person!',
      imageUrl: '/placeholders/1.svg',
    },
  },
  ButtonLink,
})

export const Default = Template.bind({})
Default.args = makeProps()
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=984%3A45779',
  },
}

export const Loading = Template.bind({})
Loading.args = {
  ...Default.args,
  votingPowerPercent: { loading: true },
  loadingEntity: {
    loading: false,
    data: {
      type: EntityType.Wallet,
      chainId: CHAIN_ID,
      address: 'walletPerson',
      name: 'wallet Person!',
      imageUrl: '/placeholders/1.svg',
    },
  },
}
