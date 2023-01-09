import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ReactHookFormDecorator } from '@dao-dao/storybook/decorators'

import { ProfileDisplay } from '../../components'
import { ManageSubDaosComponent } from './ManageSubDaos'

export default {
  title: 'DAO DAO / packages / stateful / actions / components / ManageSubDaos',
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
  onRemove: () => alert('remove'),
  errors: {},
  options: {
    currentSubDaos: [],
    ProfileDisplay: ProfileDisplay,
  },
}
