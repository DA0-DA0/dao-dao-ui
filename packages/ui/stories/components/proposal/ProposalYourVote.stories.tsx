import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  ProposalYourVote,
  ProposalYourVoteEnum,
} from 'components/proposal/ProposalYourVote'

export default {
  title: 'DAO DAO UI V2 / components / proposal / ProposalYourVote',
  component: ProposalYourVote,
} as ComponentMeta<typeof ProposalYourVote>

const Template: ComponentStory<typeof ProposalYourVote> = () => (
  <div className="flex flex-row gap-2">
    <ProposalYourVote vote={ProposalYourVoteEnum.Abstain} />
    <ProposalYourVote vote={ProposalYourVoteEnum.Pending} />
    <ProposalYourVote vote={ProposalYourVoteEnum.No} />
    <ProposalYourVote vote={ProposalYourVoteEnum.Yes} />
  </div>
)

export const Default = Template.bind({})

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=312%3A28036',
  },
}
