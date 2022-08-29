/* eslint-disable i18next/no-literal-string */
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProposalStatusMap } from '@dao-dao/proposal-module-adapter/adapters/cw-proposal-single/components/ProposalStatus'

import { ProposalStatus } from 'components/proposal/ProposalStatus'

export default {
  title: 'DAO DAO UI V2 / components / proposal / ProposalStatus',
  component: ProposalStatus,
} as ComponentMeta<typeof ProposalStatus>

const Template: ComponentStory<typeof ProposalStatus> = (args) => (
  <ProposalStatus {...args} />
)

export const Open = Template.bind({})
Open.args = {
  icon: (
    <ProposalStatusMap.open.Icon
      className={`w-5 h-5 ${ProposalStatusMap.open.iconClassName}`}
    />
  ),
  label: (
    <p className={`w-[8ch] ${ProposalStatusMap.open.textClassName}`}>Open</p>
  ),
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
      className={`w-5 h-5 ${ProposalStatusMap.passed.iconClassName}`}
    />
  ),
  label: <p className={ProposalStatusMap.passed.textClassName}>Passed</p>,
}
Passed.parameters = Open.parameters

export const Rejected = Template.bind({})
Rejected.args = {
  icon: (
    <ProposalStatusMap.rejected.Icon
      className={`w-5 h-5 ${ProposalStatusMap.rejected.iconClassName}`}
    />
  ),
  label: <p className={ProposalStatusMap.rejected.textClassName}>Rejected</p>,
}
Rejected.parameters = Open.parameters
