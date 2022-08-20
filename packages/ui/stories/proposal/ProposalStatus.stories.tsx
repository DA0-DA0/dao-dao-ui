import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProposalStatus } from 'components/proposal/ProposalStatus'

export default {
  title: 'DAO DAO UI V2 / proposal / ProposalStatus',
  component: ProposalStatus,
} as ComponentMeta<typeof ProposalStatus>

const Template: ComponentStory<typeof ProposalStatus> = (args) => (
  <ProposalStatus {...args} />
)

export const Default = Template.bind({})
Default.args = {}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=312%3A28023',
  },
}
