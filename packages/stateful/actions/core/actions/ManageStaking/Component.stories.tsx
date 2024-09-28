import { ComponentMeta, ComponentStory } from '@storybook/react'

import { HugeDecimal } from '@dao-dao/math'
import { token } from '@dao-dao/stateless/components/token/TokenCard.stories'
import { CHAIN_ID } from '@dao-dao/storybook'
import { makeReactHookFormDecorator } from '@dao-dao/storybook/decorators'
import { TokenStake } from '@dao-dao/types'
import { StakingActionType } from '@dao-dao/utils'

import { AddressInput } from '../../../../components/AddressInput'
import { ManageStakingComponent, ManageStakingData } from './Component'

export default {
  title:
    'DAO DAO / packages / stateful / actions / core / treasury / ManageStaking',
  component: ManageStakingComponent,
  decorators: [
    makeReactHookFormDecorator<ManageStakingData>({
      chainId: CHAIN_ID,
      type: StakingActionType.Delegate,
      validator: '',
      toValidator: '',
      amount: 1,
      withdrawAddress: '',
    }),
  ],
} as ComponentMeta<typeof ManageStakingComponent>

const Template: ComponentStory<typeof ManageStakingComponent> = (args) => (
  <ManageStakingComponent {...args} />
)

const stakes: TokenStake[] = [
  {
    token,
    // Random price between 0 and 10000 with up to 6 decimals.
    amount: HugeDecimal.from(Math.floor(Math.random() * (10000 * 1e6) + 1e6)),
    validator: {
      address: 'sparkIBC',
      moniker: 'Spark IBC',
      website: '',
      details: '',
      commission: 0.05,
      status: 'BOND_STATUS_BONDED',
      tokens: HugeDecimal.fromHumanReadable(5, token.decimals),
    },
    rewards: HugeDecimal.fromHumanReadable(1.23, token.decimals),
  },
  {
    token,
    // Random price between 0 and 10000 with up to 6 decimals.
    amount: HugeDecimal.from(Math.floor(Math.random() * (10000 * 1e6) + 1e6)),
    validator: {
      address: 'elsehow',
      moniker: 'elsehow',
      website: '',
      details: '',
      commission: 0.05,
      status: 'BOND_STATUS_BONDED',
      tokens: HugeDecimal.fromHumanReadable(6, token.decimals),
    },
    rewards: HugeDecimal.fromHumanReadable(4.56, token.decimals),
  },
  {
    token,
    // Random price between 0 and 10000 with up to 6 decimals.
    amount: HugeDecimal.from(Math.floor(Math.random() * (10000 * 1e6) + 1e6)),
    validator: {
      address: 'cosmostation',
      moniker: 'Cosmostation',
      website: '',
      details: '',
      commission: 0.05,
      status: 'BOND_STATUS_BONDED',
      tokens: HugeDecimal.fromHumanReadable(7, token.decimals),
    },
    rewards: HugeDecimal.fromHumanReadable(7.89, token.decimals),
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
        tokens: HugeDecimal.fromHumanReadable(9, token.decimals),
      },
    ],
    executed: false,
    nativeUnstakingDurationSeconds: 2419200,
    AddressInput,
  },
  isCreating: true,
  errors: {},
}
