import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ExecuteProposal } from 'components/proposal/ExecuteProposal'

export default {
  title: 'DAO DAO UI / proposal / ExecuteProposal',
  component: ExecuteProposal,
} as ComponentMeta<typeof ExecuteProposal>

const Template: ComponentStory<typeof ExecuteProposal> = (args) => <ExecuteProposal {...args} />

export const Default = Template.bind({})
Default.args = {
  "onExecute": null, // TODO: Fill in default value.
  "messages": null, // TODO: Fill in default value.
  "loading": null // TODO: Fill in default value.
}
