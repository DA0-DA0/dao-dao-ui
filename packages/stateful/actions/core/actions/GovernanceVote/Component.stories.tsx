import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ReactHookFormDecorator } from '@dao-dao/storybook'

import { GovProposalActionDisplay } from '../../../../components'
import { TokenAmountDisplay } from '../../../../components/TokenAmountDisplay'
import { makeProposal } from '../GovernanceDeposit/Component.stories'
import { GovernanceVoteComponent } from './Component'

export default {
  title:
    'DAO DAO / packages / stateful / actions / core / chain_governance / GovernanceVote',
  component: GovernanceVoteComponent,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof GovernanceVoteComponent>

const Template: ComponentStory<typeof GovernanceVoteComponent> = (args) => (
  <GovernanceVoteComponent {...args} />
)

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  data: {},
  isCreating: true,
  errors: {},
  options: {
    proposals: [makeProposal(), makeProposal(), makeProposal(), makeProposal()],
    TokenAmountDisplay,
    GovProposalActionDisplay,
  },
}
