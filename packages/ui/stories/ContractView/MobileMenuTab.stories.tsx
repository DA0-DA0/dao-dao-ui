import { ComponentMeta, ComponentStory } from '@storybook/react'

import { MobileMenuTab } from 'components/ContractView/MobileMenuTab'

export default {
  title: 'DAO DAO UI / ContractView / MobileMenuTab',
  component: MobileMenuTab,
} as ComponentMeta<typeof MobileMenuTab>

const Template: ComponentStory<typeof MobileMenuTab> = (args) => (
  <MobileMenuTab {...args} />
)

export const Default = Template.bind({})
Default.args = {
  icon: '🗳',
  text: 'Proposals',
  selected: false,
}
