import { ComponentMeta, ComponentStory } from '@storybook/react'

import { useDaoInfoContext } from '@dao-dao/common'

import { MembersTab } from 'components/dao/tabs/MembersTab'
import { DaoPageWrapperDecorator } from 'decorators'

import { makeProps as makeDaoMemberCardProps } from '../DaoMemberCard.stories'

export default {
  title: 'DAO DAO UI V2 / components / dao / tabs / MembersTab',
  component: MembersTab,
  decorators: [DaoPageWrapperDecorator],
} as ComponentMeta<typeof MembersTab>

const Template: ComponentStory<typeof MembersTab> = (args) => (
  <MembersTab {...args} daoInfo={useDaoInfoContext()} />
)

export const Default = Template.bind({})
Default.args = {
  members: [
    makeDaoMemberCardProps(),
    makeDaoMemberCardProps(),
    makeDaoMemberCardProps(),
    makeDaoMemberCardProps(),
    makeDaoMemberCardProps(),
  ],
  isMember: true,
}
