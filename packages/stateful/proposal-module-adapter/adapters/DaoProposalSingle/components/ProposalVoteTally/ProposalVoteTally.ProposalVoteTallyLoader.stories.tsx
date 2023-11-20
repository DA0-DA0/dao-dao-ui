import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProposalVoteTallyLoader } from './ProposalVoteTally'

export default {
  title:
    'DAO DAO / packages / stateful / proposal-module-adapter / adapters / DaoProposalSingle / components / ProposalVoteTallyLoader',
  component: ProposalVoteTallyLoader,
} as ComponentMeta<typeof ProposalVoteTallyLoader>

const Template: ComponentStory<typeof ProposalVoteTallyLoader> = (args) => (
  <ProposalVoteTallyLoader {...args} />
)

export const Default = Template.bind({})
Default.args = {
  isPreProposeApproverProposal: false,
}
