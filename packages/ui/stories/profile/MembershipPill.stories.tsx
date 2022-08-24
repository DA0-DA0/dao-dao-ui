import { ComponentMeta, ComponentStory } from '@storybook/react'

import { MembershipPill } from 'components/profile/MembershipPill'

export default {
  title: 'DAO DAO UI V2 / profile / MembershipPill',
  component: MembershipPill,
} as ComponentMeta<typeof MembershipPill>

const Template: ComponentStory<typeof MembershipPill> = (args) => (
  <div className="flex flex-row gap-4 items-center">
    <MembershipPill {...args} isMember />
    <MembershipPill {...args} isMember={false} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  daoName: 'DAO',
}
