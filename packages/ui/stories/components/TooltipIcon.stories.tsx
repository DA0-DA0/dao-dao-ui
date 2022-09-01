import { ComponentMeta, ComponentStory } from '@storybook/react'

import { TooltipIcon } from 'components/TooltipIcon'

export default {
  title: 'DAO DAO UI / components / TooltipIcon',
  component: TooltipIcon,
} as ComponentMeta<typeof TooltipIcon>

const Template: ComponentStory<typeof TooltipIcon> = (args) => (
  <TooltipIcon {...args} />
)

export const Default = Template.bind({})
Default.args = {
  title: 'This is a tooltip.',
}
