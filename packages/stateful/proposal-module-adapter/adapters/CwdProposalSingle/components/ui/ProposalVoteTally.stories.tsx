import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProcessedTQType } from '@dao-dao/types'

import { ProposalVoteTally } from './ProposalVoteTally'

export default {
  title:
    'DAO DAO / packages / stateful / proposal-module-adapter / adapters / CwdProposalSingle / components / ui / ProposalVoteTally',
  component: ProposalVoteTally,
} as ComponentMeta<typeof ProposalVoteTally>

const Template: ComponentStory<typeof ProposalVoteTally> = (args) => (
  <div className="max-w-xl">
    <ProposalVoteTally {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  votesInfo: {
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
    turnoutTotal: 1000,
    turnoutPercent: (1000 / 3703) * 100,
    turnoutYesPercent: 87.3,
    turnoutNoPercent: 5.4,
    turnoutAbstainPercent: 7.3,
    totalYesPercent: (873 / 3703) * 100,
    totalNoPercent: (54 / 3703) * 100,
    totalAbstainPercent: (73 / 3703) * 100,
    thresholdReached: false,
    quorumReached: false,
  },
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
  votesInfo: {
    ...Default.args!.votesInfo!,
    quorum: undefined,
  },
}
NoQuorum.parameters = Default.parameters
