import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AddressInput } from '@dao-dao/stateless'
import {
  makeDaoInfo,
  makeDaoProvidersDecorator,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook/decorators'
import { TokenType } from '@dao-dao/types'
import { NATIVE_TOKEN } from '@dao-dao/utils'

import { SpendComponent, SpendData } from './Spend'

export default {
  title: 'DAO DAO / packages / stateful / actions / components / Spend',
  component: SpendComponent,
  decorators: [
    makeReactHookFormDecorator<SpendData>({
      to: '',
      amount: 1,
      denom: NATIVE_TOKEN.denomOrAddress,
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
    tokens: {
      loading: false,
      data: [
        {
          token: NATIVE_TOKEN,
          balance: '46252349169321',
        },
        {
          token: {
            type: TokenType.Cw20,
            denomOrAddress: 'cw20_1',
            decimals: 6,
            symbol: 'ATKN',
            imageUrl: '',
          },
          balance: '1284135723893',
        },
        {
          token: {
            type: TokenType.Cw20,
            denomOrAddress: 'cw20_2',
            decimals: 6,
            symbol: 'DIFF',
            imageUrl: '',
          },
          balance: '102948124125',
        },
      ],
    },
    AddressInput,
  },
  isCreating: true,
  onRemove: () => alert('remove'),
  errors: {},
}
