import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { useDaoInfoContext } from '@dao-dao/common'
import {
  CwProposalSingleAdapter,
  matchAdapter as matchProposalModuleAdapter,
} from '@dao-dao/proposal-module-adapter'
import { NewProposalProps } from '@dao-dao/proposal-module-adapter/adapters/cw-proposal-single/common/ui/NewProposal'
import { Default as NewProposalStory } from '@dao-dao/proposal-module-adapter/adapters/cw-proposal-single/common/ui/NewProposal.stories'
import {
  DaoPageWrapperDecorator,
  makeAppLayoutDecorator,
} from '@dao-dao/storybook/decorators'

import {
  ProfileNewProposalCard,
  ProfileNewProposalCardProps,
} from '../components/profile/ProfileNewProposalCard'
import { Default as ProfileNewProposalCardStory } from '../components/profile/ProfileNewProposalCard.stories'
import { CreateProposal } from './CreateProposal'

export default {
  title: 'DAO DAO / packages / ui / pages / CreateProposal',
  component: CreateProposal,
  decorators: [
    // Direct ancestor of rendered story.
    DaoPageWrapperDecorator,
    makeAppLayoutDecorator({
      rightSidebar: (
        <ProfileNewProposalCard
          {...(ProfileNewProposalCardStory.args as ProfileNewProposalCardProps)}
        />
      ),
    }),
  ],
} as ComponentMeta<typeof CreateProposal>

const Template: ComponentStory<typeof CreateProposal> = (args) => {
  const daoInfo = useDaoInfoContext()

  const [selectedProposalModule, setSelectedProposalModule] = useState(
    // Default to single choice proposal module.
    daoInfo.proposalModules.find(
      ({ contractName }) =>
        matchProposalModuleAdapter(contractName)?.id ===
        CwProposalSingleAdapter.id
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
  isMember: true,
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/Dao-2.0?node-id=985%3A46048',
  },
}
