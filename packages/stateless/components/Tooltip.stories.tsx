import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Tooltip } from './Tooltip'

export default {
  title: 'DAO DAO / packages / stateless / components / Tooltip',
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>

const Template: ComponentStory<typeof Tooltip> = (args) => <Tooltip {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'This is a tooltip.',
  children: <p>Hover over me.</p>,
}
