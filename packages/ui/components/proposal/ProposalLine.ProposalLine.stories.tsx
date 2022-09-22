import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ContractVersion } from '@dao-dao/tstypes'
import { secondsToWdhms } from '@dao-dao/utils'

import { StatusDisplay, StatusDisplayProps } from '../StatusDisplay'
import * as StatusDisplayStories from '../StatusDisplay.stories'
import { ProposalLine, ProposalLineProps } from './ProposalLine'
import {
  ProposalWalletVote,
  ProposalWalletVoteProps,
} from './ProposalWalletVote'
import * as ProposalWalletVoteStories from './ProposalWalletVote.stories'

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
  vote: Omit<keyof typeof ProposalWalletVoteStories, 'default'> = 'Pending'
): ProposalLineProps => ({
  href: '#',
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
    <ProposalWalletVote
      {...(ProposalWalletVoteStories[
        vote as keyof typeof ProposalWalletVoteStories
      ].args as ProposalWalletVoteProps)}
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
