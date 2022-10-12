import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProposalWalletVoteClassNameMap } from '@dao-dao/proposal-module-adapter/adapters/CwdProposalSingle/components/ProposalWalletVote'
import { Vote } from '@dao-dao/tstypes/contracts/CwdProposalSingle.common'

import { ProposalWalletVote } from './ProposalWalletVote'

export default {
  title: 'DAO DAO / packages / ui / components / proposal / ProposalWalletVote',
  component: ProposalWalletVote,
} as ComponentMeta<typeof ProposalWalletVote>

const Template: ComponentStory<typeof ProposalWalletVote> = (args) => (
  <ProposalWalletVote {...args} />
)

export const Pending = Template.bind({})
Pending.args = {
  className: ProposalWalletVoteClassNameMap['pending'],
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
  className: ProposalWalletVoteClassNameMap[Vote.Yes],
  label: 'Yes',
  showBadge: false,
}
Yes.parameters = Pending.parameters

export const No = Template.bind({})
No.args = {
  className: ProposalWalletVoteClassNameMap[Vote.No],
  label: 'No',
  showBadge: false,
}
No.parameters = Pending.parameters

export const Abstain = Template.bind({})
Abstain.args = {
  className: ProposalWalletVoteClassNameMap[Vote.Abstain],
  label: 'Abstain',
  showBadge: false,
}
Abstain.parameters = Pending.parameters
