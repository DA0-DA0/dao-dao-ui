import { ComponentMeta, ComponentStory } from '@storybook/react'

import { makeProps as makeTokenSwapStatusProps } from '@dao-dao/stateless/components/TokenSwapStatus.stories'
import {
  makeActionsProviderDecorator,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook'
import { ActionOptionsContextType, ContractVersion } from '@dao-dao/types'

import { WithdrawTokenSwapData } from './types'
import { WithdrawTokenSwap } from './WithdrawTokenSwap'

export default {
  title:
    'DAO DAO / packages / stateful / actions / components / token_swap / WithdrawTokenSwap',
  component: WithdrawTokenSwap,

  decorators: [
    makeReactHookFormDecorator<WithdrawTokenSwapData>({
      contractChosen: true,
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
} as ComponentMeta<typeof WithdrawTokenSwap>

const Template: ComponentStory<typeof WithdrawTokenSwap> = (args) => (
  <div className="max-w-xl">
    <WithdrawTokenSwap {...args} />
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
  },
}
