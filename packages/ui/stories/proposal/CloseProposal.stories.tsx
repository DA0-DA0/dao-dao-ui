import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CloseProposal } from 'components/proposal/CloseProposal'

export default {
  title: 'DAO DAO UI / proposal / CloseProposal',
  component: CloseProposal,
} as ComponentMeta<typeof CloseProposal>

const Template: ComponentStory<typeof CloseProposal> = (args) => (
  <CloseProposal {...args} />
)

export const Default = Template.bind({})
Default.args = {
  onClose: null, // TODO: Fill in default value.
  willRefundProposalDeposit: null, // TODO: Fill in default value.
  loading: null, // TODO: Fill in default value.
}
