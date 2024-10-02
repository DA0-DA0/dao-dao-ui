import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useFormContext } from 'react-hook-form'

import { CHAIN_ID } from '@dao-dao/storybook'
import { makeReactHookFormDecorator } from '@dao-dao/storybook/decorators'
import { getChainAssets, getNativeTokenForChainId } from '@dao-dao/utils'

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
  const { register, watch, setValue, getValues } = useFormContext()

  return (
    <div className="max-w-sm">
      <TokenInput
        {...(args as any)}
        amount={{
          watch,
          setValue,
          getValues,
          register,
          fieldName: 'amount',
          min: 0.00001,
          step: 0.00001,
        }}
        onSelectToken={(token) => setValue('token', token)}
        selectedToken={watch('token')}
      />
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  tokens: {
    loading: false,
    data: [getNativeTokenForChainId(CHAIN_ID), ...getChainAssets(CHAIN_ID)],
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
