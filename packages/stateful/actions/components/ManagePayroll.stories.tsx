import { ComponentMeta, ComponentStory } from '@storybook/react'

import { makeReactHookFormDecorator } from '@dao-dao/storybook/decorators'

import { ManagePayrollComponent, ManagePayrollData } from './ManagePayroll'

export default {
  title: 'DAO DAO / packages / stateful / actions / components / ManagePayroll',
  component: ManagePayrollComponent,
  decorators: [
    makeReactHookFormDecorator<ManagePayrollData>({
      type: 'vesting',
      data: {
        factory: 'junoPayrollFactoryContract',
      },
    }),
  ],
} as ComponentMeta<typeof ManagePayrollComponent>

const Template: ComponentStory<typeof ManagePayrollComponent> = (args) => (
  <ManagePayrollComponent {...args} />
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
