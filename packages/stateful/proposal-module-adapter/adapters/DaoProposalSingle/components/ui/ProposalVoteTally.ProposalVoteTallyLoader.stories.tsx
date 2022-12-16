import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProposalVoteTallyLoader } from './ProposalVoteTally'

export default {
  title:
    'DAO DAO / packages / stateful / proposal-module-adapter / adapters / DaoProposalSingle / components / ui / ProposalVoteTallyLoader',
  component: ProposalVoteTallyLoader,
} as ComponentMeta<typeof ProposalVoteTallyLoader>

const Template: ComponentStory<typeof ProposalVoteTallyLoader> = (_args) => (
  <ProposalVoteTallyLoader />
)

export const Default = Template.bind({})
Default.args = {}
