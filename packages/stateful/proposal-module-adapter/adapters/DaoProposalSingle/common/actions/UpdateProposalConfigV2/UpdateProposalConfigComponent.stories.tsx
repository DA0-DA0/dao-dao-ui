import { ComponentMeta, ComponentStory } from '@storybook/react'

import { makeReactHookFormDecorator } from '@dao-dao/storybook'
import { DurationUnits } from '@dao-dao/types'

import {
  UpdateProposalConfigComponent,
  UpdateProposalConfigData,
} from './UpdateProposalConfigComponent'

export default {
  title:
    'DAO DAO / packages / stateful / proposal-module-adapter / adapters / DaoProposalSingle / common / actions / UpdateProposalConfigV2',
  component: UpdateProposalConfigComponent,
  decorators: [
    makeReactHookFormDecorator<UpdateProposalConfigData>({
      onlyMembersExecute: true,
      thresholdType: '%',
      thresholdPercentage: 42,
      quorumEnabled: true,
      quorumType: 'majority',
      votingDuration: {
        value: 456,
        units: DurationUnits.Days,
      },
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
