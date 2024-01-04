import { ComponentMeta, ComponentStory } from '@storybook/react'

import { makeReactHookFormDecorator } from '@dao-dao/storybook'
import { DurationUnits } from '@dao-dao/types'
import { convertCosmosVetoConfigToVeto } from '@dao-dao/utils'

import {
  UpdateProposalConfigComponent,
  UpdateProposalConfigData,
} from './UpdateProposalConfigComponent'

export default {
  title:
    'DAO DAO / packages / stateful / proposal-module-adapter / adapters / DaoProposalMultiple / common / actions / UpdateProposalConfigV2',
  component: UpdateProposalConfigComponent,
  decorators: [
    makeReactHookFormDecorator<UpdateProposalConfigData>({
      onlyMembersExecute: true,
      quorumType: 'majority',
      votingDuration: {
        value: 456,
        units: DurationUnits.Days,
      },
      allowRevoting: true,
      // Default.
      veto: convertCosmosVetoConfigToVeto(null),
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
