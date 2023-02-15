import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AddressInput } from '@dao-dao/stateless'
import {
  makeDaoInfo,
  makeDaoProvidersDecorator,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook/decorators'
import { NATIVE_DENOM } from '@dao-dao/utils'

import { SpendComponent, SpendData } from './Spend'

export default {
  title: 'DAO DAO / packages / stateful / actions / components / Spend',
  component: SpendComponent,
  decorators: [
    makeReactHookFormDecorator<SpendData>({
      to: '',
      amount: 1,
      denom: NATIVE_DENOM,
    }),
    makeDaoProvidersDecorator(makeDaoInfo()),
  ],
} as ComponentMeta<typeof SpendComponent>

const Template: ComponentStory<typeof SpendComponent> = (args) => (
  <SpendComponent {...args} />
)

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  options: {
    nativeBalances: [
      {
        denom: NATIVE_DENOM,
        amount: '46252349169321',
      },
    ],
    AddressInput,
    cw20Balances: [
      {
        address: 'cw20_1',
        balance: '1284135723893',
        info: {
          decimals: 6,
          name: 'A token',
          symbol: 'ATKN',
          total_supply: '10238192471284128',
        },
      },
      {
        address: 'cw20_2',
        balance: '102948124125',
        info: {
          decimals: 6,
          name: 'A different token',
          symbol: 'DIFF',
          total_supply: '6212378128495812',
        },
      },
    ],
  },
  isCreating: true,
  onRemove: () => alert('remove'),
  errors: {},
}
