import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ReactHookFormDecorator } from '@dao-dao/storybook'

import { RemoveCw20Component } from './RemoveCw20'

export default {
  title: 'DAO DAO / packages / stateful / actions / components / RemoveCw20',
  component: RemoveCw20Component,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof RemoveCw20Component>

const Template: ComponentStory<typeof RemoveCw20Component> = (args) => (
  <RemoveCw20Component {...args} />
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
          decimals: 6,
          name: 'Token1',
          symbol: 'TOK1',
          total_supply: '1234754123',
        },
      },
      {
        address: 'token2',
        info: {
          decimals: 6,
          name: 'Token2',
          symbol: 'TOK2',
          total_supply: '6241245123',
        },
      },
      {
        address: 'token3',
        info: {
          decimals: 6,
          name: 'Token3',
          symbol: 'TOK3',
          total_supply: '9127842173',
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
