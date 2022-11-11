import { ComponentMeta, ComponentStory } from '@storybook/react'
import { FormProvider, useForm } from 'react-hook-form'

import { ReactHookFormDecorator } from '@dao-dao/storybook/decorators'
import { NATIVE_DENOM, StakeType } from '@dao-dao/utils'

import { CUSTOM_VALIDATOR, StakeComponent, StakeData } from './Stake'

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
        validator: CUSTOM_VALIDATOR,
        customValidator: '',
        toValidator: CUSTOM_VALIDATOR,
        customToValidator: '',
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
        },
        rewards: 7.89,
        ...denomProps,
      },
    ],
  },
}
