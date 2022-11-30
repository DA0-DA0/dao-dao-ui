import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  makeActionsProviderDecorator,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook'
import { ActionOptionsContextType, ContractVersion } from '@dao-dao/types'

import { ChooseExistingTokenSwap } from './ChooseExistingTokenSwap'
import { PerformTokenSwapData } from './types'

export default {
  title:
    'DAO DAO / packages / stateful / actions / components / PerformTokenSwap / ChooseExistingTokenSwap',
  component: ChooseExistingTokenSwap,

  decorators: [
    makeReactHookFormDecorator<PerformTokenSwapData>({
      contractChosen: false,
      tokenSwapContractAddress: undefined,
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
} as ComponentMeta<typeof ChooseExistingTokenSwap>

const Template: ComponentStory<typeof ChooseExistingTokenSwap> = (args) => (
  <div className="max-w-xl">
    <ChooseExistingTokenSwap {...args} />
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
    chooseLoading: false,
    onChooseExistingContract: async () => alert('choose'),
  },
}
