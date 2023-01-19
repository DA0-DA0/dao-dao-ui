import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Collapsible } from './Collapsible'

export default {
  title: 'DAO DAO / packages / stateless / components / Collapsible',
  component: Collapsible,
} as ComponentMeta<typeof Collapsible>

const Template: ComponentStory<typeof Collapsible> = (args) => (
  <Collapsible {...args} />
)

export const Default = Template.bind({})
Default.args = {
  imageUrl: '/placeholders/1.svg',
  label: 'A collapsible dropdown',
  children: <div>Some content</div>,
}
