import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProposalStatus } from 'components/proposal/ProposalStatus'

export default {
  title: 'DAO DAO UI V2 / proposal / ProposalStatus',
  component: ProposalStatus,
} as ComponentMeta<typeof ProposalStatus>

const Template: ComponentStory<typeof ProposalStatus> = () => (
  <div className="flex flex-row gap-12 items-center">
    <ProposalStatus status="open" />
    <ProposalStatus status="rejected" />
    <ProposalStatus status="approved" />
  </div>
)

export const Default = Template.bind({})

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=312%3A28023',
  },
}
