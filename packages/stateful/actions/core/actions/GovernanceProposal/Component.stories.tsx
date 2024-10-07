import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CHAIN_ID, ReactHookFormDecorator } from '@dao-dao/storybook'
import { ActionContextType, GovProposalVersion } from '@dao-dao/types'
import { SoftwareUpgradeProposal } from '@dao-dao/types/protobuf/codegen/cosmos/upgrade/v1beta1/upgrade'
import { Any } from '@dao-dao/types/protobuf/codegen/google/protobuf/any'

import {
  GovProposalActionDisplay,
  SuspenseLoader,
} from '../../../../components'
import { AddressInput } from '../../../../components/AddressInput'
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
    chainId: CHAIN_ID,
    version: GovProposalVersion.V1_BETA_1,
    title: 'Upgrade to v10 Alpha 1',
    description:
      'Full details on the testnets github. Target binary is v10.0.0-alpha.2',
    metadata: '',
    deposit: [
      {
        amount: '100',
        denom: 'ujunox',
        decimals: 6,
      },
    ],
    legacy: {
      typeUrl: SoftwareUpgradeProposal.typeUrl,
      spends: [
        {
          amount: '1',
          denom: 'ujunox',
          decimals: 6,
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
      custom: '',
    },
    legacyContent: Any.fromPartial({}),
    msgs: [],
    expedited: false,
    useV1LegacyContent: false,
  },
  isCreating: true,
  errors: {},
  options: {
    minDeposits: { loading: false, errored: false, data: [] },
    communityPoolBalances: { loading: false, data: [] },
    encodeContext: {
      type: ActionContextType.Wallet,
    },
    TokenAmountDisplay,
    AddressInput,
    GovProposalActionDisplay,
    SuspenseLoader,
  },
}
