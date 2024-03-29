import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CosmosMessageDisplay } from './CosmosMessageDisplay'

export default {
  title: 'DAO DAO / packages / stateless / components / CosmosMessageDisplay',
  component: CosmosMessageDisplay,
} as ComponentMeta<typeof CosmosMessageDisplay>

const Template: ComponentStory<typeof CosmosMessageDisplay> = (args) => (
  <CosmosMessageDisplay {...args} />
)

export const Default = Template.bind({})
Default.args = {
  value: JSON.stringify(
    {
      send: {
        amount: [
          {
            amount: '5000',
            denom: 'ujuno',
          },
        ],
        to_address: 'junoabcdef...xyz',
      },
    },
    null,
    2
  ),
}
