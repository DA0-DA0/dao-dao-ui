import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProcessedTQType, ProposalStatus } from '@dao-dao/types'
import { MultipleChoiceOptionType } from '@dao-dao/types/contracts/DaoProposalMultiple'

import { ProposalVoteTally } from './ProposalVoteTally'

export default {
  title:
    'DAO DAO / packages / proposal-module-adapter / adapters / DaoProposalMultiple / components / ProposalVoteTally',
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
    optionType: MultipleChoiceOptionType.Standard,
    title: 'OPTION 1',
    turnoutVotePercentage: 100,
    color: '#8B2EFF',
  },
  {
    description: 'description',
    index: 0,
    msgs: [],
    optionType: MultipleChoiceOptionType.Standard,
    title: 'OPTION 3',
    turnoutVotePercentage: 0,
    color: '#004EFF',
  },
  {
    description: 'description',
    index: 0,
    msgs: [],
    optionType: MultipleChoiceOptionType.Standard,
    title: 'OPTION 2',
    turnoutVotePercentage: 0,
    color: '#4F00FF',
  },
  {
    description: 'description',
    index: 1,
    msgs: [],
    optionType: MultipleChoiceOptionType.None,
    title: 'titular_none_option',
    turnoutVotePercentage: 0,
    color: '#00B3FF',
  },
]

const choicesTied = [
  {
    description: 'description',
    index: 0,
    msgs: [],
    optionType: MultipleChoiceOptionType.Standard,
    title: 'OPTION 1',
    turnoutVotePercentage: 25,
    color: '#00B3FF',
  },
  {
    description: 'description',
    index: 0,
    msgs: [],
    optionType: MultipleChoiceOptionType.Standard,
    title: 'OPTION 3',
    turnoutVotePercentage: 25,
    color: '#4F00FF',
  },
  {
    description: 'description',
    index: 0,
    msgs: [],
    optionType: MultipleChoiceOptionType.Standard,
    title: 'OPTION 2',
    turnoutVotePercentage: 25,
    color: '#8B2EFF',
  },
  {
    description: 'description',
    index: 1,
    msgs: [],
    optionType: MultipleChoiceOptionType.None,
    title: 'titular_none_option',
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
    winningChoice: choices[0],
  },
  status: ProposalStatus.Open,
}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/Dao-2.0?node-id=983%3A90273',
  },
}

export const Tie = Template.bind({})
Tie.args = {
  ...Default.args,
  votesInfo: {
    ...Default.args!.votesInfo!,
    processedChoices: choicesTied,
    isTie: true,
    winningChoice: undefined,
  },
}
Tie.parameters = Default.parameters
