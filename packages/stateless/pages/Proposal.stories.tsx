import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  ProposalVoteTally,
  ProposalVoteTallyProps,
} from '@dao-dao/stateful/proposal-module-adapter/adapters/DaoProposalSingle/components/ui/ProposalVoteTally'
import { Default as ProposalVoteTallyStory } from '@dao-dao/stateful/proposal-module-adapter/adapters/DaoProposalSingle/components/ui/ProposalVoteTally.ProposalVoteTally.stories'
import {
  DaoPageWrapperDecorator,
  makeAppLayoutDecorator,
  makeProposalModuleAdapterDecorator,
} from '@dao-dao/storybook/decorators'

import {
  ProfileVoteCard,
  ProfileVoteCardProps,
  ProposalStatusAndInfoProps,
} from '../components'
import { Default as ProfileVoteCardStory } from '../components/profile/ProfileVoteCard.stories'
import { Default as ProposalStatusAndInfoStory } from '../components/proposal/ProposalStatusAndInfo.stories'
import { ProposalVotes } from '../components/proposal/ProposalVotes'
import { makeProps as makeProposalVotesProps } from '../components/proposal/ProposalVotes.stories'
import { useDaoInfoContext } from '../hooks/useDaoInfoContext'
import { Proposal } from './Proposal'

const proposalId = 'A72'

export default {
  title: 'DAO DAO / packages / stateless / pages / Proposal',
  component: Proposal,
  decorators: [
    // Direct ancestor of rendered story.
    makeProposalModuleAdapterDecorator(proposalId),
    DaoPageWrapperDecorator,
    makeAppLayoutDecorator(),
  ],
} as ComponentMeta<typeof Proposal>

const Template: ComponentStory<typeof Proposal> = (args) => (
  <Proposal {...args} daoInfo={useDaoInfoContext()} />
)

export const Default = Template.bind({})
Default.args = {
  ProposalStatusAndInfo: (props) => (
    <ProposalStatusAndInfoStory
      {...(ProposalStatusAndInfoStory.args as ProposalStatusAndInfoProps)}
      {...props}
    />
  ),
  proposalInfo: {
    id: 'B2',
    title: 'Enable liquidity rewards for Junoswap LPs',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla sed consectetur. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.\n\nAenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Cras mattis consectetur purus sit amet fermentum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna.',
    votingOpen: true,
    // Random date in the past 5 days.
    createdAtEpoch: new Date(
      Date.now() - Math.random() * 5 * 24 * 60 * 60 * 1000
    ).getTime(),
    // Random date in the next 5 days.
    // Nanoseconds
    expiration: {
      at_time: (
        (Date.now() + Math.random() * 5 * 24 * 60 * 60 * 1000) *
        1000000
      ).toString(),
    },
    createdByAddress: 'juno789def000ghi',
  },
  voteTally: (
    <ProposalVoteTally
      {...(ProposalVoteTallyStory.args as ProposalVoteTallyProps)}
    />
  ),
  votesCast: <ProposalVotes {...makeProposalVotesProps()} />,
  creator: {
    name: { loading: false, data: 'Ben2x4' },
    address: 'juno789def000ghi',
  },
  actionDisplay: (
    <p className="rounded-md border border-border-primary p-4 text-center">
      Action display placeholder
    </p>
  ),
  rightSidebarContent: (
    <ProfileVoteCard
      {...(ProfileVoteCardStory.args as ProfileVoteCardProps<string>)}
    />
  ),
  onRefresh: () => alert('refresh'),
  refreshing: false,
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
