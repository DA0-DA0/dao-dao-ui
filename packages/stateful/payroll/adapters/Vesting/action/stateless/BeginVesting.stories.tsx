import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AddressInput } from '@dao-dao/stateless'
import {
  makeActionsProviderDecorator,
  makeDaoInfo,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook'
import { ActionOptionsContextType, TokenType } from '@dao-dao/types'

import { BeginVesting } from './BeginVesting'

export default {
  title:
    'DAO DAO / packages / stateful / payroll / adapters / Vesting / action / BeginVesting',
  component: BeginVesting,
  decorators: [
    makeReactHookFormDecorator(),
    makeActionsProviderDecorator({
      address: 'junoWalletAddress',
      chainId: 'juno-1',
      bech32Prefix: 'juno',
      context: {
        type: ActionOptionsContextType.Dao,
        info: makeDaoInfo(),
      },
    }),
  ],
} as ComponentMeta<typeof BeginVesting>

const Template: ComponentStory<typeof BeginVesting> = (args) => (
  <div className="max-w-xl">
    <BeginVesting {...args} />
  </div>
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
    tokens: [
      {
        token: {
          type: TokenType.Native,
          denomOrAddress: 'ujuno',
          symbol: 'JUNO',
          decimals: 6,
          imageUrl: '/juno.png',
        },
        balance: '1248281239056',
      },
      {
        token: {
          type: TokenType.Cw20,
          denomOrAddress: 'junoCw20Dao',
          symbol: 'DAO',
          decimals: 6,
          imageUrl: '/daodao.png',
        },
        balance: '19023827587124',
      },
    ],
    vestingFactoryOwner: { loading: false, data: undefined },
    AddressInput,
  },
}
