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
  members: [
    {
      addr: 'junoabcdefxyz',
      weight: 6,
    },
    {
      addr: 'junoghijkluvw',
      weight: 2,
    },
    {
      addr: 'junomnopqrstu',
      weight: 1,
    },
  ],
  totalWeight: 9,
}

// TODO: Fix story.
