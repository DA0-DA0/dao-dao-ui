import { ComponentMeta, ComponentStory } from '@storybook/react'

import { TooltipInfoIcon } from './TooltipInfoIcon'

export default {
  title: 'DAO DAO / packages / stateless / components / TooltipInfoIcon',
  component: TooltipInfoIcon,
} as ComponentMeta<typeof TooltipInfoIcon>

const Template: ComponentStory<typeof TooltipInfoIcon> = (args) => (
  <TooltipInfoIcon {...args} />
)

export const Default = Template.bind({})
Default.args = {
  title: 'This is a tooltip over a really cool icon.',
}
