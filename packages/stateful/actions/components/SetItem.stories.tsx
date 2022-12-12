import { ComponentMeta, ComponentStory } from '@storybook/react'

import { makeReactHookFormDecorator } from '@dao-dao/storybook/decorators'

import { SetItemComponent, SetItemData } from './SetItem'

export default {
  title: 'DAO DAO / packages / stateful / actions / components / SetItem',
  component: SetItemComponent,
  decorators: [
    makeReactHookFormDecorator<SetItemData>({
      key: 'color',
      value: '',
    }),
  ],
} as ComponentMeta<typeof SetItemComponent>

const Template: ComponentStory<typeof SetItemComponent> = (args) => (
  <SetItemComponent {...args} />
)

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  options: {
    existingKeys: ['color'],
    currentValue: {
      loading: false,
      data: 'blue',
    },
  },
  isCreating: true,
  onRemove: () => alert('remove'),
  errors: {},
}
