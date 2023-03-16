import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AddressInput } from '@dao-dao/stateless'
import {
  makeDaoInfo,
  makeDaoProvidersDecorator,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook'
import { TokenType } from '@dao-dao/types'
import { NATIVE_TOKEN } from '@dao-dao/utils'

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
        type: TokenType.Cw20,
        denomOrAddress: 'cw20_1',
        amount: 0,
        decimals: 6,
      },
      counterparty: {
        address: '',
        type: NATIVE_TOKEN.type,
        denomOrAddress: NATIVE_TOKEN.denomOrAddress,
        amount: 0,
        decimals: NATIVE_TOKEN.decimals,
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
    selfPartyTokenBalances: [
      {
        token: {
          type: TokenType.Native,
          denomOrAddress: 'ujuno',
          decimals: 6,
          symbol: 'JUNO',
          imageUrl: '',
        },
        balance: '46252349169321',
      },
      {
        token: {
          type: TokenType.Cw20,
          denomOrAddress: 'cw20_1',
          decimals: 6,
          symbol: 'ATKN',
          imageUrl: '',
        },
        balance: '1284135723893',
      },
      {
        token: {
          type: TokenType.Cw20,
          denomOrAddress: 'cw20_2',
          decimals: 6,
          symbol: 'DIFF',
          imageUrl: '',
        },
        balance: '102948124125',
      },
    ],
    counterpartyTokenBalances: {
      loading: false,
      data: [
        {
          token: {
            type: TokenType.Native,
            denomOrAddress: 'ujuno',
            decimals: 6,
            symbol: 'JUNO',
            imageUrl: '',
          },
          balance: '46252349169321',
        },
        {
          token: {
            type: TokenType.Cw20,
            denomOrAddress: 'cw20_1',
            decimals: 6,
            symbol: 'ATKN',
            imageUrl: '',
          },
          balance: '1284135723893',
        },
        {
          token: {
            type: TokenType.Cw20,
            denomOrAddress: 'cw20_2',
            decimals: 6,
            symbol: 'DIFF',
            imageUrl: '',
          },
          balance: '102948124125',
        },
      ],
    },
    onInstantiate: async () => alert('instantiate'),
    instantiating: false,
    AddressInput,
    Trans,
  },
}
