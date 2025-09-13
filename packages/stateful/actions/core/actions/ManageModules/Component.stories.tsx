import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CHAIN_ID } from '@dao-dao/storybook'
import { ReactHookFormDecorator } from '@dao-dao/storybook/decorators'
import { ContractVersion, ModuleType } from '@dao-dao/types'

import { SuspenseLoader } from '../../../../components'
import { PressModule, getModules } from '../../../../modules'
import { ManageModulesComponent } from './Component'

export default {
  title:
    'DAO DAO / packages / stateful / actions / core / actions / ManageModules',
  component: ManageModulesComponent,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof ManageModulesComponent>

const Template: ComponentStory<typeof ManageModulesComponent> = (args) => (
  <ManageModulesComponent {...args} />
)

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  data: {},
  isCreating: true,
  errors: {},
  options: {
    availableModules: getModules({
      chainId: CHAIN_ID,
      version: ContractVersion.V260,
    }),
    existingModules: [
      {
        id: PressModule.id,
        type: ModuleType.External,
        values: PressModule.defaultValues,
      },
    ],
    SuspenseLoader,
  },
}
