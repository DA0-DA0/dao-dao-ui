import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ReactHookFormDecorator } from '@dao-dao/storybook'

import { ManageCw20Component } from './ManageCw20'

export default {
  title: 'DAO DAO / packages / stateful / actions / components / ManageCw20',
  component: ManageCw20Component,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof ManageCw20Component>

const Template: ComponentStory<typeof ManageCw20Component> = (args) => (
  <ManageCw20Component {...args} />
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
    existingTokens: [],
    formattedJsonDisplayProps: {
      jsonLoadable: {
        state: 'loading',
      } as any,
    },
  },
}
