import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProposalStatusMap } from './proposal/ProposalStatus'
import { StatusDisplay } from './StatusDisplay'

export default {
  title: 'DAO DAO / packages / stateless / components / StatusDisplay',
  component: StatusDisplay,
} as ComponentMeta<typeof StatusDisplay>

const Template: ComponentStory<typeof StatusDisplay> = (args) => (
  <StatusDisplay {...args} />
)

export const Open = Template.bind({})
Open.args = {
  Icon: ProposalStatusMap.open.Icon,
  iconClassName: ProposalStatusMap.open.iconClassName,
  label: 'Open',
  labelClassName: ProposalStatusMap.open.textClassName,
}
Open.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=312%3A28023',
  },
}

export const Passed = Template.bind({})
Passed.args = {
  Icon: ProposalStatusMap.passed.Icon,
  iconClassName: ProposalStatusMap.passed.iconClassName,
  label: 'Passed',
  labelClassName: ProposalStatusMap.passed.textClassName,
}
Passed.parameters = Open.parameters

export const Rejected = Template.bind({})
Rejected.args = {
  Icon: ProposalStatusMap.rejected.Icon,
  iconClassName: ProposalStatusMap.rejected.iconClassName,
  label: 'Rejected',
  labelClassName: ProposalStatusMap.rejected.textClassName,
}
Rejected.parameters = Open.parameters

export const Executed = Template.bind({})
Executed.args = {
  Icon: ProposalStatusMap.executed.Icon,
  iconClassName: ProposalStatusMap.executed.iconClassName,
  label: 'Executed',
  labelClassName: ProposalStatusMap.executed.textClassName,
}
Executed.parameters = Open.parameters
