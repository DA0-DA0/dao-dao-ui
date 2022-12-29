import { ComponentMeta, ComponentStory } from '@storybook/react'

import { makeReactHookFormDecorator } from '@dao-dao/storybook'

import { UpdateProposalConfigData } from '.'
import { UpdateProposalConfigComponent } from './UpdateProposalConfigComponent'

export default {
  title:
    'DAO DAO / packages / stateful / proposal-module-adapter / adapters / DaoProposalSingle / common / actions / makeUpdateProposalConfigV2Action / UpdateProposalConfigComponent',
  component: UpdateProposalConfigComponent,
  decorators: [
    makeReactHookFormDecorator<UpdateProposalConfigData>({
      onlyMembersExecute: true,
      thresholdType: '%',
      thresholdPercentage: 42,
      quorumEnabled: true,
      quorumType: 'majority',
      proposalDuration: 456,
      proposalDurationUnits: 'days',
      allowRevoting: true,
    }),
  ],
} as ComponentMeta<typeof UpdateProposalConfigComponent>

const Template: ComponentStory<typeof UpdateProposalConfigComponent> = (
  args
) => <UpdateProposalConfigComponent {...args} />

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  data: {},
  isCreating: true,
}
