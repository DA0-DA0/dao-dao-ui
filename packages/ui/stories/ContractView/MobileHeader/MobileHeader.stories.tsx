import { ComponentMeta, ComponentStory } from '@storybook/react'

import { MobileHeader } from 'components/ContractView/MobileHeader'

export default {
  title: 'DAO DAO UI / ContractView / MobileHeader',
  component: MobileHeader,
} as ComponentMeta<typeof MobileHeader>

const Template: ComponentStory<typeof MobileHeader> = (args) => (
  <MobileHeader {...args} />
)

export const Default = Template.bind({})
Default.args = {
  name: null, // TODO: Fill in default value.
  member: null, // TODO: Fill in default value.
  pinned: null, // TODO: Fill in default value.
  onPin: null, // TODO: Fill in default value.
  contractAddress: null, // TODO: Fill in default value.
}
