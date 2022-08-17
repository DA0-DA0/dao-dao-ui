import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProposalLine } from 'components/proposal/ProposalLine'

export default {
  title: 'DAO DAO UI / proposal / ProposalLine',
  component: ProposalLine,
} as ComponentMeta<typeof ProposalLine>

const Template: ComponentStory<typeof ProposalLine> = (args) => <ProposalLine {...args} />

export const Default = Template.bind({})
Default.args = {
  "coreAddress": null, // TODO: Fill in default value.
  "proposalModules": null, // TODO: Fill in default value.
  "proposalId": null, // TODO: Fill in default value.
  "proposalViewUrl": null // TODO: Fill in default value.
}
