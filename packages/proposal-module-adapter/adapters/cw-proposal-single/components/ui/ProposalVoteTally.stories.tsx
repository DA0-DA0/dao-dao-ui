import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProcessedTQType } from '@dao-dao/tstypes'

import { ProposalVoteTally } from './ProposalVoteTally'

export default {
  title:
    'DAO DAO / packages / proposal-module-adapter / adapters / cw-proposal-single / components / ui / ProposalVoteTally',
  component: ProposalVoteTally,
} as ComponentMeta<typeof ProposalVoteTally>

const Template: ComponentStory<typeof ProposalVoteTally> = (args) => (
  <div className="max-w-xl">
    <ProposalVoteTally {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  threshold: {
    type: ProcessedTQType.Majority,
    display: 'Majority',
  },
  quorum: {
    type: ProcessedTQType.Percent,
    value: 34,
    display: '34%',
  },
  yesVotes: 873,
  noVotes: 54,
  abstainVotes: 73,
  totalVotingPower: 3703,
  open: true,
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/Dao-2.0?node-id=983%3A90273',
  },
}

export const NoQuorum = Template.bind({})
NoQuorum.args = {
  ...Default.args,
  quorum: undefined,
}
NoQuorum.parameters = Default.parameters
