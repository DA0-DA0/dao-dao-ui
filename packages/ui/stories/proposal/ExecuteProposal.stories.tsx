import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ExecuteProposal } from 'components/proposal/ExecuteProposal'

export default {
  title: 'DAO DAO UI / proposal / ExecuteProposal',
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
