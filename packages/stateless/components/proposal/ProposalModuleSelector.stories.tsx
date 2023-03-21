import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { matchAdapter } from '@dao-dao/stateful/proposal-module-adapter'
import { useDaoInfoContext } from '@dao-dao/stateless'
import { DaoPageWrapperDecorator } from '@dao-dao/storybook/decorators'
import { DaoProposalSingleAdapterId } from '@dao-dao/utils'

import { ProposalModuleSelector } from './ProposalModuleSelector'

export default {
  title:
    'DAO DAO / packages / stateless / components / proposal / ProposalModuleSelector',
  component: ProposalModuleSelector,
  decorators: [DaoPageWrapperDecorator],
} as ComponentMeta<typeof ProposalModuleSelector>

const Template: ComponentStory<typeof ProposalModuleSelector> = (args) => {
  const daoInfo = useDaoInfoContext()

  const [selectedProposalModule, setSelectedProposalModule] = useState(
    // Default to single choice proposal module.
    daoInfo.proposalModules.find(
      ({ contractName }) =>
        matchAdapter(contractName)?.id === DaoProposalSingleAdapterId
    )!
  )

  return (
    <ProposalModuleSelector
      {...args}
      selected={selectedProposalModule}
      setSelected={setSelectedProposalModule}
    />
  )
}

export const Default = Template.bind({})
Default.args = {}
