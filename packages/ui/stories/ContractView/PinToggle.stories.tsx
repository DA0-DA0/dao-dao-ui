import { ComponentMeta, ComponentStory } from '@storybook/react'

import { PinToggle } from 'components/ContractView/PinToggle'

export default {
  title: 'DAO DAO UI / ContractView / PinToggle',
  component: PinToggle,
} as ComponentMeta<typeof PinToggle>

const Template: ComponentStory<typeof PinToggle> = (args) => (
  <PinToggle {...args} />
)

export const On = Template.bind({})
On.args = {
  pinned: true,
}

export const Off = Template.bind({})
Off.args = {
  pinned: false,
}
