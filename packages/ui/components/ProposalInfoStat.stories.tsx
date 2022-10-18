import { InformationCircleIcon } from '@heroicons/react/solid'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProposalInfoStat } from './ProposalInfoStat'

export default {
  title: '(OLD DAO DAO) / components / ProposalInfoStat',
  component: ProposalInfoStat,
} as ComponentMeta<typeof ProposalInfoStat>

const Template: ComponentStory<typeof ProposalInfoStat> = (args) => (
  <ProposalInfoStat {...args} />
)

export const Default = Template.bind({})
Default.args = {
  Icon: InformationCircleIcon,
  title: 'Title',
  value: 'Value',
}
