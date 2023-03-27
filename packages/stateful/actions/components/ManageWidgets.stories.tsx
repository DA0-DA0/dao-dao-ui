import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ReactHookFormDecorator } from '@dao-dao/storybook/decorators'

import { WyndDepositWidget, getWidgets } from '../../widgets'
import { ManageWidgetsComponent } from './ManageWidgets'

export default {
  title: 'DAO DAO / packages / stateful / actions / components / ManageWidgets',
  component: ManageWidgetsComponent,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof ManageWidgetsComponent>

const Template: ComponentStory<typeof ManageWidgetsComponent> = (args) => (
  <ManageWidgetsComponent {...args} />
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
    availableWidgets: getWidgets(),
    existingWidgets: [
      {
        id: WyndDepositWidget.id,
        values: WyndDepositWidget.defaultValues,
      },
    ],
  },
}
