import { ComponentMeta, ComponentStory } from '@storybook/react'

import { PinnedProposalLine } from 'components/proposal/PinnedProposalLine'

export default {
  title: 'DAO DAO UI / proposal / PinnedProposalLine',
  component: PinnedProposalLine,
} as ComponentMeta<typeof PinnedProposalLine>

const Template: ComponentStory<typeof PinnedProposalLine> = (args) => <PinnedProposalLine {...args} />

export const Default = Template.bind({})
Default.args = {
  "coreAddress": null, // TODO: Fill in default value.
  "proposalModules": null, // TODO: Fill in default value.
  "proposalId": null, // TODO: Fill in default value.
  "proposalViewUrl": null, // TODO: Fill in default value.
  "markDone": null // TODO: Fill in default value.
}
