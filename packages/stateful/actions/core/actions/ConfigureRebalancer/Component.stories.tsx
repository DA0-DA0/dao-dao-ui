import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AddressInput } from '@dao-dao/stateless'
import {
  makeDaoInfo,
  makeDaoProvidersDecorator,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook/decorators'
import { ChainId, TokenType } from '@dao-dao/types'
import { getNativeIbcUsdc, getNativeTokenForChainId } from '@dao-dao/utils'

import { Trans } from '../../../../components'
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
      newValenceAccount: {
        creating: true,
        funds: [],
      },
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
    serviceFee: {
      loading: false,
      errored: false,
      data: null,
    },
    currentValenceBalances: {
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
    denomWhitelistTokens: {
      loading: false,
      data: [
        getNativeTokenForChainId(ChainId.NeutronMainnet),
        {
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
        {
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
      ],
    },
    baseDenomWhitelistTokens: {
      loading: false,
      data: [
        getNativeTokenForChainId(ChainId.NeutronMainnet),
        {
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
        {
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
      ],
    },
    prices: {
      loading: false,
      errored: false,
      data: [
        {
          token: getNativeTokenForChainId(ChainId.NeutronMainnet),
          usdPrice: 1.5,
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
          usdPrice: 1,
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
          usdPrice: 12,
        },
      ],
    },
    minBalanceToken: undefined,
    AddressInput,
    Trans,
  },
  isCreating: true,
  errors: {},
}
