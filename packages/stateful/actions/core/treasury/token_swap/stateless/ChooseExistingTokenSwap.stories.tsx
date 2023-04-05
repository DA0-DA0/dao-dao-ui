import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  makeDaoInfo,
  makeDaoProvidersDecorator,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook'

import { PerformTokenSwapData } from '../types'
import { ChooseExistingTokenSwap } from './ChooseExistingTokenSwap'

export default {
  title:
    'DAO DAO / packages / stateful / actions / core / treasury / token_swap / ChooseExistingTokenSwap',
  component: ChooseExistingTokenSwap,

  decorators: [
    makeReactHookFormDecorator<PerformTokenSwapData>({
      contractChosen: false,
      tokenSwapContractAddress: undefined,
    }),
    makeDaoProvidersDecorator(makeDaoInfo()),
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
  errors: {},
  options: {
    chooseLoading: false,
    onChooseExistingContract: async () => alert('choose'),
  },
}
