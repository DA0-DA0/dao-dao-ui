import { ComponentMeta, ComponentStory } from '@storybook/react'

import { DaoPageWrapperDecorator } from '@dao-dao/storybook/decorators'
import { DaoMemberCardProps } from '@dao-dao/types'

import { DaoMemberCard } from '../DaoMemberCard'
import { makeProps as makeDaoMemberCardProps } from '../DaoMemberCard.stories'
import { MembersTab } from './MembersTab'

export default {
  title: 'DAO DAO / packages / ui / components / dao / tabs / MembersTab',
  component: MembersTab,
  decorators: [DaoPageWrapperDecorator],
} as ComponentMeta<typeof MembersTab>

const Template: ComponentStory<typeof MembersTab<DaoMemberCardProps>> = (
  args
) => <MembersTab {...args} />

export const Default = Template.bind({})
Default.args = {
  DaoMemberCard,
  members: [
    makeDaoMemberCardProps(),
    makeDaoMemberCardProps(),
    makeDaoMemberCardProps(),
    makeDaoMemberCardProps(),
    makeDaoMemberCardProps(),
  ],
  isMember: true,
  addMemberHref: '#',
}
