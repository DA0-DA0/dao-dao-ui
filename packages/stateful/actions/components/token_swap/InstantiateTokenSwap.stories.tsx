import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AddressInput } from '@dao-dao/stateless'
import {
  makeActionsProviderDecorator,
  makeDaoInfo,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook'
import { ActionOptionsContextType, TokenType } from '@dao-dao/types'
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
        type: TokenType.Cw20,
        denomOrAddress: 'cw20_1',
        amount: 0,
        decimals: 6,
      },
      counterparty: {
        address: '',
        type: TokenType.Native,
        denomOrAddress: NATIVE_DENOM,
        amount: 0,
        decimals: 6,
      },
    }),
    makeActionsProviderDecorator({
      address: 'junoWalletAddress',
      chainId: 'juno-1',
      bech32Prefix: 'juno',
      context: {
        type: ActionOptionsContextType.Dao,
        info: makeDaoInfo(),
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
