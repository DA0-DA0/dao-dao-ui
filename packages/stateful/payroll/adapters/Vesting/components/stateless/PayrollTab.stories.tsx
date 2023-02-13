import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ButtonLink } from '@dao-dao/stateless'
import { DaoPageWrapperDecorator } from '@dao-dao/storybook'

import { VestingPaymentCard } from '../stateful/VestingPaymentCard'
import { PayrollTab } from './PayrollTab'

export default {
  title:
    'DAO DAO / packages / stateful / payroll / adapters / Vesting / components / stateless / PayrollTab',
  component: PayrollTab,
  decorators: [DaoPageWrapperDecorator],
} as ComponentMeta<typeof PayrollTab>

const Template: ComponentStory<typeof PayrollTab> = (args) => (
  <PayrollTab {...args} />
)

export const Default = Template.bind({})
Default.args = {
  vestingPaymentsLoading: {
    loading: false,
    data: [],
  },
  isMember: true,
  ButtonLink,
  VestingPaymentCard,
}
