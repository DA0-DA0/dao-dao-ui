import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ExecuteProposal } from './ExecuteProposal'

export default {
  title: '(OLD DAO DAO) / components / proposal / ExecuteProposal',
  component: ExecuteProposal,
} as ComponentMeta<typeof ExecuteProposal>

const Template: ComponentStory<typeof ExecuteProposal> = (args) => (
  <ExecuteProposal {...args} />
)

export const Default = Template.bind({})
Default.args = {
  messages: 2,
  loading: false,
}
