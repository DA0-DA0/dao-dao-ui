import { ComponentMeta, ComponentStory } from '@storybook/react'

import { PinToggle } from 'components/ContractView/PinToggle'

export default {
  title: 'DAO DAO UI / ContractView / PinToggle',
  component: PinToggle,
} as ComponentMeta<typeof PinToggle>

const Template: ComponentStory<typeof PinToggle> = (args) => (
  <PinToggle {...args} />
)

export const Default = Template.bind({})
Default.args = {
  pinned: null, // TODO: Fill in default value.
  onPin: null, // TODO: Fill in default value.
}
