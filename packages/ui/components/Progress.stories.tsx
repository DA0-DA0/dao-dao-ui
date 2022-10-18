import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Progress } from './Progress'

export default {
  title: 'DAO DAO / packages / ui / components / Progress',
  component: Progress,
} as ComponentMeta<typeof Progress>

const Template: ComponentStory<typeof Progress> = (args) => (
  <div className="max-w-xl">
    <Progress {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  rows: [
    {
      thickness: 10,
      data: [
        {
          value: 73,
          color: 'var(--icon-interactive-valid)',
        },
        {
          value: 12,
          color: 'var(--icon-interactive-error)',
        },
        {
          value: 2,
          color: 'var(--icon-tertiary)',
        },
      ],
    },
  ],
  caretPosition: 67,
}
