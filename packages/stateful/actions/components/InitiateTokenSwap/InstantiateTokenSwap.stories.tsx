import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useForm } from 'react-hook-form'

import {
  ReactHookFormDecorator,
  makeActionsProviderDecorator,
} from '@dao-dao/storybook'
import { ActionOptionsContextType, ContractVersion } from '@dao-dao/types'
import { NATIVE_DENOM } from '@dao-dao/utils'

import { InstantiateTokenSwap } from './InstantiateTokenSwap'
import { InstantiateFormData } from './types'

export default {
  title:
    'DAO DAO / packages / stateful / actions / components / InitiateTokenSwap / InstantiateTokenSwap',
  component: InstantiateTokenSwap,
  decorators: [
    ReactHookFormDecorator,
    makeActionsProviderDecorator({
      address: 'junoWalletAddress',
      chainId: 'juno-1',
      bech32Prefix: 'juno',
      context: {
        type: ActionOptionsContextType.Dao,
        coreVersion: ContractVersion.V0_2_0,
      },
    }),
  ],
} as ComponentMeta<typeof InstantiateTokenSwap>

const Template: ComponentStory<typeof InstantiateTokenSwap> = (args) => {
  const instantiateForm = useForm<InstantiateFormData>({
    defaultValues: {
      selfParty: {
        // Default to first CW20 if present. Otherwise, native.
        denomOrAddress:
          args.selfPartyCw20Balances.length > 0
            ? args.selfPartyCw20Balances[0].address
            : NATIVE_DENOM,
        amount: 0,
      },
      counterparty: {
        address: '',
        denomOrAddress: NATIVE_DENOM,
        amount: 0,
      },
    },
  })

  return (
    <div className="max-w-xl">
      <InstantiateTokenSwap {...args} instantiateForm={instantiateForm} />
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  selfPartyNativeBalances: [
    {
      denom: NATIVE_DENOM,
      amount: '46252349169321',
    },
  ],
  selfPartyCw20Balances: [
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
  counterpartyNativeBalances: {
    loading: false,
    data: [
      {
        denom: NATIVE_DENOM,
        amount: '46252349169321',
      },
    ],
  },
  counterpartyCw20Balances: {
    loading: false,
    data: [
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
  onInstantiate: async (data) => alert(JSON.stringify(data, null, 2)),
  // hook executed in Template above.
  instantiateForm: undefined as any,
  instantiating: false,
}
