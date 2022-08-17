import { ComponentMeta, ComponentStory } from '@storybook/react'

import { MultisigMemberListLoader } from 'components/MultisigMemberList'

export default {
  title: 'DAO DAO UI / MultisigMemberListLoader',
  component: MultisigMemberListLoader,
} as ComponentMeta<typeof MultisigMemberListLoader>

const Template: ComponentStory<typeof MultisigMemberListLoader> = (args) => <MultisigMemberListLoader {...args} />

export const Default = Template.bind({})
Default.args = {}
