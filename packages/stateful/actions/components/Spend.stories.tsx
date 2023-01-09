import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  makeActionsProviderDecorator,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook/decorators'
import { ActionOptionsContextType, ContractVersion } from '@dao-dao/types'
import { NATIVE_DENOM } from '@dao-dao/utils'

import { ProfileDisplay } from '../../components'
import { SpendComponent, SpendData } from './Spend'

export default {
  title: 'DAO DAO / packages / stateful / actions / components / Spend',
  component: SpendComponent,
  decorators: [
    makeReactHookFormDecorator<SpendData>({
      to: '',
      amount: 1,
      denom: NATIVE_DENOM,
    }),
    makeActionsProviderDecorator({
      address: 'junoWalletAddress',
      chainId: 'juno-1',
      bech32Prefix: 'juno',
      context: {
        type: ActionOptionsContextType.Dao,
        coreVersion: ContractVersion.V2Alpha,
      },
    }),
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
    nativeBalances: [
      {
        denom: NATIVE_DENOM,
        amount: '46252349169321',
      },
    ],
    ProfileDisplay: ProfileDisplay,
    cw20Balances: [
      {
        address: 'cw20_1',
        balance: '1284135723893',
        info: {
          decimals: 6,
          name: 'A token',
          symbol: 'ATKN',
          total_supply: '10238192471284128',
        },
      },
      {
        address: 'cw20_2',
        balance: '102948124125',
        info: {
          decimals: 6,
          name: 'A different token',
          symbol: 'DIFF',
          total_supply: '6212378128495812',
        },
      },
    ],
  },
  isCreating: true,
  onRemove: () => alert('remove'),
  errors: {},
}
