import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ProposalYourVote } from 'components/proposal/ProposalYourVote'

export default {
  title: 'DAO DAO UI v2 / proposal / ProposalYourVote',
  component: ProposalYourVote,
} as ComponentMeta<typeof ProposalYourVote>

const Template: ComponentStory<typeof ProposalYourVote> = (args) => (
  <ProposalYourVote {...args} />
)

export const Abstain = Template.bind({})
Abstain.args = {
  variant: 'abstain',
}

Abstain.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=312%3A28036',
  },
}

export const Pending = Template.bind({})
Pending.args = {
  variant: 'pending',
}

export const No = Template.bind({})
No.args = {
  variant: 'no',
}

export const Yes = Template.bind({})
Yes.args = {
  variant: 'yes',
}
