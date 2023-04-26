import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ReactHookFormDecorator } from '@dao-dao/storybook'
import { TokenType } from '@dao-dao/types'
import { CHAIN_ID, getNativeTokenForChainId } from '@dao-dao/utils'

import { InstantiateComponent } from './Component'

export default {
  title:
    'DAO DAO / packages / stateful / actions / core / smart_contracting / Instantiate',
  component: InstantiateComponent,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof InstantiateComponent>

const Template: ComponentStory<typeof InstantiateComponent> = (args) => (
  <InstantiateComponent {...args} />
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
            type: TokenType.Native,
            denomOrAddress: 'uatom',
            decimals: 6,
            symbol: 'ATOM',
            imageUrl:
              'https://raw.githubusercontent.com/CosmosContracts/junoswap-asset-list/main/images/atom.png',
          },
          balance: '984129741',
        },
      ],
    },
  },
}
