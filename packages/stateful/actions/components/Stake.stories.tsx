import { ComponentMeta, ComponentStory } from '@storybook/react'
import { FormProvider, useForm } from 'react-hook-form'

import { ReactHookFormDecorator } from '@dao-dao/storybook/decorators'
import { NATIVE_DENOM, StakeType } from '@dao-dao/utils'

import { StakeComponent, StakeData } from './Stake'

export default {
  title: 'DAO DAO / packages / actions / components / Stake',
  component: StakeComponent,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof StakeComponent>

const Template: ComponentStory<typeof StakeComponent> = (args) => (
  <FormProvider
    {...useForm<StakeData>({
      defaultValues: {
        stakeType: StakeType.Delegate,
        validator: '',
        toValidator: '',
        amount: 1,
        denom: NATIVE_DENOM,
      },
    })}
  >
    <StakeComponent
      {...args}
      errors={{}}
      isCreating
      onRemove={() => alert('remove')}
    />
  </FormProvider>
)

const denomProps = {
  denom: 'ujuno',
  symbol: 'JUNO',
  decimals: 6,
}

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  options: {
    nativeBalances: [
      {
        denom: NATIVE_DENOM,
        amount: '1234567890',
      },
    ],
    stakes: [
      {
        // Random price between 0 and 10000 with up to 6 decimals.
        amount: Math.floor(Math.random() * (10000 * 1e6) + 1e6) / 1e6,
        validator: {
          address: 'sparkIBC',
          moniker: 'Spark IBC',
          website: '',
          details: '',
          commission: 0.05,
          status: 'BOND_STATUS_BONDED',
          tokens: 5,
        },
        rewards: 1.23,
        ...denomProps,
      },
      {
        // Random price between 0 and 10000 with up to 6 decimals.
        amount: Math.floor(Math.random() * (10000 * 1e6) + 1e6) / 1e6,
        validator: {
          address: 'elsehow',
          moniker: 'elsehow',
          website: '',
          details: '',
          commission: 0.05,
          status: 'BOND_STATUS_BONDED',
          tokens: 6.2,
        },
        rewards: 4.56,
        ...denomProps,
      },
      {
        // Random price between 0 and 10000 with up to 6 decimals.
        amount: Math.floor(Math.random() * (10000 * 1e6) + 1e6) / 1e6,
        validator: {
          address: 'cosmostation',
          moniker: 'Cosmostation',
          website: '',
          details: '',
          commission: 0.05,
          status: 'BOND_STATUS_BONDED',
          tokens: 7,
        },
        rewards: 7.89,
        ...denomProps,
      },
    ],
    validators: [
      {
        address: 'aDifferentOne',
        moniker: 'A different one',
        website: '',
        details: '',
        commission: 0.05,
        status: 'BOND_STATUS_BONDED',
        tokens: 9,
      },
    ],
    executed: false,
    nativeUnstakingDurationSeconds: 2419200,
  },
}
