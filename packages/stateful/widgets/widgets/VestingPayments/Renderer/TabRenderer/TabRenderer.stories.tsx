import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Trans } from 'react-i18next'

import { ButtonLink } from '@dao-dao/stateless'
import { DaoPageWrapperDecorator } from '@dao-dao/storybook'

import { VestingPaymentCard } from '../../components/VestingPaymentCard'
import { TabRenderer } from './TabRenderer'

export default {
  title:
    'DAO DAO / packages / stateful / widgets / widgets / VestingPayments / Renderer / TabRenderer',
  component: TabRenderer,
  decorators: [DaoPageWrapperDecorator],
} as ComponentMeta<typeof TabRenderer>

const Template: ComponentStory<typeof TabRenderer> = (args) => (
  <TabRenderer {...args} />
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
  Trans,
}
