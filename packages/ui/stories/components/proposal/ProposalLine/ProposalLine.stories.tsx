import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ContractVersion, secondsToWdhms } from '@dao-dao/utils'

import {
  ProposalLine,
  ProposalLineProps,
} from 'components/proposal/ProposalLine'
import {
  ProposalStatus,
  ProposalStatusProps,
} from 'components/proposal/ProposalStatus'
import {
  ProposalYourVote,
  ProposalYourVoteProps,
} from 'components/proposal/ProposalYourVote'
import { Open as OpenProposalStatusStory } from 'stories/components/proposal/ProposalStatus.stories'
import { Pending as PendingProposalYourVoteStory } from 'stories/components/proposal/ProposalYourVote.stories'

export default {
  title: 'DAO DAO UI V2 / components / proposal / ProposalLine',
  component: ProposalLine,
  // Don't export helper function `makeProps`.
  excludeStories: ['makeProps'],
} as ComponentMeta<typeof ProposalLine>

const Template: ComponentStory<typeof ProposalLine> = (args) => (
  <ProposalLine {...args} />
)

export const makeProps = (
  // 3 days.
  secondsRemaining = 3 * 24 * 60 * 60
): ProposalLineProps => ({
  proposalPrefix: 'A',
  proposalNumber: Math.floor(Math.random() * 100),
  proposalModuleVersion: ContractVersion.V0_2_0,
  title: 'Give everyone 1 million dollars.',
  expiration: secondsToWdhms(secondsRemaining, 1) + ' left',
  status: (
    <ProposalStatus
      {...(OpenProposalStatusStory.args as ProposalStatusProps)}
    />
  ),
  vote: (
    <ProposalYourVote
      {...(PendingProposalYourVoteStory.args as ProposalYourVoteProps)}
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
