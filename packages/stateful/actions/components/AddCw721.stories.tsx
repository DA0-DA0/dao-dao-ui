import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ReactHookFormDecorator } from '@dao-dao/storybook'

import { AddCw721Component } from './AddCw721'

export default {
  title: 'DAO DAO / packages / stateful / actions / components / AddCw721',
  component: AddCw721Component,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof AddCw721Component>

const Template: ComponentStory<typeof AddCw721Component> = (args) => (
  <AddCw721Component {...args} />
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
    formattedJsonDisplayProps: {
      jsonLoadable: {
        state: 'loading',
      } as any,
    },
  },
}
