import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ReactHookFormDecorator } from '@dao-dao/storybook'
import { TokenType } from '@dao-dao/types'
import { NATIVE_DENOM, getFallbackImage } from '@dao-dao/utils'

import { ExecuteComponent } from './Execute'

export default {
  title: 'DAO DAO / packages / stateful / actions / components / Execute',
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
  onRemove: () => alert('remove'),
  errors: {},
  options: {
    balances: {
      loading: false,
      data: [
        {
          token: {
            type: TokenType.Native,
            denomOrAddress: NATIVE_DENOM,
            decimals: 6,
            symbol: 'JUNO',
            imageUrl: '/juno.png',
          },
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
        {
          token: {
            type: TokenType.Cw20,
            denomOrAddress: 'junoCw20DaoAddress',
            decimals: 6,
            symbol: 'DAO',
            imageUrl: '/daodao.png',
          },
          balance: '87345102989851',
        },
        {
          token: {
            type: TokenType.Cw20,
            denomOrAddress: 'junoAnotherCw20',
            decimals: 6,
            symbol: 'SOME-CW20',
            imageUrl: getFallbackImage(),
          },
          balance: '87345102989851',
        },
      ],
    },
  },
}
