import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ReactHookFormDecorator } from '@dao-dao/storybook'

import { CustomComponent } from './Custom'

export default {
  title: 'DAO DAO / packages / stateful / actions / components / Custom',
  component: CustomComponent,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof CustomComponent>

const Template: ComponentStory<typeof CustomComponent> = (args) => (
  <CustomComponent {...args} />
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
