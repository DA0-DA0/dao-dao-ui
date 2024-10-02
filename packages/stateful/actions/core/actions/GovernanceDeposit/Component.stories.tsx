import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CHAIN_ID, ReactHookFormDecorator } from '@dao-dao/storybook'
import {
  GovProposalVersion,
  GovProposalWithDecodedContent,
} from '@dao-dao/types'
import { ProposalStatus } from '@dao-dao/types/protobuf/codegen/cosmos/gov/v1beta1/gov'
import { SoftwareUpgradeProposal } from '@dao-dao/types/protobuf/codegen/cosmos/upgrade/v1beta1/upgrade'

import { GovProposalActionDisplay } from '../../../../components'
import { TokenAmountDisplay } from '../../../../components/TokenAmountDisplay'
import { GovernanceDepositComponent } from './Component'

export default {
  title:
    'DAO DAO / packages / stateful / actions / core / chain_governance / GovernanceDeposit',
  component: GovernanceDepositComponent,
  decorators: [ReactHookFormDecorator],
  excludeStories: ['makeProposal'],
} as ComponentMeta<typeof GovernanceDepositComponent>

const Template: ComponentStory<typeof GovernanceDepositComponent> = (args) => (
  <GovernanceDepositComponent {...args} />
)

export const makeProposal = (): GovProposalWithDecodedContent => ({
  chainId: CHAIN_ID,
  version: GovProposalVersion.V1_BETA_1,
  id: 1n,
  title: 'Upgrade to v10 Alpha 1',
  description:
    'Full details on the testnets github. Target binary is v10.0.0-alpha.2',
  proposal: {
    proposalId: 1n,
    content: {} as any,
    status: ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD,
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
  },
  decodedContent: {
    '@type': SoftwareUpgradeProposal.typeUrl,
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
})

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  data: {
    chainId: CHAIN_ID,
    proposalId: '',
    deposit: [
      {
        denom: 'JUNOX',
        amount: '1',
      },
    ],
  },
  isCreating: true,
  errors: {},
  options: {
    proposals: [makeProposal(), makeProposal(), makeProposal(), makeProposal()],
    depositTokens: { loading: false, errored: false, data: [] },
    TokenAmountDisplay,
    GovProposalActionDisplay,
  },
}
