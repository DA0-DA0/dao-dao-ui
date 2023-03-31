import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AddressInput } from '@dao-dao/stateless'
import { ReactHookFormDecorator } from '@dao-dao/storybook/decorators'

import { ManageSubDaosComponent } from './Component'

export default {
  title:
    'DAO DAO / packages / stateful / actions / core / dao_governance / ManageSubDaos',
  component: ManageSubDaosComponent,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof ManageSubDaosComponent>

const Template: ComponentStory<typeof ManageSubDaosComponent> = (args) => (
  <ManageSubDaosComponent {...args} />
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
    currentSubDaos: [],
    AddressInput,
  },
}
