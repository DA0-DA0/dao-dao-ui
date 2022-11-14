import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ReactHookFormDecorator } from '@dao-dao/storybook'
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
        denom: NATIVE_DENOM,
        amount: '1231245124',
      },
      {
        denom: 'uatom',
        amount: '984129741',
      },
    ],
  },
}
