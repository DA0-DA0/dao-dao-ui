import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ReactHookFormDecorator } from '@dao-dao/storybook'
import { TokenType } from '@dao-dao/types'
import { NATIVE_DENOM } from '@dao-dao/utils'

import { InstantiateComponent } from './Instantiate'

export default {
  title: 'DAO DAO / packages / stateful / actions / components / Instantiate',
  component: InstantiateComponent,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof InstantiateComponent>

const Template: ComponentStory<typeof InstantiateComponent> = (args) => (
  <InstantiateComponent {...args} />
)

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  data: {},
  isCreating: true,
  onRemove: () => alert('remove'),
  errors: {},
  options: {
    nativeBalances: [
      {
        token: {
          type: TokenType.Native,
          denomOrAddress: NATIVE_DENOM,
          decimals: 6,
          symbol: 'JUNO',
          imageUrl: '',
        },
        balance: '1231245124',
      },
      {
        token: {
          type: TokenType.Native,
          denomOrAddress: 'uatom',
          decimals: 6,
          symbol: 'ATOM',
          imageUrl: '',
        },
        balance: '984129741',
      },
    ],
  },
}
