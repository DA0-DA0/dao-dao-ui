import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ContractVersion, secondsToWdhms } from '@dao-dao/utils'

import { StatusDisplay, StatusDisplayProps } from '../StatusDisplay'
import * as StatusDisplayStories from '../StatusDisplay.stories'
import { ProposalLine, ProposalLineProps } from './ProposalLine'
import { ProposalYourVote, ProposalYourVoteProps } from './ProposalYourVote'
import * as ProposalYourVoteStories from './ProposalYourVote.stories'

export default {
  title: 'DAO DAO / packages / ui / components / proposal / ProposalLine',
  component: ProposalLine,
  // Don't export helper function `makeProps`.
  excludeStories: ['makeProps'],
} as ComponentMeta<typeof ProposalLine>

const Template: ComponentStory<typeof ProposalLine> = (args) => (
  <ProposalLine {...args} />
)

export const makeProps = (
  // 3 days.
  secondsRemaining = 3 * 24 * 60 * 60,
  status: Omit<keyof typeof StatusDisplayStories, 'default'> = 'Open',
  vote: Omit<keyof typeof ProposalYourVoteStories, 'default'> = 'Pending'
): ProposalLineProps => ({
  proposalPrefix: 'A',
  proposalNumber: Math.floor(Math.random() * 100),
  proposalModuleVersion: ContractVersion.V0_2_0,
  title: 'Give everyone 1 million dollars.',
  expiration: secondsToWdhms(secondsRemaining, 1) + ' left',
  status: (
    <StatusDisplay
      {...(StatusDisplayStories[status as keyof typeof StatusDisplayStories]
        .args as StatusDisplayProps)}
    />
  ),
  vote: (
    <ProposalYourVote
      {...(ProposalYourVoteStories[vote as keyof typeof ProposalYourVoteStories]
        .args as ProposalYourVoteProps)}
    />
  ),
  lastUpdated: new Date(
    // Last updated 2 days ago.
    new Date().getTime() - 48 * 60 * 60 * 1000
  ),
})

export const Default = Template.bind({})
Default.args = makeProps()
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=312%3A27923',
  },
}
