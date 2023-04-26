import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useFormContext } from 'react-hook-form'

import { makeReactHookFormDecorator } from '@dao-dao/storybook/decorators'
import { CHAIN_ID, getNativeTokenForChainId, ibcAssets } from '@dao-dao/utils'

import { TokenInput } from './TokenInput'

export default {
  title: 'DAO DAO / packages / stateless / components / inputs / TokenInput',
  component: TokenInput,
  decorators: [
    makeReactHookFormDecorator({
      amount: 11000027,
    }),
  ],
} as ComponentMeta<typeof TokenInput>

const Template: ComponentStory<typeof TokenInput> = (args) => {
  const { register, watch, setValue } = useFormContext()

  return (
    <div className="max-w-sm">
      <TokenInput
        {...args}
        onSelectToken={(token) => setValue('token', token)}
        register={register}
        selectedToken={watch('token')}
        setValue={setValue}
        watch={watch}
      />
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  amountFieldName: 'amount',
  amountMin: 0.000001,
  amountStep: 0.000001,
  tokens: {
    loading: false,
    data: [getNativeTokenForChainId(CHAIN_ID), ...ibcAssets],
  },
}

export const Loading = Template.bind({})
Loading.args = {
  ...Default.args,
  tokens: {
    loading: true,
  },
}

export const ReadOnly = Template.bind({})
ReadOnly.args = {
  ...Default.args,
  readOnly: true,
}
