import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  ReactHookFormDecorator,
  makeActionsProviderDecorator,
} from '@dao-dao/storybook'
import { ActionOptionsContextType, ContractVersion } from '@dao-dao/types'

import { MigrateContractComponent } from './MigrateContract'

export default {
  title:
    'DAO DAO / packages / stateful / actions / components / MigrateContract',
  component: MigrateContractComponent,
  decorators: [
    ReactHookFormDecorator,
    makeActionsProviderDecorator({
      address: 'junoWalletAddress',
      chainId: 'juno-1',
      bech32Prefix: 'juno',
      context: {
        type: ActionOptionsContextType.Dao,
        coreVersion: ContractVersion.V0_2_0,
      },
    }),
  ],
} as ComponentMeta<typeof MigrateContractComponent>

const Template: ComponentStory<typeof MigrateContractComponent> = (args) => (
  <MigrateContractComponent {...args} />
)

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  data: {},
  isCreating: true,
  onRemove: () => alert('remove'),
  errors: {},
  options: {
    onContractChange: (contract) => alert('onContractChange: ' + contract),
    contractAdmin: 'contractAdmin',
  },
}
