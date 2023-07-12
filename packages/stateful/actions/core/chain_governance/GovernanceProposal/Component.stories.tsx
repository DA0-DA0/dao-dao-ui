import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ReactHookFormDecorator } from '@dao-dao/storybook'
import { GovernanceProposalType } from '@dao-dao/types'

import { AddressInput } from '../../../../components/AddressInput'
import { PayEntityDisplay } from '../../../../components/PayEntityDisplay'
import { TokenAmountDisplay } from '../../../../components/TokenAmountDisplay'
import { GovernanceProposalComponent } from './Component'

export default {
  title:
    'DAO DAO / packages / stateful / actions / core / chain_governance / GovernanceProposal',
  component: GovernanceProposalComponent,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof GovernanceProposalComponent>

const Template: ComponentStory<typeof GovernanceProposalComponent> = (args) => (
  <GovernanceProposalComponent {...args} />
)

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  data: {
    type: GovernanceProposalType.SoftwareUpgradeProposal,
    title: 'Upgrade to v10 Alpha 1',
    description:
      'Full details on the testnets github. Target binary is v10.0.0-alpha.2',
    deposit: [
      {
        amount: 100,
        denom: 'ujunox',
      },
    ],
    spends: [
      {
        amount: 1,
        denom: 'ujunox',
      },
    ],
    spendRecipient: 'junoRecipient',
    parameterChanges: JSON.stringify([]),
    upgradePlan: JSON.stringify(
      {
        name: 'v10',
        time: '0001-01-01T00:00:00Z',
        height: '20000',
        info: '',
        upgraded_client_state: null,
      },
      null,
      2
    ),
  },
  isCreating: true,
  errors: {},
  options: {
    minDeposits: { loading: false, data: [] },
    PayEntityDisplay,
    TokenAmountDisplay,
    AddressInput,
  },
}
