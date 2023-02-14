import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AddressInput } from '@dao-dao/stateless'
import {
  makeDaoInfo,
  makeDaoProvidersDecorator,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook'
import { NATIVE_DENOM } from '@dao-dao/utils'

import { Trans } from '../../../components'
import { InstantiateTokenSwap } from './InstantiateTokenSwap'
import { PerformTokenSwapData } from './types'

export default {
  title:
    'DAO DAO / packages / stateful / actions / components / token_swap / InstantiateTokenSwap',
  component: InstantiateTokenSwap,
  decorators: [
    makeReactHookFormDecorator<PerformTokenSwapData>({
      contractChosen: false,
      selfParty: {
        type: 'cw20',
        denomOrAddress: 'cw20_1',
        amount: 0,
        decimals: 6,
      },
      counterparty: {
        address: '',
        type: 'native',
        denomOrAddress: NATIVE_DENOM,
        amount: 0,
        decimals: 6,
      },
    }),
    makeDaoProvidersDecorator(makeDaoInfo()),
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
    AddressInput,
    Trans,
  },
}
