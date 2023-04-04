import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  ReactHookFormDecorator,
  makeDaoInfo,
  makeDaoProvidersDecorator,
} from '@dao-dao/storybook'

import { MigrateContractComponent } from './Component'

export default {
  title:
    'DAO DAO / packages / stateful / actions / core / smart_contracting / MigrateContract',
  component: MigrateContractComponent,
  decorators: [
    ReactHookFormDecorator,
    makeDaoProvidersDecorator(makeDaoInfo()),
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
  errors: {},
  options: {
    onContractChange: (contract) => alert('onContractChange: ' + contract),
    contractAdmin: 'contractAdmin',
  },
}
