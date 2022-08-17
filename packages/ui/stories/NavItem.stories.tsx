import { ComponentMeta, ComponentStory } from '@storybook/react'

import { NavItem } from 'components/NavItem'

export default {
  title: 'DAO DAO UI / NavItem',
  component: NavItem,
} as ComponentMeta<typeof NavItem>

const Template: ComponentStory<typeof NavItem> = (args) => <NavItem {...args} />

export const Default = Template.bind({})
Default.args = {
  "item": null // TODO: Fill in default value.
}
