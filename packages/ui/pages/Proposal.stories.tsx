import { ComponentMeta, ComponentStory } from '@storybook/react'

import { useProposalModuleAdapterOptions } from '@dao-dao/proposal-module-adapter'
import {
  DaoPageWrapperDecorator,
  makeAppLayoutDecorator,
  makeProposalModuleAdapterDecorator,
} from '@dao-dao/storybook/decorators'

import { ProfileVoteCard, ProfileVoteCardProps } from '../components'
import { Default as ProfileVoteCardStory } from '../components/profile/ProfileVoteCard.stories'
import { Proposal } from './Proposal'

const proposalId = 'A72'

export default {
  title: 'DAO DAO / packages / ui / pages / Proposal',
  component: Proposal,
  decorators: [
    // Direct ancestor of rendered story.
    makeProposalModuleAdapterDecorator(proposalId),
    DaoPageWrapperDecorator,
    makeAppLayoutDecorator({
      rightSidebarProps: {
        children: (
          <ProfileVoteCard
            {...(ProfileVoteCardStory.args as ProfileVoteCardProps<string>)}
          />
        ),
      },
    }),
  ],
} as ComponentMeta<typeof Proposal>

const Template: ComponentStory<typeof Proposal> = (args) => (
  <Proposal
    {...args}
    proposalModuleAdapterOptions={useProposalModuleAdapterOptions()}
  />
)

export const Default = Template.bind({})
Default.args = {
  voteStatus:
    'If the current vote stands, the proposal will pass. If quorum reaches 50%, the proposal is applicable.',
  voteDisplay: (
    <p className="p-4 text-center bg-background-primary rounded-md border border-border-secondary">
      Vote display placeholder
    </p>
  ),
  votesCast: (
    <p className="p-4 text-center bg-background-primary rounded-md border border-border-tertiary">
      Votes cast placeholder
    </p>
  ),
  proposalStatus: 'Open',
  dao: {
    name: 'Dog Dao',
    address: 'juno123abc456xyz',
  },
  creator: {
    name: 'Ben2x4',
    address: 'juno789def000ghi',
  },
  // Random date in the past 5 days.
  created: new Date(Date.now() - Math.random() * 5 * 24 * 60 * 60 * 1000),
  expiration: '3 days',
  title: 'Enable liquidity rewards for Junoswap LPs',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla sed consectetur. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.\n\nAenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Cras mattis consectetur purus sit amet fermentum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna.',
  decodedMessages: [
    {
      custom: {},
    },
  ],
  actionList: (
    <p className="p-4 text-center rounded-md border border-border-primary">
      Action list placeholder
    </p>
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
