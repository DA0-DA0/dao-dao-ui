import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AddressInput } from '@dao-dao/stateless'
import { ReactHookFormDecorator } from '@dao-dao/storybook'

import { AuthzExecComponent } from './Component'

export default {
  title:
    'DAO DAO / packages / stateful / actions / core / authorizations / AuthzExec',
  component: AuthzExecComponent,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof AuthzExecComponent>

const Template: ComponentStory<typeof AuthzExecComponent> = (args) => (
  <AuthzExecComponent {...args} />
)

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  data: {},
  isCreating: false,
  options: {
    AddressInput,
    validators: [
      {
        address: 'aDifferentOne',
        moniker: 'A different one',
        website: '',
        details: '',
        commission: 0.05,
        status: 'BOND_STATUS_BONDED',
        tokens: 9,
      },
    ],
  },
}
