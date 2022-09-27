import { ComponentMeta, ComponentStory } from '@storybook/react'
import toast from 'react-hot-toast'

import { TokenStake } from '@dao-dao/tstypes'

import { TokenCard, TokenCardProps } from './TokenCard'
import { makeProps as makeUnstakingModalProps } from './UnstakingModal.stories'

export default {
  title: 'DAO DAO / packages / ui / components / TokenCard',
  component: TokenCard,
  excludeStories: ['makeProps'],
} as ComponentMeta<typeof TokenCard>

const Template: ComponentStory<typeof TokenCard> = (args) => (
  <div className="max-w-xs">
    <TokenCard {...args} />
  </div>
)

export const makeProps = (crown = false): TokenCardProps => {
  // Random price between 0 and 10000 with up to 6 decimals.
  const unstakedBalance = Math.floor(Math.random() * (10000 * 1e6) + 1e6) / 1e6
  const stakes: TokenStake[] = [
    {
      // Random price between 0 and 10000 with up to 6 decimals.
      amount: Math.floor(Math.random() * (10000 * 1e6) + 1e6) / 1e6,
      validator: {
        address: 'stakefish',
        moniker: 'Stakefish',
        website: '',
        details: '',
      },
      rewards: 1.23,
    },
    {
      // Random price between 0 and 10000 with up to 6 decimals.
      amount: Math.floor(Math.random() * (10000 * 1e6) + 1e6) / 1e6,
      validator: {
        address: '2x4ben',
        moniker: '2x4 Ben',
        website: '',
        details: '',
      },
      rewards: 4.56,
    },
    {
      // Random price between 0 and 10000 with up to 6 decimals.
      amount: Math.floor(Math.random() * (10000 * 1e6) + 1e6) / 1e6,
      validator: {
        address: 'cosmostation',
        moniker: 'Cosmostation',
        website: '',
        details: '',
      },
      rewards: 7.89,
    },
    {
      // Random price between 0 and 10000 with up to 6 decimals.
      amount: Math.floor(Math.random() * (10000 * 1e6) + 1e6) / 1e6,
      validator: {
        address: 'sg1',
        moniker: 'SG-1',
        website: '',
        details: '',
      },
      rewards: 10.11,
    },
  ]

  return {
    crown,
    imageUrl: `/placeholders/${Math.floor(Math.random() * 5) + 1}.svg`,
    tokenSymbol: 'JUNO',
    tokenDenom: 'ujuno',
    subtitle: 'Juno Network',
    unstakedBalance,
    tokenDecimals: 6,
    usdcUnitPrice: 5.38,
    stakingInfo: {
      unstakingTasks: makeUnstakingModalProps('JUNO').tasks,
      unstakingDurationSeconds: 28 * 24 * 3600,
      stakes,
    },
    onAddToken: () => toast.success('added'),
    onProposeClaim: () => alert('claim'),
    onProposeStakeUnstake: () => alert('stakeUnstake'),
  }
}

export const Default = Template.bind({})
Default.args = makeProps()

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=94%3A15313',
  },
}
