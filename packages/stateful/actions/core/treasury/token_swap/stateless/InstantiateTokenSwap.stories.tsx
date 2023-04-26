import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AddressInput } from '@dao-dao/stateless'
import {
  makeDaoInfo,
  makeDaoProvidersDecorator,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook'
import { TokenType } from '@dao-dao/types'
import { CHAIN_ID, getNativeTokenForChainId } from '@dao-dao/utils'

import { Trans } from '../../../../../components/Trans'
import { PerformTokenSwapData } from '../types'
import { InstantiateTokenSwap } from './InstantiateTokenSwap'

export default {
  title:
    'DAO DAO / packages / stateful / actions / core / treasury / token_swap / InstantiateTokenSwap',
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
        ...getNativeTokenForChainId(CHAIN_ID),
        address: '',
        amount: 0,
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
