import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CHAIN_ID, ReactHookFormDecorator } from '@dao-dao/storybook'
import { TokenType } from '@dao-dao/types'
import { getNativeTokenForChainId } from '@dao-dao/utils'

import { Instantiate2Component } from './Component'

export default {
  title:
    'DAO DAO / packages / stateful / actions / core / smart_contracting / Instantiate2',
  component: Instantiate2Component,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof Instantiate2Component>

const Template: ComponentStory<typeof Instantiate2Component> = (args) => (
  <Instantiate2Component {...args} />
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
    nativeBalances: {
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
      ],
    },
    instantiatedAddress: '',
  },
}
