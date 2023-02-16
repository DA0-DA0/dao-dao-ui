import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import {
  DaoProposalSingleAdapter,
  matchAdapter as matchProposalModuleAdapter,
} from '@dao-dao/stateful/proposal-module-adapter'
import { NewProposalProps } from '@dao-dao/stateful/proposal-module-adapter/adapters/DaoProposalSingle/common/ui/NewProposal'
import { Default as NewProposalStory } from '@dao-dao/stateful/proposal-module-adapter/adapters/DaoProposalSingle/common/ui/NewProposal.stories'
import {
  DaoPageWrapperDecorator,
  makeDappLayoutDecorator,
} from '@dao-dao/storybook/decorators'

import {
  ProfileNewProposalCard,
  ProfileNewProposalCardProps,
} from '../components/profile/ProfileNewProposalCard'
import { Default as ProfileNewProposalCardStory } from '../components/profile/ProfileNewProposalCard.stories'
import { useDaoInfoContext } from '../hooks'
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

const Template: ComponentStory<typeof CreateProposal> = (args) => {
  const daoInfo = useDaoInfoContext()

  const [selectedProposalModule, setSelectedProposalModule] = useState(
    // Default to single choice proposal module.
    daoInfo.proposalModules.find(
      ({ contractName }) =>
        matchProposalModuleAdapter(contractName)?.id ===
        DaoProposalSingleAdapter.id
    )!
  )

  return (
    <CreateProposal
      {...args}
      daoInfo={daoInfo}
      newProposal={
        <NewProposalStory {...(NewProposalStory.args as NewProposalProps)} />
      }
      proposalModule={selectedProposalModule}
      setProposalModule={setSelectedProposalModule}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  rightSidebarContent: (
    <ProfileNewProposalCard
      {...(ProfileNewProposalCardStory.args as ProfileNewProposalCardProps)}
    />
  ),
  matchAdapter: matchProposalModuleAdapter,
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
