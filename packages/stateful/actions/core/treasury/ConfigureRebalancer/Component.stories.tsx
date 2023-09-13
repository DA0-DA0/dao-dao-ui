import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CHAIN_ID } from '@dao-dao/storybook'
import {
  makeDaoInfo,
  makeDaoProvidersDecorator,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook/decorators'
import { TokenType } from '@dao-dao/types'
import { getNativeTokenForChainId } from '@dao-dao/utils'

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
      chainId: CHAIN_ID,
      tokens: [
        {
          amount: 1,
          denom: getNativeTokenForChainId(CHAIN_ID).denomOrAddress,
        },
      ],
      pid: {
        kp: 1,
        ki: 1,
        kd: 1,
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
          token: getNativeTokenForChainId(CHAIN_ID),
          balance: '46252349169321',
        },
        {
          token: {
            chainId: CHAIN_ID,
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
            chainId: CHAIN_ID,
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
  },
  isCreating: true,
  errors: {},
}
