import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  ProposalVoteTally,
  ProposalVoteTallyProps,
} from '@dao-dao/stateful/proposal-module-adapter/adapters/DaoProposalSingle/components/ProposalVoteTally/ProposalVoteTally'
import { Default as ProposalVoteTallyStory } from '@dao-dao/stateful/proposal-module-adapter/adapters/DaoProposalSingle/components/ProposalVoteTally/ProposalVoteTally.ProposalVoteTally.stories'
import {
  DaoPageWrapperDecorator,
  makeDappLayoutDecorator,
  makeProposalModuleAdapterDecorator,
} from '@dao-dao/storybook/decorators'
import { Vote } from '@dao-dao/types/contracts/DaoProposalSingle.common'

import {
  ProfileVoteCard,
  ProfileVoteCardProps,
  ProposalContentDisplayProps,
  ProposalStatusAndInfo,
  ProposalStatusAndInfoProps,
} from '../components'
import { Default as ProfileVoteCardStory } from '../components/profile/ProfileVoteCard.stories'
import { Default as ProposalContentDisplayStory } from '../components/proposal/ProposalContentDisplay.stories'
import { Vote as ProposalStatusAndInfoVoteStory } from '../components/proposal/ProposalStatusAndInfo.stories'
import { ProposalVotes } from '../components/proposal/ProposalVotes'
import { makeProps as makeProposalVotesProps } from '../components/proposal/ProposalVotes.stories'
import { Proposal } from './Proposal'

const proposalId = 'A72'

export default {
  title: 'DAO DAO / packages / stateless / pages / Proposal',
  component: Proposal,
  decorators: [
    // Direct ancestor of rendered story.
    makeProposalModuleAdapterDecorator(proposalId),
    DaoPageWrapperDecorator,
    makeDappLayoutDecorator(),
  ],
} as ComponentMeta<typeof Proposal>

const Template: ComponentStory<typeof Proposal> = (args) => (
  <Proposal {...args} />
)

export const Default = Template.bind({})
Default.args = {
  ProposalStatusAndInfo: (props) => (
    <ProposalStatusAndInfo
      {...(ProposalStatusAndInfoVoteStory.args as ProposalStatusAndInfoProps<Vote>)}
      {...props}
    />
  ),
  id: 'B2',
  voteTally: (
    <ProposalVoteTally
      {...(ProposalVoteTallyStory.args as ProposalVoteTallyProps)}
    />
  ),
  votesCast: <ProposalVotes {...makeProposalVotesProps()} />,
  contentDisplay: (
    <ProposalContentDisplayStory
      {...(ProposalContentDisplayStory.args as ProposalContentDisplayProps)}
    />
  ),
  rightSidebarContent: (
    <ProfileVoteCard {...(ProfileVoteCardStory.args as ProfileVoteCardProps)} />
  ),
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=313%3A30661',
  },
  nextRouter: {
    asPath: '/dao/core1',
  },
}
