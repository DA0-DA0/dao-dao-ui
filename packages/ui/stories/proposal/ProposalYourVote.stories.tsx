import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProposalYourVote } from 'components/proposal/ProposalYourVote'

export default {
  title: 'DAO DAO UI V2 / proposal / ProposalYourVote',
  component: ProposalYourVote,
} as ComponentMeta<typeof ProposalYourVote>

const Template: ComponentStory<typeof ProposalYourVote> = (args) => (
  <ProposalYourVote {...args} />
)

export const Default = Template.bind({})
Default.args = {}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=312%3A28036',
  },
}
