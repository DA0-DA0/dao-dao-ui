import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ReactHookFormDecorator } from '@dao-dao/storybook'

import { AddressInput, EntityDisplay } from '../../../../components'
import { ManageVetoableDaosComponent } from './Component'

export default {
  title:
    'DAO DAO / packages / stateful / actions / core / dao_governance / ManageVetoableDaos',
  component: ManageVetoableDaosComponent,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof ManageVetoableDaosComponent>

const Template: ComponentStory<typeof ManageVetoableDaosComponent> = (args) => (
  <ManageVetoableDaosComponent {...args} />
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
    currentlyEnabled: [],
    AddressInput,
    EntityDisplay,
  },
}
