import { ComponentMeta, ComponentStory } from '@storybook/react'

import { makeProps as makeTokenSwapStatusProps } from '@dao-dao/stateless/components/TokenSwapStatus.stories'
import {
  makeActionsProviderDecorator,
  makeDaoInfo,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook'
import { ActionContextType } from '@dao-dao/types'

import { ExistingTokenSwap } from './ExistingTokenSwap'
import { PerformTokenSwapData } from './types'

export default {
  title:
    'DAO DAO / packages / stateful / actions / components / token_swap / ExistingTokenSwap',
  component: ExistingTokenSwap,

  decorators: [
    makeReactHookFormDecorator<PerformTokenSwapData>({
      contractChosen: true,
      tokenSwapContractAddress: 'junoTokenSwapContract',
    }),
    makeActionsProviderDecorator({
      address: 'junoWalletAddress',
      chainId: 'juno-1',
      bech32Prefix: 'juno',
      context: {
        type: ActionContextType.Dao,
        info: makeDaoInfo(),
      },
    }),
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
  onRemove: () => alert('remove'),
  errors: {},
  options: {
    tokenSwapStatusProps: makeTokenSwapStatusProps(),
    status: 'This action does something.',
  },
}
