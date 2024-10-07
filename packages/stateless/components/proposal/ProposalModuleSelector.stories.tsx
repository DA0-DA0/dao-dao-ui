import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { matchAdapter } from '@dao-dao/stateful/proposal-module-adapter'
import { DaoPageWrapperDecorator } from '@dao-dao/storybook/decorators'
import { DaoProposalSingleAdapterId } from '@dao-dao/utils'

import { useDao } from '../../contexts'
import { ProposalModuleSelector } from './ProposalModuleSelector'

export default {
  title:
    'DAO DAO / packages / stateless / components / proposal / ProposalModuleSelector',
  component: ProposalModuleSelector,
  decorators: [DaoPageWrapperDecorator],
} as ComponentMeta<typeof ProposalModuleSelector>

const Template: ComponentStory<typeof ProposalModuleSelector> = (args) => {
  const dao = useDao()

  const [selectedProposalModule, setSelectedProposalModule] = useState(
    // Default to single choice proposal module.
    dao.proposalModules.find(
      ({ contractName }) =>
        matchAdapter(contractName)?.id === DaoProposalSingleAdapterId
    )!
  )

  return (
    <ProposalModuleSelector
      {...args}
      matchAdapter={matchAdapter}
      selected={selectedProposalModule.address}
      setSelected={setSelectedProposalModule}
    />
  )
}

export const Default = Template.bind({})
Default.args = {}
