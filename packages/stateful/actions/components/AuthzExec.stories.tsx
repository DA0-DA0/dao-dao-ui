import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ReactHookFormDecorator } from '@dao-dao/storybook'

import { AuthzExecComponent } from './AuthzExec'

export default {
  title: 'DAO DAO / packages / stateful / actions / components / AuthzExec',
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
