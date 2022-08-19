import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProposalYourVote } from 'components/proposal/ProposalYourVote'

export default {
  title: 'DAO DAO UI v2 / proposal / ProposalYourVote',
  component: ProposalYourVote,
} as ComponentMeta<typeof ProposalYourVote>

const Template: ComponentStory<typeof ProposalYourVote> = () => (
  <div className="flex flex-row gap-2">
    <ProposalYourVote variant="abstain" />
    <ProposalYourVote variant="pending" />
    <ProposalYourVote variant="no" />
    <ProposalYourVote variant="yes" />
  </div>
)

export const Default = Template.bind({})

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=312%3A28036',
  },
}
