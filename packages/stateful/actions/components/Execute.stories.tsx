import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ReactHookFormDecorator } from '@dao-dao/storybook'

import { ExecuteComponent } from './Execute'

export default {
  title: 'DAO DAO / packages / stateful / actions / components / Execute',
  component: ExecuteComponent,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof ExecuteComponent>

const Template: ComponentStory<typeof ExecuteComponent> = (args) => (
  <ExecuteComponent {...args} />
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
}
