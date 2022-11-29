import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  ReactHookFormDecorator,
  makeActionsProviderDecorator,
} from '@dao-dao/storybook'
import { ActionOptionsContextType, ContractVersion } from '@dao-dao/types'
import { NATIVE_DENOM } from '@dao-dao/utils'

import { ProfileDisplay } from '../../../components'
import { InstantiateTokenSwap } from './InstantiateTokenSwap'

export default {
  title:
    'DAO DAO / packages / stateful / actions / components / InitiateTokenSwap / InstantiateTokenSwap',
  component: InstantiateTokenSwap,
  decorators: [
    ReactHookFormDecorator,
    makeActionsProviderDecorator({
      address: 'junoWalletAddress',
      chainId: 'juno-1',
      bech32Prefix: 'juno',
      context: {
        type: ActionOptionsContextType.Dao,
        coreVersion: ContractVersion.V0_2_0,
      },
    }),
  ],
} as ComponentMeta<typeof InstantiateTokenSwap>

const Template: ComponentStory<typeof InstantiateTokenSwap> = (args) => (
  <div className="max-w-xl">
    <InstantiateTokenSwap {...args} />
  </div>
)

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
    selfPartyNativeBalances: [
      {
        denom: NATIVE_DENOM,
        amount: '46252349169321',
      },
    ],
    selfPartyCw20Balances: [
      {
        address: 'cw20_1',
        balance: '1284135723893',
        info: {
          decimals: 6,
          name: 'A token',
          symbol: 'ATKN',
          total_supply: '10238192471284128',
        },
      },
      {
        address: 'cw20_2',
        balance: '102948124125',
        info: {
          decimals: 6,
          name: 'A different token',
          symbol: 'DIFF',
          total_supply: '6212378128495812',
        },
      },
    ],
    counterpartyNativeBalances: {
      loading: false,
      data: [
        {
          denom: NATIVE_DENOM,
          amount: '46252349169321',
        },
      ],
    },
    counterpartyCw20Balances: {
      loading: false,
      data: [
        {
          address: 'cw20_1',
          balance: '1284135723893',
          info: {
            decimals: 6,
            name: 'A token',
            symbol: 'ATKN',
            total_supply: '10238192471284128',
          },
        },
        {
          address: 'cw20_2',
          balance: '102948124125',
          info: {
            decimals: 6,
            name: 'A different token',
            symbol: 'DIFF',
            total_supply: '6212378128495812',
          },
        },
      ],
    },
    onInstantiate: async () => alert('instantiate'),
    instantiating: false,
    ProfileDisplay,
  },
}
