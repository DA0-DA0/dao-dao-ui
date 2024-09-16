import { ComponentMeta, ComponentStory } from '@storybook/react'

import { makeProps as makeTokenSwapStatusProps } from '@dao-dao/stateless/components/TokenSwapStatus.stories'
import {
  makeDaoInfo,
  makeDaoProvidersDecorator,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook'

import { PerformTokenSwapData } from '../types'
import { ExistingTokenSwap } from './ExistingTokenSwap'

export default {
  title:
    'DAO DAO / packages / stateful / actions / core / treasury / token_swap / ExistingTokenSwap',
  component: ExistingTokenSwap,

  decorators: [
    makeReactHookFormDecorator<PerformTokenSwapData>({
      contractChosen: true,
      tokenSwapContractAddress: 'junoTokenSwapContract',
    }),
    makeDaoProvidersDecorator(makeDaoInfo()),
  ],
} as ComponentMeta<typeof ExistingTokenSwap>

const Template: ComponentStory<typeof ExistingTokenSwap> = (args) => (
  <div className="max-w-xl">
    <ExistingTokenSwap {...args} />
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
    tokenSwapStatusProps: makeTokenSwapStatusProps(),
    status: 'This action does something.',
  },
}
