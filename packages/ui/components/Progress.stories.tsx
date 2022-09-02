import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Progress } from './Progress'

export default {
  title: '(OLD DAO DAO) / components / Progress',
  component: Progress,
} as ComponentMeta<typeof Progress>

const Template: ComponentStory<typeof Progress> = (args) => (
  <Progress {...args} />
)

export const Default = Template.bind({})
Default.args = {
  rows: [
    {
      thickness: 3,
      data: [
        {
          value: 73,
          color: 'rgb(var(--valid))',
        },
        {
          value: 12,
          color: 'rgb(var(--error))',
        },
        {
          value: 2,
          // Secondary is dark with 80% opacity.
          color: 'rgba(var(--dark), 0.8)',
        },
      ],
    },
  ],
  verticalBars: [
    {
      value: 67,
      color: 'rgba(var(--dark), 0.5)',
    },
  ],
}
