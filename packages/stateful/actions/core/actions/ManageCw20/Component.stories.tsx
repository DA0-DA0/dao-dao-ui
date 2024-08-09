import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ReactHookFormDecorator } from '@dao-dao/storybook'

import { ManageCw20Component } from './Component'

export default {
  title:
    'DAO DAO / packages / stateful / actions / core / treasury / ManageCw20',
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
  errors: {},
  options: {
    existingTokens: [],
    formattedJsonDisplayProps: {
      title: 'Token info',
      jsonLoadable: {
        state: 'loading',
      } as any,
    },
  },
}
