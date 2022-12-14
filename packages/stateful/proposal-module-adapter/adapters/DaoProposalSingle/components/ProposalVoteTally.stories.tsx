import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProposalVoteTally } from './ProposalVoteTally'

export default {
  title:
    'DAO DAO / packages / stateful / proposal-module-adapter / adapters / DaoProposalSingle / components / ProposalVoteTally',
  component: ProposalVoteTally,
} as ComponentMeta<typeof ProposalVoteTally>

const Template: ComponentStory<typeof ProposalVoteTally> = (_args) => (
  <ProposalVoteTally />
)

export const Default = Template.bind({})
Default.args = {}
Default.parameters = {
  design: {
    type: 'figma',
    url: '',
  },
}
