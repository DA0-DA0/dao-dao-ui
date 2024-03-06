import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AddressInput } from '@dao-dao/stateless'
import {
  makeDaoInfo,
  makeDaoProvidersDecorator,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook/decorators'
import { ChainId, TokenType } from '@dao-dao/types'
import { getNativeIbcUsdc, getNativeTokenForChainId } from '@dao-dao/utils'

import {
  ConfigureRebalancerComponent,
  ConfigureRebalancerData,
} from './Component'

export default {
  title:
    'DAO DAO / packages / stateful / actions / core / valence / ConfigureRebalancer',
  component: ConfigureRebalancerComponent,
  decorators: [
    makeReactHookFormDecorator<ConfigureRebalancerData>({
      chainId: ChainId.NeutronMainnet,
      baseDenom: getNativeIbcUsdc(ChainId.NeutronMainnet)!.denomOrAddress,
      tokens: [
        {
          percent: 50,
          denom: getNativeTokenForChainId(ChainId.NeutronMainnet)
            .denomOrAddress,
        },
        {
          percent: 50,
          denom: getNativeIbcUsdc(ChainId.NeutronMainnet)!.denomOrAddress,
        },
      ],
      pid: {
        kp: 0.5,
        ki: 0.2,
        kd: 0.1,
      },
      maxLimit: 500,
      targetOverrideStrategy: 'proportional',
    }),
    makeDaoProvidersDecorator(makeDaoInfo()),
  ],
} as ComponentMeta<typeof ConfigureRebalancerComponent>

const Template: ComponentStory<typeof ConfigureRebalancerComponent> = (
  args
) => <ConfigureRebalancerComponent {...args} />

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  options: {
    nativeBalances: {
      loading: false,
      data: [
        {
          token: getNativeTokenForChainId(ChainId.NeutronMainnet),
          balance: '46252349169321',
        },
        {
          token: {
            chainId: ChainId.NeutronMainnet,
            type: TokenType.Native,
            denomOrAddress: getNativeIbcUsdc(ChainId.NeutronMainnet)!
              .denomOrAddress,
            decimals: 6,
            symbol: 'USDC',
            imageUrl: '',
            source: {
              chainId: ChainId.NeutronMainnet,
              type: TokenType.Native,
              denomOrAddress: getNativeIbcUsdc(ChainId.NeutronMainnet)!
                .denomOrAddress,
            },
          },
          balance: '102948124125',
        },
        {
          token: {
            chainId: ChainId.NeutronMainnet,
            type: TokenType.Native,
            denomOrAddress: 'uatom',
            decimals: 6,
            symbol: 'ATOM',
            imageUrl: '',
            source: {
              chainId: ChainId.NeutronMainnet,
              type: TokenType.Native,
              denomOrAddress: 'uatom',
            },
          },
          balance: '1284135723893',
        },
      ],
    },
    historicalPrices: {
      loading: false,
      data: [
        {
          denom: getNativeTokenForChainId(ChainId.NeutronMainnet)
            .denomOrAddress,
          // Random disturbance.
          prices: [...Array(50)].reduce(
            (acc) => [
              ...acc,
              {
                timestamp: new Date(
                  acc[acc.length - 1].timestamp.getTime() + 1000
                ),
                amount:
                  acc[acc.length - 1].amount *
                  (1 + (Math.random() - 0.5) * 0.5),
              },
            ],
            [
              {
                timestamp: new Date(new Date().getTime() - 50 * 1000),
                amount: 0.4,
              },
            ]
          ),
        },
        {
          denom: getNativeIbcUsdc(ChainId.NeutronMainnet)!.denomOrAddress,
          // Constant.
          prices: [...Array(50)].reduce(
            (acc) => [
              ...acc,
              {
                timestamp: new Date(
                  acc[acc.length - 1].timestamp.getTime() + 1000
                ),
                amount: 1,
              },
            ],
            [
              {
                timestamp: new Date(new Date().getTime() - 50 * 1000),
                amount: 1,
              },
            ]
          ),
        },
        {
          denom: 'uatom',
          // Random disturbance.
          prices: [...Array(50)].reduce(
            (acc) => [
              ...acc,
              {
                timestamp: new Date(
                  acc[acc.length - 1].timestamp.getTime() + 1000
                ),
                amount:
                  acc[acc.length - 1].amount *
                  (1 + (Math.random() - 0.5) * 0.5),
              },
            ],
            [
              {
                timestamp: new Date(new Date().getTime() - 50 * 1000),
                amount: 6.5,
              },
            ]
          ),
        },
      ],
    },
    minBalanceToken: undefined,
    AddressInput,
  },
  isCreating: true,
  errors: {},
}
