import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AddressInput } from '@dao-dao/stateless'
import { CHAIN_ID } from '@dao-dao/storybook'
import {
  makeDaoInfo,
  makeDaoProvidersDecorator,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook/decorators'
import { AccountType, TokenType } from '@dao-dao/types'
import { getNativeTokenForChainId } from '@dao-dao/utils'

import { SpendComponent, SpendData } from './Component'

export default {
  title: 'DAO DAO / packages / stateful / actions / core / treasury / Spend',
  component: SpendComponent,
  decorators: [
    makeReactHookFormDecorator<SpendData>({
      fromChainId: CHAIN_ID,
      toChainId: CHAIN_ID,
      from: '',
      to: '',
      amount: '1',
      cw20: false,
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
    token: {
      loading: true,
      errored: false,
    },
    tokens: {
      loading: false,
      data: [
        {
          owner: {
            type: AccountType.Base,
            chainId: CHAIN_ID,
            address: 'first',
          },
          token: getNativeTokenForChainId(CHAIN_ID),
          balance: '46252349169321',
        },
        {
          owner: {
            type: AccountType.Base,
            chainId: CHAIN_ID,
            address: 'first',
          },
          token: {
            chainId: CHAIN_ID,
            type: TokenType.Cw20,
            denomOrAddress: 'cw20_1',
            decimals: 6,
            symbol: 'ATKN',
            imageUrl: '',
            source: {
              chainId: CHAIN_ID,
              type: TokenType.Cw20,
              denomOrAddress: 'cw20_1',
            },
          },
          balance: '1284135723893',
        },
        {
          owner: {
            type: AccountType.Base,
            chainId: CHAIN_ID,
            address: 'second',
          },
          token: {
            chainId: CHAIN_ID,
            type: TokenType.Cw20,
            denomOrAddress: 'cw20_2',
            decimals: 6,
            symbol: 'DIFF',
            imageUrl: '',
            source: {
              chainId: CHAIN_ID,
              type: TokenType.Cw20,
              denomOrAddress: 'cw20_2',
            },
          },
          balance: '102948124125',
        },
      ],
    },
    currentEntity: undefined,
    ibcPath: { loading: true, errored: false },
    ibcAmountOut: { loading: true, errored: false },
    betterNonPfmIbcPath: { loading: true },
    missingAccountChainIds: [],
    nobleTariff: { loading: false, errored: false, data: null },
    neutronTransferFee: { loading: false, errored: false, data: undefined },
    proposalModuleMaxVotingPeriodInBlocks: false,
    AddressInput,
  },
  isCreating: true,
  errors: {},
}
