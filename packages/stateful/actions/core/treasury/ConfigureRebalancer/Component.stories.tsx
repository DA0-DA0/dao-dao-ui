import { ComponentMeta, ComponentStory } from '@storybook/react'

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
    'DAO DAO / packages / stateful / actions / core / treasury / ConfigureRebalancer',
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
          },
          balance: '1284135723893',
        },
      ],
    },
    prices: {
      loading: false,
      data: [
        {
          denom: getNativeTokenForChainId(ChainId.NeutronMainnet)
            .denomOrAddress,
          amount: 0.1,
          timestamp: new Date(),
        },
        {
          denom: getNativeIbcUsdc(ChainId.NeutronMainnet)!.denomOrAddress,
          amount: 1,
          timestamp: new Date(),
        },
        {
          denom: 'uatom',
          amount: 6.5,
          timestamp: new Date(),
        },
      ],
    },
  },
  isCreating: true,
  errors: {},
}
