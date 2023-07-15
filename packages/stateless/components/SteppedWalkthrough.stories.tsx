import { ComponentMeta, ComponentStory } from '@storybook/react'

import { SteppedWalkthrough } from './SteppedWalkthrough'

export default {
  title: 'DAO DAO / packages / stateless / components / SteppedWalkthrough',
  component: SteppedWalkthrough,
} as ComponentMeta<typeof SteppedWalkthrough>

const Template: ComponentStory<typeof SteppedWalkthrough> = (args) => (
  <SteppedWalkthrough {...args} />
)

export const Default = Template.bind({})
Default.args = {
  steps: [
    {
      label: 'Set up',
      content: () => 'Hey there',
    },
    {
      label: 'Create',
      content: () => <div>I am some content</div>,
    },
    {
      label: 'Fund',
    },
    {
      label: 'Launch',
    },
  ],
  stepIndex: 2,
}

export const WithHeaderAndBorder = Template.bind({})
WithHeaderAndBorder.args = {
  ...Default.args,
  title: 'Stepped Walkthrough',
  description: 'In this, you will be walked through the steps.',
  className: 'rounded-lg border border-border-primary',
  textClassName: '!title-text',
}
