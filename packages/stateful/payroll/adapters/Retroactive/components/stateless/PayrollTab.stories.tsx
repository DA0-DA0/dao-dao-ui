import { ComponentMeta, ComponentStory } from '@storybook/react'

import { PayrollTab } from './PayrollTab'

export default {
  title:
    'DAO DAO / packages / stateful / payroll / adapters / Retroactive / components / stateless / PayrollTab',
  component: PayrollTab,
} as ComponentMeta<typeof PayrollTab>

const Template: ComponentStory<typeof PayrollTab> = (args) => (
  <PayrollTab {...args} />
)

export const Default = Template.bind({})
Default.args = {
  status: undefined,
  isMember: true,
  onCreate: async () => alert('create'),
}
