import { Check, Close as CloseIcon, Texture } from '@mui/icons-material'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Vote as VoteType } from '@dao-dao/types/contracts/DaoProposalSingle.common'

import { ProposalVoter } from './ProposalVoter'

export default {
  title:
    'DAO DAO / packages / stateless / components / proposal / ProposalVoter',
  component: ProposalVoter,
} as ComponentMeta<typeof ProposalVoter>

const Template: ComponentStory<typeof ProposalVoter<VoteType>> = (args) => (
  <div className="max-w-sm">
    <ProposalVoter {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  loading: false,
  currentVote: 'yes',
  onCastVote: (vote) => alert('vote: ' + vote),
  options: [
    { Icon: Check, label: 'Yes', value: 'yes' },
    { Icon: CloseIcon, label: 'No', value: 'no' },
    { Icon: Texture, label: 'Abstain', value: 'abstain' },
  ],
  proposalOpen: true,
}
