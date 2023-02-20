import { ComponentMeta, ComponentStory } from '@storybook/react'

import { DaoMemberCard, EntityDisplay } from '@dao-dao/stateful'
import { DaoPageWrapperDecorator } from '@dao-dao/storybook/decorators'

import { ButtonLink } from '../../buttons/ButtonLink'
import { makeProps as makeDaoMemberCardProps } from '../DaoMemberCard.stories'
import { MembersTab } from './MembersTab'

export default {
  title:
    'DAO DAO / packages / stateless / components / dao / tabs / MembersTab',
  component: MembersTab,
  decorators: [DaoPageWrapperDecorator],
} as ComponentMeta<typeof MembersTab>

const Template: ComponentStory<typeof MembersTab> = (args) => (
  <MembersTab {...args} />
)

export const Default = Template.bind({})
Default.args = {
  DaoMemberCard,
  members: [
    makeDaoMemberCardProps(),
    makeDaoMemberCardProps(),
    makeDaoMemberCardProps(),
    makeDaoMemberCardProps(),
    makeDaoMemberCardProps(),
    makeDaoMemberCardProps(),
    makeDaoMemberCardProps(),
    makeDaoMemberCardProps(),
    makeDaoMemberCardProps(),
    makeDaoMemberCardProps(),
    makeDaoMemberCardProps(),
    makeDaoMemberCardProps(),
    makeDaoMemberCardProps(),
    makeDaoMemberCardProps(),
  ],
  isMember: true,
  addMemberHref: '#',
  ButtonLink,
  topVoters: {
    title: 'Top Voters',
    otherTitle: 'Other Voters',
    EntityDisplay,
  },
}
