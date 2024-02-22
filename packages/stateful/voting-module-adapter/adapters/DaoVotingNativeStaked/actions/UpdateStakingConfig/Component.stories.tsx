import { ComponentMeta, ComponentStory } from '@storybook/react'

import { makeReactHookFormDecorator } from '@dao-dao/storybook'
import { DurationUnits } from '@dao-dao/types'

import {
  UpdateStakingConfigComponent,
  UpdateStakingConfigData,
} from './Component'

export default {
  title:
    'DAO DAO / packages / stateful / voting-module-adapter / adapters / DaoVotingNativeStaked / actions / UpdateStakingConfig',
  component: UpdateStakingConfigComponent,
  decorators: [
    makeReactHookFormDecorator<UpdateStakingConfigData>({
      unstakingDurationEnabled: true,
      unstakingDuration: {
        value: 4,
        units: DurationUnits.Days,
      },
    }),
  ],
} as ComponentMeta<typeof UpdateStakingConfigComponent>

const Template: ComponentStory<typeof UpdateStakingConfigComponent> = (
  args
) => <UpdateStakingConfigComponent {...args} />

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  data: {},
  isCreating: true,
}
