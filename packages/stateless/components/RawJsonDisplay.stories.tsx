import { ComponentMeta, ComponentStory } from '@storybook/react'

import { RawJsonDisplay } from './RawJsonDisplay'

export default {
  title: 'DAO DAO / packages / stateless / components / RawJsonDisplay',
  component: RawJsonDisplay,
} as ComponentMeta<typeof RawJsonDisplay>

const Template: ComponentStory<typeof RawJsonDisplay> = (args) => (
  <RawJsonDisplay {...args} />
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
