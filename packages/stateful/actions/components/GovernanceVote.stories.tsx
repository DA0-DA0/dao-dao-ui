import { ComponentMeta, ComponentStory } from '@storybook/react'
import { cosmos } from 'interchain-rpc'
import { Proposal } from 'interchain-rpc/types/codegen/cosmos/gov/v1beta1/gov'
import Long from 'long'

import { ReactHookFormDecorator } from '@dao-dao/storybook'

import { GovernanceVoteComponent } from './GovernanceVote'

export default {
  title:
    'DAO DAO / packages / stateful / actions / components / GovernanceVote',
  component: GovernanceVoteComponent,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof GovernanceVoteComponent>

const Template: ComponentStory<typeof GovernanceVoteComponent> = (args) => (
  <GovernanceVoteComponent {...args} />
)

const { ProposalStatus } = cosmos.gov.v1beta1

const makeProposal = (): Proposal => ({
  proposalId: Long.fromInt(1),
  content: {
    '@type': '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal',
    title: 'Upgrade to v10 Alpha 1',
    description:
      'Full details on the testnets github. Target binary is v10.0.0-alpha.2',
    plan: {
      name: 'v10',
      time: '0001-01-01T00:00:00Z',
      height: '20000',
      info: '',
      upgraded_client_state: null,
    },
  } as any,
  status: ProposalStatus.PROPOSAL_STATUS_PASSED,
  finalTallyResult: {
    yes: '54076995000',
    abstain: '0',
    no: '0',
    noWithVeto: '0',
  },
  submitTime: new Date('2022-09-23T22:56:17.961690524Z'),
  depositEndTime: new Date('2022-10-03T22:56:17.961690524Z'),
  totalDeposit: [
    {
      denom: 'ujunox',
      amount: '500000000',
    },
  ],
  votingStartTime: new Date('2022-09-23T22:56:17.961690524Z'),
  votingEndTime: new Date('2022-09-24T10:56:17.961690524Z'),
})

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  data: {},
  isCreating: true,
  onRemove: () => alert('remove'),
  errors: {},
  options: {
    proposals: [makeProposal(), makeProposal(), makeProposal(), makeProposal()],
    canVoteAsValidator: true,
  },
}
