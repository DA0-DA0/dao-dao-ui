import { ComponentMeta, ComponentStory } from '@storybook/react'

import { token } from '@dao-dao/stateless/components/token/TokenCard.stories'
import { makeReactHookFormDecorator } from '@dao-dao/storybook/decorators'
import { TokenStake } from '@dao-dao/types'
import { StakeType } from '@dao-dao/utils'

import { StakeComponent, StakeData } from './StakingActions'

export default {
  title: 'DAO DAO / packages / stateful / actions / components / Stake',
  component: StakeComponent,
  decorators: [
    makeReactHookFormDecorator<StakeData>({
      stakeType: StakeType.Delegate,
      validator: '',
      toValidator: '',
      amount: 1,
    }),
  ],
} as ComponentMeta<typeof StakeComponent>

const Template: ComponentStory<typeof StakeComponent> = (args) => (
  <StakeComponent {...args} />
)

const stakes: TokenStake[] = [
  {
    token,
    // Random price between 0 and 10000 with up to 6 decimals.
    amount: Math.floor(Math.random() * (10000 * 1e6) + 1e6) / 1e6,
    validator: {
      address: 'sparkIBC',
      moniker: 'Spark IBC',
      website: '',
      details: '',
      commission: 0.05,
      status: 'BOND_STATUS_BONDED',
      tokens: 5,
    },
    rewards: 1.23,
  },
  {
    token,
    // Random price between 0 and 10000 with up to 6 decimals.
    amount: Math.floor(Math.random() * (10000 * 1e6) + 1e6) / 1e6,
    validator: {
      address: 'elsehow',
      moniker: 'elsehow',
      website: '',
      details: '',
      commission: 0.05,
      status: 'BOND_STATUS_BONDED',
      tokens: 6.2,
    },
    rewards: 4.56,
  },
  {
    token,
    // Random price between 0 and 10000 with up to 6 decimals.
    amount: Math.floor(Math.random() * (10000 * 1e6) + 1e6) / 1e6,
    validator: {
      address: 'cosmostation',
      moniker: 'Cosmostation',
      website: '',
      details: '',
      commission: 0.05,
      status: 'BOND_STATUS_BONDED',
      tokens: 7,
    },
    rewards: 7.89,
  },
]

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  options: {
    nativeBalance: '46252349169321',
    stakes,
    validators: [
      ...stakes.map(({ validator }) => validator),
      {
        address: 'aDifferentOne',
        moniker: 'A different one',
        website: '',
        details: '',
        commission: 0.05,
        status: 'BOND_STATUS_BONDED',
        tokens: 9,
      },
    ],
    executed: false,
    nativeUnstakingDurationSeconds: 2419200,
  },
  isCreating: true,
  errors: {},
}
