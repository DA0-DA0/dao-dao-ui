import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AddressInput } from '@dao-dao/stateless'
import { CHAIN_ID } from '@dao-dao/storybook'
import {
  makeDaoInfo,
  makeDaoProvidersDecorator,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook/decorators'
import { TokenType } from '@dao-dao/types'
import { getNativeTokenForChainId } from '@dao-dao/utils'

import { SpendComponent, SpendData } from './Component'

export default {
  title: 'DAO DAO / packages / stateful / actions / core / treasury / Spend',
  component: SpendComponent,
  decorators: [
    makeReactHookFormDecorator<SpendData>({
      chainId: CHAIN_ID,
      toChainId: CHAIN_ID,
      to: '',
      amount: 1,
      denom: getNativeTokenForChainId(CHAIN_ID).denomOrAddress,
    }),
    makeDaoProvidersDecorator(makeDaoInfo()),
  ],
} as ComponentMeta<typeof SpendComponent>

const Template: ComponentStory<typeof SpendComponent> = (args) => (
  <SpendComponent {...args} />
)

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  options: {
    tokens: {
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
    currentEntity: undefined,
    AddressInput,
  },
  isCreating: true,
  errors: {},
}
