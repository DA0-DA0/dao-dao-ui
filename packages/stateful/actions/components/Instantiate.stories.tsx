import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ReactHookFormDecorator } from '@dao-dao/storybook'
import { TokenType } from '@dao-dao/types'
import { NATIVE_TOKEN } from '@dao-dao/utils'

import { InstantiateComponent } from './Instantiate'

export default {
  title: 'DAO DAO / packages / stateful / actions / components / Instantiate',
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
  onRemove: () => alert('remove'),
  errors: {},
  options: {
    nativeBalances: {
      loading: false,
      data: [
        {
          token: NATIVE_TOKEN,
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
