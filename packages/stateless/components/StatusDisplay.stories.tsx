import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProposalStatusMap } from '@dao-dao/proposal-module-adapter/adapters/CwdProposalSingle/components/ProposalLine/ProposalStatus'

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
  icon: (
    <ProposalStatusMap.open.Icon
      className={`!h-5 !w-5 ${ProposalStatusMap.open.iconClassName}`}
    />
  ),
  label: <p className={ProposalStatusMap.open.textClassName}>Open</p>,
}
Open.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=312%3A28023',
  },
}

export const Passed = Template.bind({})
Passed.args = {
  icon: (
    <ProposalStatusMap.passed.Icon
      className={`!h-5 !w-5 ${ProposalStatusMap.passed.iconClassName}`}
    />
  ),
  label: <p className={ProposalStatusMap.passed.textClassName}>Passed</p>,
}
Passed.parameters = Open.parameters

export const Rejected = Template.bind({})
Rejected.args = {
  icon: (
    <ProposalStatusMap.rejected.Icon
      className={`!h-5 !w-5 ${ProposalStatusMap.rejected.iconClassName}`}
    />
  ),
  label: <p className={ProposalStatusMap.rejected.textClassName}>Rejected</p>,
}
Rejected.parameters = Open.parameters

export const Executed = Template.bind({})
Executed.args = {
  icon: (
    <ProposalStatusMap.executed.Icon
      className={`!h-5 !w-5 ${ProposalStatusMap.executed.iconClassName}`}
    />
  ),
  label: <p className={ProposalStatusMap.executed.textClassName}>Executed</p>,
}
Executed.parameters = Open.parameters
