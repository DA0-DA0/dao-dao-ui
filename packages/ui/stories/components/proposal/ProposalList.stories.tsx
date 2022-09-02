import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProposalList } from 'components/proposal/ProposalList'

import { makeProps as makeProposalProps } from './ProposalLine/ProposalLine.stories'

export default {
  title: 'DAO DAO V2 / components / proposal / ProposalList',
  component: ProposalList,
} as ComponentMeta<typeof ProposalList>

const Template: ComponentStory<typeof ProposalList> = (args) => (
  <ProposalList {...args} />
)

export const Default = Template.bind({})
Default.args = {
  // Generate between 1 and 3 proposals.
  openProposals: [...Array(Math.floor(Math.random() * 3) + 1)].map(() =>
    makeProposalProps()
  ),
  // Generate between 5 and 15 proposals.
  historyProposals: [...Array(Math.floor(Math.random() * 11) + 5)].map(() =>
    makeProposalProps(
      undefined,
      // Pick one at random.
      ['Passed', 'Rejected'][Math.floor(Math.random() * 2)],
      // Pick one at random.
      ['Yes', 'No', 'Abstain'][Math.floor(Math.random() * 3)]
    )
  ),
}
