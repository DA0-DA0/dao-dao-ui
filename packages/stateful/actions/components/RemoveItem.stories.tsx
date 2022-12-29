import { ComponentMeta, ComponentStory } from '@storybook/react'

import { makeReactHookFormDecorator } from '@dao-dao/storybook/decorators'

import { RemoveItemComponent, RemoveItemData } from './RemoveItem'

export default {
  title: 'DAO DAO / packages / stateful / actions / components / RemoveItem',
  component: RemoveItemComponent,
  decorators: [
    makeReactHookFormDecorator<RemoveItemData>({
      key: 'color',
    }),
  ],
} as ComponentMeta<typeof RemoveItemComponent>

const Template: ComponentStory<typeof RemoveItemComponent> = (args) => (
  <RemoveItemComponent {...args} />
)

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  options: {
    existingKeys: ['payroll', 'color'],
  },
  isCreating: true,
  onRemove: () => alert('remove'),
  errors: {},
}
