import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ReactHookFormDecorator } from '@dao-dao/storybook/decorators'

import { WyndDepositWidget, getWidgets } from '../../../../widgets'
import { ManageWidgetsComponent } from './Component'

export default {
  title:
    'DAO DAO / packages / stateful / actions / core / dao_appearance / ManageWidgets',
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
