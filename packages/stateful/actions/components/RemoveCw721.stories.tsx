import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ReactHookFormDecorator } from '@dao-dao/storybook'

import { RemoveCw721Component } from './RemoveCw721'

export default {
  title: 'DAO DAO / packages / stateful / actions / components / RemoveCw721',
  component: RemoveCw721Component,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof RemoveCw721Component>

const Template: ComponentStory<typeof RemoveCw721Component> = (args) => (
  <RemoveCw721Component {...args} />
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
    existingTokens: [
      {
        address: 'token1',
        info: {
          name: 'Token1',
          symbol: 'TOK1',
        },
      },
      {
        address: 'token2',
        info: {
          name: 'Token2',
          symbol: 'TOK2',
        },
      },
      {
        address: 'token3',
        info: {
          name: 'Token3',
          symbol: 'TOK3',
        },
      },
    ],
    formattedJsonDisplayProps: {
      jsonLoadable: {
        state: 'loading',
      } as any,
    },
  },
}
