import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProgressBar } from './ProgressBar'

export default {
  title: 'DAO DAO / packages / stateless / components / ProgressBar',
  component: ProgressBar,
} as ComponentMeta<typeof ProgressBar>

const Template: ComponentStory<typeof ProgressBar> = (args) => (
  <div className="max-w-xl">
    <ProgressBar {...args} />
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
