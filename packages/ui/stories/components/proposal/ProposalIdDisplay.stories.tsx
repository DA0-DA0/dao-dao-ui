import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProposalIdDisplay } from 'components/proposal/ProposalIdDisplay'

export default {
  title: 'DAO DAO UI / components / proposal / ProposalIdDisplay',
  component: ProposalIdDisplay,
} as ComponentMeta<typeof ProposalIdDisplay>

const Template: ComponentStory<typeof ProposalIdDisplay> = (args) => (
  <ProposalIdDisplay {...args} />
)

export const Default = Template.bind({})
Default.args = {
  proposalPrefix: 'A',
  proposalNumber: 7,
}
