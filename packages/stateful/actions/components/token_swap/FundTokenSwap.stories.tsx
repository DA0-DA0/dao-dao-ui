import { ComponentMeta, ComponentStory } from '@storybook/react'

import { makeProps as makeTokenSwapStatusProps } from '@dao-dao/stateless/components/TokenSwapStatus.stories'
import {
  makeActionsProviderDecorator,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook'
import { ActionOptionsContextType, ContractVersion } from '@dao-dao/types'

import { FundTokenSwap } from './FundTokenSwap'
import { PerformTokenSwapData } from './types'

export default {
  title:
    'DAO DAO / packages / stateful / actions / components / token_swap / FundTokenSwap',
  component: FundTokenSwap,

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
        type: ActionOptionsContextType.Dao,
        coreVersion: ContractVersion.V0_2_0,
      },
    }),
  ],
} as ComponentMeta<typeof FundTokenSwap>

const Template: ComponentStory<typeof FundTokenSwap> = (args) => (
  <div className="max-w-xl">
    <FundTokenSwap {...args} />
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
