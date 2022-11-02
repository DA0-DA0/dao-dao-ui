import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProcessedTQType } from '@dao-dao/types'
import { MultipleChoiceOptionType } from '@dao-dao/types/contracts/CwdProposalMultiple'

import { ProposalVoteTally } from './ProposalVoteTally'

export default {
  title:
    'DAO DAO / packages / proposal-module-adapter / adapters / CwdProposalMultiple / components / ui / ProposalVoteTally',
  component: ProposalVoteTally,
} as ComponentMeta<typeof ProposalVoteTally>

const Template: ComponentStory<typeof ProposalVoteTally> = (args) => (
  <div className="max-w-xl">
    <ProposalVoteTally {...args} />
  </div>
)

const choices = [
  {
    description: 'description',
    index: 0,
    msgs: [],
    option_type: MultipleChoiceOptionType.Standard,
    title: 'OPTION 1',
    vote_count: '100',
    turnoutVotePercentage: 100,
    color: '#8B2EFF',
  },
  {
    description: 'description',
    index: 0,
    msgs: [],
    option_type: MultipleChoiceOptionType.Standard,
    title: 'OPTION 3',
    vote_count: '0',
    turnoutVotePercentage: 0,
    color: '#004EFF',
  },
  {
    description: 'description',
    index: 0,
    msgs: [],
    option_type: MultipleChoiceOptionType.Standard,
    title: 'OPTION 2',
    vote_count: '0',
    turnoutVotePercentage: 0,
    color: '#4F00FF',
  },
  {
    description: 'description',
    index: 1,
    msgs: [],
    option_type: MultipleChoiceOptionType.None,
    title: 'titular_none_option',
    vote_count: '0',
    turnoutVotePercentage: 0,
    color: '#00B3FF',
  },
]

const choices_tied = [
  {
    description: 'description',
    index: 0,
    msgs: [],
    option_type: MultipleChoiceOptionType.Standard,
    title: 'OPTION 1',
    vote_count: '25',
    turnoutVotePercentage: 25,
    color: '#00B3FF',
  },
  {
    description: 'description',
    index: 0,
    msgs: [],
    option_type: MultipleChoiceOptionType.Standard,
    title: 'OPTION 3',
    vote_count: '25',
    turnoutVotePercentage: 25,
    color: '#4F00FF',
  },
  {
    description: 'description',
    index: 0,
    msgs: [],
    option_type: MultipleChoiceOptionType.Standard,
    title: 'OPTION 2',
    vote_count: '25',
    turnoutVotePercentage: 25,
    color: '#8B2EFF',
  },
  {
    description: 'description',
    index: 1,
    msgs: [],
    option_type: MultipleChoiceOptionType.None,
    title: 'titular_none_option',
    vote_count: '25',
    turnoutVotePercentage: 25,
    color: '#004EFF',
  },
]

export const Default = Template.bind({})
Default.args = {
  votesInfo: {
    isTie: false,
    quorum: {
      type: ProcessedTQType.Percent,
      value: 34,
      display: '34%',
    },
    totalVotingPower: 3703,
    turnoutTotal: 1000,
    turnoutPercent: 100,
    quorumReached: false,
    processedChoices: choices,
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

export const Tie = Template.bind({})
Tie.args = {
  ...Default.args,
  votesInfo: {
    ...Default.args!.votesInfo!,
    processedChoices: choices_tied,
    isTie: true,
  },
}
Tie.parameters = Default.parameters
