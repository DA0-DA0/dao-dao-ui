import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CHAIN_ID, ReactHookFormDecorator } from '@dao-dao/storybook'
import { TokenType } from '@dao-dao/types'
import { getFallbackImage, getNativeTokenForChainId } from '@dao-dao/utils'

import { ExecuteComponent } from './Component'

export default {
  title:
    'DAO DAO / packages / stateful / actions / core / smart_contracting / Execute',
  component: ExecuteComponent,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof ExecuteComponent>

const Template: ComponentStory<typeof ExecuteComponent> = (args) => (
  <ExecuteComponent {...args} />
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
    balances: {
      loading: false,
      data: [
        {
          token: getNativeTokenForChainId(CHAIN_ID),
          balance: '1231245124',
        },
        {
          token: {
            chainId: CHAIN_ID,
            type: TokenType.Native,
            denomOrAddress: 'uatom',
            decimals: 6,
            symbol: 'ATOM',
            imageUrl:
              'https://raw.githubusercontent.com/CosmosContracts/junoswap-asset-list/main/images/atom.png',
            source: {
              chainId: CHAIN_ID,
              type: TokenType.Native,
              denomOrAddress: 'uatom',
            },
          },
          balance: '984129741',
        },
        {
          token: {
            chainId: CHAIN_ID,
            type: TokenType.Cw20,
            denomOrAddress: 'junoCw20DaoAddress',
            decimals: 6,
            symbol: 'DAO',
            imageUrl: '/daodao.png',
            source: {
              chainId: CHAIN_ID,
              type: TokenType.Cw20,
              denomOrAddress: 'junoCw20DaoAddress',
            },
          },
          balance: '87345102989851',
        },
        {
          token: {
            chainId: CHAIN_ID,
            type: TokenType.Cw20,
            denomOrAddress: 'junoAnotherCw20',
            decimals: 6,
            symbol: 'SOME-CW20',
            imageUrl: getFallbackImage(),
            source: {
              chainId: CHAIN_ID,
              type: TokenType.Cw20,
              denomOrAddress: 'junoAnotherCw20',
            },
          },
          balance: '87345102989851',
        },
      ],
    },
  },
}
