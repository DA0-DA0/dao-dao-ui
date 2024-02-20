import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AddressInput } from '@dao-dao/stateless'
import {
  CHAIN_ID,
  makeDaoInfo,
  makeDaoProvidersDecorator,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook'
import { AccountType, TokenType, VestingContractVersion } from '@dao-dao/types'

import { EntityDisplay } from '../../../../components'
import { BeginVesting } from './BeginVesting'

export default {
  title:
    'DAO DAO / packages / stateful / widgets / widgets / VestingPayments / actions / ManageVesting / BeginVesting',
  component: BeginVesting,
  decorators: [
    makeReactHookFormDecorator(),
    makeDaoProvidersDecorator(makeDaoInfo()),
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
  errors: {},
  options: {
    widgetData: {
      factory: 'factory',
      version: VestingContractVersion.V1,
    },
    tokens: [
      {
        token: {
          chainId: CHAIN_ID,
          type: TokenType.Native,
          denomOrAddress: 'ujuno',
          symbol: 'JUNO',
          decimals: 6,
          imageUrl: '/daodao.png',
          source: {
            chainId: CHAIN_ID,
            type: TokenType.Native,
            denomOrAddress: 'ujuno',
          },
        },
        balance: '1248281239056',
        owner: {
          type: AccountType.Native,
          chainId: CHAIN_ID,
          address: 'owner',
        },
      },
      {
        token: {
          chainId: CHAIN_ID,
          type: TokenType.Cw20,
          denomOrAddress: 'junoCw20Dao',
          symbol: 'DAO',
          decimals: 6,
          imageUrl: '/daodao.png',
          source: {
            chainId: CHAIN_ID,
            type: TokenType.Cw20,
            denomOrAddress: 'junoCw20Dao',
          },
        },
        balance: '19023827587124',
        owner: {
          type: AccountType.Native,
          chainId: CHAIN_ID,
          address: 'owner',
        },
      },
    ],
    preV1VestingFactoryOwner: {
      loading: false,
      errored: false,
      data: undefined,
    },
    AddressInput,
    EntityDisplay,
    createCw1WhitelistOwners: async () => {
      alert('createCw1WhitelistOwners')
      return ''
    },
    creatingCw1WhitelistOwners: false,
  },
}
