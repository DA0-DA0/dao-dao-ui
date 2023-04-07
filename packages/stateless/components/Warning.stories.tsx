import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Warning } from './Warning'

export default {
  title: 'DAO DAO / packages / stateless / components / Warning',
  component: Warning,
} as ComponentMeta<typeof Warning>

const Template: ComponentStory<typeof Warning> = (args) => <Warning {...args} />

export const Default = Template.bind({})
Default.args = {
  children: <p>This is a warning.</p>,
}
