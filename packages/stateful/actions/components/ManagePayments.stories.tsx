import { ComponentMeta, ComponentStory } from '@storybook/react'

import { makeReactHookFormDecorator } from '@dao-dao/storybook/decorators'

import { ManagePaymentsComponent, ManagePaymentsData } from './ManagePayments'

export default {
  title:
    'DAO DAO / packages / stateful / actions / components / ManagePayments',
  component: ManagePaymentsComponent,
  decorators: [
    makeReactHookFormDecorator<ManagePaymentsData>({
      type: 'vesting',
      data: {
        factory: 'junoPayrollFactoryContract',
      },
    }),
  ],
} as ComponentMeta<typeof ManagePaymentsComponent>

const Template: ComponentStory<typeof ManagePaymentsComponent> = (args) => (
  <ManagePaymentsComponent {...args} />
)

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  isCreating: true,
  onRemove: () => alert('remove'),
  errors: {},
  options: {
    instantiating: false,
    instantiateVestingFactory: async () => alert('instantiate'),
  },
}
