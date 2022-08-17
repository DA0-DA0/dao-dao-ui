import { ComponentMeta, ComponentStory } from '@storybook/react'

import { MultisigMemberList } from 'components/MultisigMemberList'

export default {
  title: 'DAO DAO UI / MultisigMemberList',
  component: MultisigMemberList,
} as ComponentMeta<typeof MultisigMemberList>

const Template: ComponentStory<typeof MultisigMemberList> = (args) => (
  <MultisigMemberList {...args} />
)

export const Default = Template.bind({})
Default.args = {
  members: null, // TODO: Fill in default value.
  totalWeight: null, // TODO: Fill in default value.
}
