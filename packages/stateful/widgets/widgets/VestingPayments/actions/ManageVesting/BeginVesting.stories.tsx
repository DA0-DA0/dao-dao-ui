import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AddressInput } from '@dao-dao/stateless'
import {
  makeDaoInfo,
  makeDaoProvidersDecorator,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook'
import { TokenType } from '@dao-dao/types'

import { BeginVesting } from './BeginVesting'

export default {
  title:
    'DAO DAO / packages / stateful / widgets / widgets / VestingPayments / actions / ManageVesting / BeginVesting',
  component: BeginVesting,
  decorators: [
    makeReactHookFormDecorator(),
    makeDaoProvidersDecorator(makeDaoInfo()),
  ],
} as ComponentMeta<typeof BeginVesting>

const Template: ComponentStory<typeof BeginVesting> = (args) => (
  <div className="max-w-xl">
    <BeginVesting {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  data: {},
  isCreating: true,
  errors: {},
  options: {
    tokens: [
      {
        token: {
          type: TokenType.Native,
          denomOrAddress: 'ujuno',
          symbol: 'JUNO',
          decimals: 6,
          imageUrl: '/juno.png',
        },
        balance: '1248281239056',
      },
      {
        token: {
          type: TokenType.Cw20,
          denomOrAddress: 'junoCw20Dao',
          symbol: 'DAO',
          decimals: 6,
          imageUrl: '/daodao.png',
        },
        balance: '19023827587124',
      },
    ],
    vestingFactoryOwner: { loading: false, data: undefined },
    AddressInput,
  },
}
