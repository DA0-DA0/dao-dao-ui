import { InformationCircleIcon } from '@heroicons/react/solid'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProposalInfoStat } from 'components/ProposalInfoStat'

export default {
  title: 'DAO DAO UI / ProposalInfoStat',
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
