import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProposalVoteClassNameMap } from '@dao-dao/proposal-module-adapter/adapters/cw-proposal-single/components/ProposalYourVote'
import { Vote } from '@dao-dao/state/clients/cw-proposal-single'

import { ProposalYourVote } from './ProposalYourVote'

export default {
  title: 'DAO DAO / packages / ui / components / proposal / ProposalYourVote',
  component: ProposalYourVote,
} as ComponentMeta<typeof ProposalYourVote>

const Template: ComponentStory<typeof ProposalYourVote> = (args) => (
  <ProposalYourVote {...args} />
)

export const Pending = Template.bind({})
Pending.args = {
  className: ProposalVoteClassNameMap['pending'],
  label: 'Pending',
  showBadge: true,
}
Pending.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=312%3A28036',
  },
}

export const Yes = Template.bind({})
Yes.args = {
  className: ProposalVoteClassNameMap[Vote.Yes],
  label: 'Yes',
  showBadge: false,
}
Yes.parameters = Pending.parameters

export const No = Template.bind({})
No.args = {
  className: ProposalVoteClassNameMap[Vote.No],
  label: 'No',
  showBadge: false,
}
No.parameters = Pending.parameters

export const Abstain = Template.bind({})
Abstain.args = {
  className: ProposalVoteClassNameMap[Vote.Abstain],
  label: 'Abstain',
  showBadge: false,
}
Abstain.parameters = Pending.parameters
