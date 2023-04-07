import { ComponentMeta, ComponentStory } from '@storybook/react'

import { NewProposalProps } from '@dao-dao/stateful/proposal-module-adapter/adapters/DaoProposalSingle/common/components/NewProposal/NewProposal'
import { Default as NewProposalStory } from '@dao-dao/stateful/proposal-module-adapter/adapters/DaoProposalSingle/common/components/NewProposal/NewProposal.stories'
import {
  DaoPageWrapperDecorator,
  makeDappLayoutDecorator,
} from '@dao-dao/storybook/decorators'

import {
  ProfileNewProposalCard,
  ProfileNewProposalCardProps,
} from '../components/profile/ProfileNewProposalCard'
import { Default as ProfileNewProposalCardStory } from '../components/profile/ProfileNewProposalCard.stories'
import { CreateProposal } from './CreateProposal'

export default {
  title: 'DAO DAO / packages / stateless / pages / CreateProposal',
  component: CreateProposal,
  decorators: [
    // Direct ancestor of rendered story.
    DaoPageWrapperDecorator,
    makeDappLayoutDecorator(),
  ],
} as ComponentMeta<typeof CreateProposal>

const Template: ComponentStory<typeof CreateProposal> = (args) => (
  <CreateProposal
    {...args}
    newProposal={
      <NewProposalStory {...(NewProposalStory.args as NewProposalProps)} />
    }
  />
)

export const Default = Template.bind({})
Default.args = {
  rightSidebarContent: (
    <ProfileNewProposalCard
      {...(ProfileNewProposalCardStory.args as ProfileNewProposalCardProps)}
    />
  ),
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/Dao-2.0?node-id=985%3A46048',
  },
  nextRouter: {
    asPath: '/dao/core1',
  },
}
