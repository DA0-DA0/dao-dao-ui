import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useForm } from 'react-hook-form'

import { makeProps as makeTokenSwapStatusProps } from '@dao-dao/stateless/components/TokenSwapStatus.stories'
import {
  ReactHookFormDecorator,
  makeActionsProviderDecorator,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook'
import {
  ActionComponentProps,
  ActionOptionsContextType,
  ContractVersion,
} from '@dao-dao/types'
import { NATIVE_DENOM } from '@dao-dao/utils'

import { InitiateTokenSwapComponent } from './InitiateTokenSwap'
import {
  InitiateTokenSwapData,
  InitiateTokenSwapOptions,
  InstantiateFormData,
} from './types'

export default {
  title:
    'DAO DAO / packages / stateful / actions / components / InitiateTokenSwap',
  component: InitiateTokenSwapComponent,
} as ComponentMeta<typeof InitiateTokenSwapComponent>

const Template: ComponentStory<typeof InitiateTokenSwapComponent> = (args) => {
  const instantiateForm = useForm<InstantiateFormData>({
    defaultValues: args.options.contractInstantiated
      ? undefined
      : {
          selfParty: {
            // Default to first CW20 if present. Otherwise, native.
            denomOrAddress:
              args.options.selfCw20Balances.length > 0
                ? args.options.selfCw20Balances[0].address
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
      <InitiateTokenSwapComponent
        {...({
          ...args,
          options: args.options.contractInstantiated
            ? args.options
            : {
                ...args.options,
                instantiateForm,
              },
        } as ActionComponentProps<InitiateTokenSwapOptions>)}
      />
    </div>
  )
}

export const BeforeCreate = Template.bind({})
BeforeCreate.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  options: {
    contractInstantiated: false,
    selfNativeBalances: [
      {
        denom: NATIVE_DENOM,
        amount: '46252349169321',
      },
    ],
    selfCw20Balances: [
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
  },
  isCreating: true,
  onRemove: () => alert('remove'),
  errors: {},
}
BeforeCreate.parameters = {
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
}

export const AfterCreate = Template.bind({})
AfterCreate.args = {
  ...BeforeCreate.args!,
  options: {
    contractInstantiated: true,
    tokenSwapStatusProps: makeTokenSwapStatusProps(),
  },
}
AfterCreate.parameters = {
  decorators: [
    makeReactHookFormDecorator<InitiateTokenSwapData>({
      tokenSwapContractAddress: 'junoTokenSwapContract',
    }),
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
}
