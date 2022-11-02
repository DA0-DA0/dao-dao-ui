import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Loader, Logo } from '@dao-dao/stateless'
import { ReactHookFormDecorator } from '@dao-dao/storybook/decorators'

import { ManageSubDaosComponent } from './ManageSubDaos'

export default {
  title: 'DAO DAO / packages / actions / components / ManageSubDaosComponent',
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
  Loader,
  Logo,
  isCreating: true,
  onRemove: () => alert('remove'),
  errors: {},
  options: {
    currentSubDaos: [],
  },
}
